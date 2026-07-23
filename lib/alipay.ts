import { AlipaySdk } from 'alipay-sdk'

function readSecret(name: string) {
  return process.env[name]?.replaceAll('\\n', '\n').trim()
}

export function getAlipayConfigurationError() {
  const missing = ['ALIPAY_APP_ID', 'ALIPAY_PRIVATE_KEY', 'ALIPAY_PUBLIC_KEY'].filter(
    (name) => !readSecret(name),
  )

  if (missing.length > 0) {
    return `支付宝尚未配置：缺少 ${missing.join('、')}`
  }

  const invalidUrls = ['ALIPAY_NOTIFY_URL', 'ALIPAY_RETURN_URL'].filter(
    (name) => !process.env[name]?.startsWith('https://'),
  )

  if (invalidUrls.length > 0) {
    return `支付宝尚未配置：${invalidUrls.join('、')} 必须是公网可访问的 HTTPS 地址`
  }

  return undefined
}

export function getAlipaySdk() {
  const configurationError = getAlipayConfigurationError()
  if (configurationError) throw new Error(configurationError)

  return new AlipaySdk({
    appId: readSecret('ALIPAY_APP_ID')!,
    privateKey: readSecret('ALIPAY_PRIVATE_KEY')!,
    alipayPublicKey: readSecret('ALIPAY_PUBLIC_KEY')!,
    signType: 'RSA2',
    keyType: process.env.ALIPAY_PRIVATE_KEY_TYPE === 'PKCS8' ? 'PKCS8' : 'PKCS1',
    gateway: process.env.ALIPAY_GATEWAY || 'https://openapi.alipay.com/gateway.do',
    timeout: 10_000,
  })
}
