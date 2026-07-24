# CocoTiny 付费资产邮件交付设计

日期：2026-07-24

## 目标与范围

本阶段为 CocoTiny 当前已开放购买的 8 个资产包实现可靠的付款后邮件交付：

- `dengmiao-youchai.zip`
- `gardenia-herb-society.zip`
- `lindenteahouse.zip`
- `mint-knights.zip`
- `qing-luo-outpost.zip`
- `shacha-tangguowu.zip`
- `windmillbakery.zip`
- `ying-long-night-lantern.zip`

以下 4 个已上传到 COS、但尚未成为网站商品的资产包不在本阶段开放：

- `minty-kitchen.zip`
- `moon-alley-apothecary.zip`
- `yuelong-qitan.zip`
- `yuelu-linwei.zip`

成功标准是：买家在付款前提交邮箱，支付宝确认付款后收到领取邮件；邮件链接 7 天有效，最多成功领取 3 次，每次生成 5 分钟有效的腾讯云 COS 私有对象签名地址。

## 已有基础设施

- 网站：Next.js 16，部署于 Vercel。
- 支付：支付宝电脑网站支付，RSA2，生产环境已完成真实付款测试。
- 数据库：Vercel Marketplace 连接的 Neon Postgres。
- 邮件：Resend，`cocotiny.com` 已在东京区域验证。
- 发件人：`CocoTiny <gift@cocotiny.com>`。
- 文件：腾讯云 COS 私有存储桶 `cocotiny-asset-1365840561`，地域 `ap-guangzhou`，ZIP 位于存储桶根目录。
- COS 凭据：仅限该存储桶只读权限的 CAM 子用户，密钥仅保存于 Vercel Production 环境变量。

## 总体架构

1. 用户点击购买按钮，先填写接收资产包的邮箱。
2. 服务端校验邮箱，在 Neon 中创建 10 分钟有效的待支付订单。
3. 服务端创建支付宝电脑网站支付地址，用户跳转并付款。
4. 支付宝异步通知接口完成 RSA2 验签，并校验应用、商户、订单、商品和金额。
5. 服务端原子地把订单更新为已付款，创建随机领取令牌，并只保存令牌的 SHA-256 哈希。
6. Resend 向订单邮箱发送 CocoTiny 领取链接。
7. 用户打开领取链接，网站校验令牌哈希、7 天期限和领取次数。
8. 用户点击下载后，服务端原子增加一次领取次数并生成 5 分钟有效的 COS 签名地址。
9. 浏览器直接从 COS 下载 ZIP；大文件不经过 Vercel。

## 数据模型

使用 `payment_orders` 表持久化订单与交付状态。字段包括：

- `order_no`：CocoTiny 唯一订单号，主键。
- `asset_slug`：商品标识。
- `asset_title`：创建订单时的商品标题快照。
- `object_key`：对应的 COS ZIP 文件名。
- `email`：规范化后的买家邮箱。
- `amount`：订单金额快照，使用定点数。
- `status`：`PENDING`、`PAID` 或 `CLOSED`。
- `created_at`、`expires_at`、`paid_at`：订单时间。
- `alipay_trade_no`：支付宝交易号，付款后唯一。
- `download_token_hash`：领取令牌 SHA-256 哈希。
- `download_expires_at`：领取链接到期时间，付款后 7 天。
- `download_count`：已经成功授权的领取次数，默认 0。
- `download_limit`：本阶段固定为 3。
- `email_status`：`NOT_READY`、`PENDING`、`SENT` 或 `FAILED`。
- `email_attempt`：邮件投递尝试版本，默认 0。
- `email_sent_at`、`resend_email_id`、`updated_at`：邮件与变更审计记录。

数据库约束：

- `order_no` 为主键。
- `alipay_trade_no` 在非空时唯一。
- `download_count` 不得小于 0。
- `download_limit` 固定为正数。
- 订单邮箱在创建后不可由公开接口修改。

## 商品与文件映射

服务端维护显式、只读的商品到 COS Object Key 映射，不接受客户端传入任意文件名。8 个商品 slug 分别映射到同名 ZIP；`windmillbakery` 映射到 `windmillbakery.zip`。

