import { PaymentResult } from './payment-result'

type PaymentResultPageProps = {
  searchParams: Promise<{ orderNo?: string }>
}

export default async function PaymentResultPage({ searchParams }: PaymentResultPageProps) {
  const { orderNo } = await searchParams
  return <PaymentResult orderNo={orderNo} />
}
