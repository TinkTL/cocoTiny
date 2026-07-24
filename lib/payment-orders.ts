import { createHash } from 'node:crypto'
import { getDatabase } from '@/lib/db'

export const MAX_EMAIL_RESENDS = 3
const MAX_EMAIL_ATTEMPTS = 1 + MAX_EMAIL_RESENDS

export type PaymentOrderStatus = 'PENDING' | 'PAID' | 'CLOSED'
export type PaymentEmailStatus = 'NOT_READY' | 'PENDING' | 'SENT' | 'FAILED'

export type PaymentOrder = {
  orderNo: string
  assetSlug: string
  title: string
  objectKey: string
  email: string
  amount: string
  status: PaymentOrderStatus
  createdAt: string
  expiresAt: string
  paidAt?: string
  alipayTradeNo?: string
  downloadExpiresAt?: string
  downloadCount: number
  downloadLimit: number
  emailStatus: PaymentEmailStatus
  emailAttempt: number
  emailLastAttemptAt?: string
  emailSentAt?: string
  resendEmailId?: string
}

type PaymentOrderRow = {
  order_no: string
  asset_slug: string
  asset_title: string
  object_key: string
  email: string
  amount: string
  status: PaymentOrderStatus
  created_at: Date | string
  expires_at: Date | string
  paid_at: Date | string | null
  alipay_trade_no: string | null
  download_expires_at: Date | string | null
  download_count: number
  download_limit: number
  email_status: PaymentEmailStatus
  email_attempt: number
  email_last_attempt_at: Date | string | null
  email_sent_at: Date | string | null
  resend_email_id: string | null
}

function iso(value: Date | string | null) {
  return value ? new Date(value).toISOString() : undefined
}

function mapOrder(row: PaymentOrderRow): PaymentOrder {
  return {
    orderNo: row.order_no,
    assetSlug: row.asset_slug,
    title: row.asset_title,
    objectKey: row.object_key,
    email: row.email,
    amount: row.amount,
    status: row.status,
    createdAt: iso(row.created_at)!,
    expiresAt: iso(row.expires_at)!,
    paidAt: iso(row.paid_at),
    alipayTradeNo: row.alipay_trade_no ?? undefined,
    downloadExpiresAt: iso(row.download_expires_at),
    downloadCount: row.download_count,
    downloadLimit: row.download_limit,
    emailStatus: row.email_status,
    emailAttempt: row.email_attempt,
    emailLastAttemptAt: iso(row.email_last_attempt_at),
    emailSentAt: iso(row.email_sent_at),
    resendEmailId: row.resend_email_id ?? undefined,
  }
}

function firstOrder(rows: unknown) {
  const row = (rows as PaymentOrderRow[])[0]
  return row ? mapOrder(row) : undefined
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase()
}

export function isValidBuyerEmail(value: unknown): value is string {
  if (typeof value !== 'string') return false
  const email = normalizeEmail(value)
  return (
    email.length >= 3 &&
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  )
}

export function hashDownloadToken(token: string) {
  return createHash('sha256').update(token).digest('hex')
}

export async function createPaymentOrder(input: {
  assetSlug: string
  title: string
  objectKey: string
  email: string
  amount: string
}) {
  const sql = getDatabase()
  const orderNo = `CT${Date.now().toString(36).toUpperCase()}${crypto.randomUUID().replaceAll('-', '').toUpperCase()}`
  const rows = await sql`
    INSERT INTO payment_orders (
      order_no, asset_slug, asset_title, object_key, email, amount,
      status, expires_at
    )
    VALUES (
      ${orderNo}, ${input.assetSlug}, ${input.title}, ${input.objectKey},
      ${normalizeEmail(input.email)}, ${input.amount}, 'PENDING',
      NOW() + INTERVAL '10 minutes'
    )
    RETURNING *
  `
  return firstOrder(rows)!
}

export async function getPaymentOrder(orderNo: string) {
  const sql = getDatabase()
  await sql`
    UPDATE payment_orders
    SET status = 'CLOSED', updated_at = NOW()
    WHERE order_no = ${orderNo}
      AND status = 'PENDING'
      AND expires_at <= NOW()
  `
  return firstOrder(await sql`
    SELECT * FROM payment_orders WHERE order_no = ${orderNo} LIMIT 1
  `)
}