只有存在于支付商品表和文件映射表中的商品才能创建订单。其余 4 个 ZIP 即使已经存在于存储桶，也不能通过公开接口签名或下载。

## 支付处理

### 创建订单

`POST /api/payments/alipay/create` 接收 `assetSlug` 和 `email`：

- 规范化商品 slug。
- 去除邮箱首尾空白并进行长度与基本格式校验。
- 从服务端商品表读取标题、金额和 Object Key。
- 在 Neon 创建待支付订单。
- 创建支付宝支付地址并返回订单号、支付地址和到期时间。

如果支付宝地址生成失败，订单保留为待支付并按到期时间关闭；不会产生领取令牌。

### 支付宝异步通知

`POST /api/payments/alipay/notify`：

- 校验 RSA2 签名。
- 校验 `app_id` 和可选的 `seller_id`。
- 使用 `out_trade_no` 从数据库读取订单。
- 对比通知金额与数据库订单金额，而不是只比较全局固定价格。
- 接受 `TRADE_SUCCESS` 和 `TRADE_FINISHED`。
- 在数据库事务中幂等地写入付款状态、支付宝交易号、领取令牌哈希、期限和待发信状态。

支付宝可能重复通知。同一订单重复通知不得重置领取次数、替换令牌或重复创建交付记录。数据库付款状态成功持久化后，接口才可向支付宝返回 `success`。

### 主动查询兜底

`GET /api/payments/alipay/query` 查询支付宝后，还要把经完整校验的付款结果同步写入 Neon。这样即使异步通知短暂失败，支付结果页面也能修复订单状态并触发待发送邮件。

## 邮件交付

邮件包含：

- 已购买的资产包名称。
- CocoTiny 订单号。
- 7 天有效期说明。
- 最多成功领取 3 次的说明。
- 指向 `https://www.cocotiny.com/download/<raw-token>` 的按钮。
- 无需回复的说明。

数据库只保存令牌哈希；原始令牌只在生成邮件链接时短暂存在于服务端。日志不得记录原始令牌、完整邮箱、COS 密钥或数据库连接字符串。

每次投递尝试使用由订单号和尝试版本组成的 Resend 幂等键，例如 `paid-delivery/<orderNo>/<emailAttempt>`。相同尝试中的网络重试保持相同请求内容和幂等键；Resend 的 24 小时幂等窗口用于抵御重复发送。

支付结果页提供重新发送入口。用户必须提交订单号和原邮箱，二者规范化后均与数据库匹配才允许发送。每次获得重发资格时，服务端原子地生成新领取令牌、替换数据库中的令牌哈希并增加 `email_attempt`；此前邮件中的链接随即失效。这样不需要在数据库中保存可还原的原始令牌。接口返回通用结果，避免被用来枚举订单或邮箱。

若首次发信失败：

- 已付款状态和领取令牌仍保存在 Neon。
- `email_status` 记录为 `FAILED`。
- 支付结果页提示暂时未发送并允许重试。
- 后续支付宝重复通知或主动查询可以识别待发送状态；获得重试资格后按新的投递尝试版本替换令牌并安全重发。

## 下载授权

### 领取信息

`GET /api/downloads/<token>` 或对应服务端页面：

- 对 URL 中的原始令牌计算 SHA-256。
- 查询匹配且已付款的订单。
- 检查领取链接是否在 7 天有效期内。
- 展示资产名称、到期时间以及剩余领取次数。
- 不向浏览器暴露 Bucket、Region、Object Key 或 CAM 信息。

### 领取操作

`POST /api/downloads/<token>/claim`：

- 再次验证令牌、付款状态与期限。
- 使用单条条件更新或事务锁，要求 `download_count < download_limit`。
- 在同一受控流程内增加一次领取次数。
- 使用服务端 CAM 凭据为订单映射的 Object Key 生成 5 分钟有效的 COS GET 签名 URL。
- 返回签名 URL，由浏览器直接下载。

并发请求中最多只有剩余次数对应的请求可以成功。第 4 次、过期令牌、篡改令牌和未知令牌均返回通用拒绝结果。

