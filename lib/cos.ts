import COS from 'cos-nodejs-sdk-v5'

let client: COS | undefined

function getCosConfiguration() {
  const SecretId = process.env.TENCENT_COS_SECRET_ID
  const SecretKey = process.env.TENCENT_COS_SECRET_KEY
  const Bucket = process.env.TENCENT_COS_BUCKET
  const Region = process.env.TENCENT_COS_REGION

  if (!SecretId || !SecretKey || !Bucket || !Region) {
    throw new Error('Tencent COS is not configured')
  }

  client ??= new COS({ SecretId, SecretKey })
  return { cos: client, Bucket, Region }
}

export function createSignedDownloadUrl(objectKey: string) {
  const { cos, Bucket, Region } = getCosConfiguration()

  return new Promise<string>((resolve, reject) => {
    cos.getObjectUrl(
      {
        Bucket,
        Region,
        Key: objectKey,
        Sign: true,
        Expires: 300,
      },
      (error, data) => {
        if (error || !data?.Url) {
          reject(error || new Error('COS did not return a signed URL'))
          return
        }
        resolve(data.Url)
      },
    )
  })
}
