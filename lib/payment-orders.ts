export type PaymentOrderStatus = 'PENDING' | 'PAID' | 'CLOSED'

export type PaymentOrder = {
  orderNo: string
  assetSlug: string
  title: string
  amount: string
  status: PaymentOrderStatus
  createdAt: string
  expiresAt: string
  paidAt?: string
  alipayTradeNo?: string
}

type OrderStore = Map<string, PaymentOrder>

declare global {
  // Keep local development orders across Next.js hot reloads.
  var cocoTinyPaymentOrders: OrderStore | undefined
}

const orders = globalThis.cocoTinyPaymentOrders ?? new Map<string, PaymentOrder>()

if (process.env.NODE_ENV !== 'production') {
  globalThis.cocoTinyPaymentOrders = orders
}

export function createPaymentOrder(input: {
  assetSlug: string
  title: string
  amount: string
}) {
  const now = new Date()
  const expiresAt = new Date(now.getTime() + 10 * 60 * 1000)
  const orderNo = `CT${Date.now().toString(36).toUpperCase()}${crypto.randomUUID().replaceAll('-', '').toUpperCase()}`
  const order: PaymentOrder = {
    orderNo,
    assetSlug: input.assetSlug,
    title: input.title,
    amount: input.amount,
    status: 'PENDING',
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
  }

  orders.set(orderNo, order)
  return order
}

export function getPaymentOrder(orderNo: string) {
  const order = orders.get(orderNo)
  if (!order) return undefined

  if (order.status === 'PENDING' && Date.parse(order.expiresAt) <= Date.now()) {
    order.status = 'CLOSED'
  }

  return order
}

export function markPaymentOrderPaid(orderNo: string, alipayTradeNo: string) {
  const order = orders.get(orderNo)
  if (!order) return undefined

  if (order.status !== 'PAID') {
    order.status = 'PAID'
    order.paidAt = new Date().toISOString()
    order.alipayTradeNo = alipayTradeNo
  }

  return order
}

export function isCocoTinyOrderNo(orderNo: unknown): orderNo is string {
  return (
    typeof orderNo === 'string' &&
    /^CT[A-Z0-9]{20,80}$/.test(orderNo)
  )
}