只有成功完成服务端授权并生成签名 URL 才计一次领取。COS 签名 URL 本身泄露时最多在 5 分钟内有效。

## 页面交互

### 购买前邮箱

- 点击“解锁完整版”后显示邮箱输入界面。
- 明确提示付款成功后资产领取链接将发送到该邮箱。
- 用户确认邮箱后才创建支付宝订单。
- 提交期间禁用重复点击，并保留清晰的错误提示。

### 支付结果页

- 显示订单的真实持久化状态。
- 已付款时显示脱敏邮箱与邮件状态。
- 发信失败或用户未收到邮件时提供“重新发送”入口。
- 不把订单号本身视为下载凭证。

### 领取页

- 有效链接显示资产名称、有效期、剩余领取次数和下载按钮。
- 无效、过期或次数耗尽时提供通用提示及返回首页入口。
- 不自动消耗次数；只有用户点击下载按钮才发起领取操作。

## 接口限流

现有 Vercel WAF 规则继续保护支付创建与查询接口。实施时补充或调整规则：

- 创建订单：按 IP 限制频率。
- 重新发信：同时受 IP、订单和冷却时间限制。
- 领取操作：按 IP 与令牌维度限制突发请求。
- 支付宝通知：不使用 Challenge；依赖 RSA2 验签、订单数据校验和幂等写入。

应用层仍执行全部权限校验，WAF 只作为滥用防护，不能替代业务授权。

## 环境变量

服务端使用：

```text
DATABASE_URL
RESEND_API_KEY
EMAIL_FROM=CocoTiny <gift@cocotiny.com>
TENCENT_COS_SECRET_ID
TENCENT_COS_SECRET_KEY
TENCENT_COS_BUCKET=cocotiny-asset-1365840561
TENCENT_COS_REGION=ap-guangzhou
```

所有变量仅配置在 Vercel Production，并保持服务端专用。删除旧的通用 `SecretId`、`SecretKey` 变量。代码和日志中不得输出任何密钥。

支付宝现有环境变量保持不变。

## 错误处理与安全

- 公开错误响应不包含第三方原始错误、SQL、对象路径或密钥信息。
- 服务端日志使用订单号关联问题，但邮箱必须脱敏，令牌和签名 URL不得记录。
- 所有数据库变更使用参数化查询。
- 邮箱、商品 slug、订单号和令牌都有明确长度上限。
- COS 存储桶保持私有读写；网站 CAM 子用户仅具备该桶只读权限。
- 不通过 Vercel 中转 ZIP，降低超时和流量成本风险。
- 付款确认只能来自验签后的支付宝通知或签名校验通过的支付宝主动查询。

## 验证计划

### 自动测试

- 8 个商品 slug 均映射到正确 ZIP。
- 未开放的 4 个 slug 不能创建订单或生成下载地址。
- 邮箱格式和长度校验。
- 伪造签名、错误 App ID、错误商户、错误金额和未知订单均不能标记付款。
- 重复支付宝通知只产生一次付款状态转换和一个领取令牌。
- 邮件重试使用幂等键，失败状态可恢复。
- 有效令牌第 1 至第 3 次领取成功，第 4 次拒绝。
- 过期、篡改和未知令牌拒绝。
- 并发领取不突破 3 次上限。
- COS Object Key 只能来自服务端映射。

### 工程验证

- 数据库迁移在空数据库和已有数据库上均可安全执行。
- `pnpm lint` 通过。
- `pnpm build` 通过。
- Vercel Preview 或本地环境使用隔离配置完成接口验证。

### 生产冒烟测试

1. 使用可接收邮件的地址购买一个 0.10 元测试商品。
2. 确认 Neon 订单从 `PENDING` 变为 `PAID`。
3. 确认 Resend 显示邮件发送成功。
4. 从邮件进入领取页并成功下载正确 ZIP。
5. 验证前三次授权成功、第四次被拒绝。
6. 验证签名 URL 过期后不能继续使用。
7. 检查 Vercel、Resend 和 COS 日志中没有泄露密钥或原始令牌。

## 后续范围

在本阶段稳定后，再将另外 4 个 ZIP 加入网站商品数据与显式文件映射。该扩展不改变订单、邮件或下载授权架构。
