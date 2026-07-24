import { PaymentResult } from './payment-result'
import { getPaymentOrder, isCocoTinyOrderNo } from '@/lib/payment-orders'
import { getOrderProductPresentation } from '@/lib/order-product-presentation'

type PaymentResultPageProps = {
  searchParams: Promise<{ orderNo?: string }>
}

export default async function PaymentResultPage({ searchParams }: PaymentResultPageProps) {
  const { orderNo } = await searchParams
  const order = isCocoTinyOrderNo(orderNo) ? await getPaymentOrder(orderNo) : undefined
  const product = getOrderProductPresentation(
    order?.assetSlug || 'gardenia-herb-society',
    order?.title,
  )

  return <PaymentResult orderNo={orderNo} product={product} />
}