export async function markPaymentOrderPaid(input: {
  orderNo: string
  alipayTradeNo: string
  tokenHash: string
}) {
  const sql = getDatabase()
  const transitioned = firstOrder(await sql`
    UPDATE payment_orders
    SET
      status = 'PAID',
      paid_at = NOW(),
      alipay_trade_no = ${input.alipayTradeNo},
      download_token_hash = ${input.tokenHash},
      download_expires_at = NOW() + INTERVAL '7 days',
      email_status = 'PENDING',
      email_attempt = 1,
      email_last_attempt_at = NOW(),
      updated_at = NOW()
    WHERE order_no = ${input.orderNo}
      AND status = 'PENDING'
    RETURNING *
  `)

  if (transitioned) return { order: transitioned, shouldSend: true }

  const order = await getPaymentOrder(input.orderNo)
  if (order?.status === 'PAID' && order.alipayTradeNo !== input.alipayTradeNo) {
    return { order: undefined, shouldSend: false }
  }
  return { order, shouldSend: false }
}

export async function prepareEmailRetryForOrder(input: {
  orderNo: string
  tokenHash: string
  minimumDelaySeconds?: number
}) {
  const sql = getDatabase()
  const delay = Math.max(30, input.minimumDelaySeconds ?? 60)
  return firstOrder(await sql`
    UPDATE payment_orders
    SET
      download_token_hash = ${input.tokenHash},
      email_status = 'PENDING',
      email_attempt = email_attempt + 1,
      email_last_attempt_at = NOW(),
      updated_at = NOW()
    WHERE order_no = ${input.orderNo}
      AND status = 'PAID'
      AND download_expires_at > NOW()
      AND email_attempt < ${MAX_EMAIL_ATTEMPTS}
      AND (
        email_last_attempt_at IS NULL
        OR email_last_attempt_at <= NOW() - (${delay} * INTERVAL '1 second')
      )
    RETURNING *
  `)
}

export async function markEmailSent(
  orderNo: string,
  emailAttempt: number,
  resendEmailId: string,
) {
  const sql = getDatabase()
  await sql`
    UPDATE payment_orders
    SET
      email_status = 'SENT',
      email_sent_at = NOW(),
      resend_email_id = ${resendEmailId},
      updated_at = NOW()
    WHERE order_no = ${orderNo}
      AND email_attempt = ${emailAttempt}
      AND email_status = 'PENDING'
  `
}

export async function markEmailFailed(orderNo: string, emailAttempt: number) {
  const sql = getDatabase()
  await sql`
    UPDATE payment_orders
    SET email_status = 'FAILED', updated_at = NOW()
    WHERE order_no = ${orderNo}
      AND email_attempt = ${emailAttempt}
      AND email_status = 'PENDING'
  `
}

export async function getDownloadOrder(token: string) {
  const sql = getDatabase()
  return firstOrder(await sql`
    SELECT *
    FROM payment_orders
    WHERE download_token_hash = ${hashDownloadToken(token)}
      AND status = 'PAID'
      AND download_expires_at > NOW()
      AND download_count < download_limit
    LIMIT 1
  `)
}

export async function claimDownload(token: string) {
  const sql = getDatabase()
  return firstOrder(await sql`
    UPDATE payment_orders
    SET download_count = download_count + 1, updated_at = NOW()
    WHERE download_token_hash = ${hashDownloadToken(token)}
      AND status = 'PAID'
      AND download_expires_at > NOW()
      AND download_count < download_limit
    RETURNING *
  `)
}

export function isCocoTinyOrderNo(orderNo: unknown): orderNo is string {
  return typeof orderNo === 'string' && /^CT[A-Z0-9]{20,80}$/.test(orderNo)
}

export function isDownloadToken(token: unknown): token is string {
  return typeof token === 'string' && /^[A-Za-z0-9_-]{40,100}$/.test(token)
}

export function maskEmail(email: string) {
  const [local, domain] = email.split('@')
  if (!domain) return '***'
  const visible = local.slice(0, Math.min(2, local.length))
  return `${visible}${'*'.repeat(Math.max(3, local.length - visible.length))}@${domain}`
}

export function getEmailRetryAfterSeconds(
  order: Pick<PaymentOrder, 'emailLastAttemptAt'>,
  minimumDelaySeconds = 60,
) {
  if (!order.emailLastAttemptAt) return 0
  const availableAt =
    new Date(order.emailLastAttemptAt).getTime() + minimumDelaySeconds * 1000
  return Math.max(0, Math.ceil((availableAt - Date.now()) / 1000))
}

export function getEmailResendsRemaining(
  order: Pick<PaymentOrder, 'emailAttempt'>,
) {
  return Math.max(0, MAX_EMAIL_ATTEMPTS - order.emailAttempt)
}
