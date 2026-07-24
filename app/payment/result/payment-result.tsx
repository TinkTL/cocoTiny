import Image from 'next/image'
import { OrderProductShell } from '@/components/order-product-shell'
import { PaymentReturnPanel } from '@/components/payment-return-panel'
import type { OrderProductPresentation } from '@/lib/order-product-presentation'

export function PaymentResult({
  orderNo,
  product,
}: {
  orderNo?: string
  product: OrderProductPresentation
}) {
  return (
    <OrderProductShell product={product}>
      {orderNo ? (
        <PaymentReturnPanel orderNo={orderNo} productTitle={product.title} />
      ) : (
        <div className="flex h-full flex-col">
          <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#8792a2]">
            订单状态
          </div>
          <h2 className="mt-3 font-display text-2xl font-bold text-[#0a2540]">
            暂时无法确认支付结果
          </h2>
          <p className="mt-5 text-sm font-semibold text-red-600">缺少商户订单号</p>
          <Image
            src="/cocotiny-logo.png"
            alt="CocoTiny"
            width={1179}
            height={405}
            className="mx-auto mt-10 h-auto w-[250px] max-w-[78%]"
          />
          <p className="mt-auto pt-5 text-center text-xs leading-5 text-[#8792a2]">
            遇到错误？联系{' '}
            <a className="font-semibold text-[#635bff]" href="mailto:w211299486@gmail.com">
              w211299486@gmail.com
            </a>
            {' / '}
            <a className="font-semibold text-[#635bff]" href="mailto:211299486@qq.com">
              211299486@qq.com
            </a>
          </p>
        </div>
      )}
    </OrderProductShell>
  )
}
