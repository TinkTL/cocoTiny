# Payment Gift Status Design

## Scope

Update only the right side of the existing post-payment modal. The original
product page, blurred backdrop, modal shell, and product summary on the left
remain unchanged.

## Paid state

The paid state uses the heading `查收您的礼物` and shows these order fields:

1. Email address, masked with the existing `maskEmail` helper.
2. Merchant order number.
3. Asset pack title.
4. Payment time, formatted in China Standard Time.
5. Delivery status.

The explanatory payment paragraph, the “没有收到邮件” copy, and the email input
are removed.

## Resend behavior

The `重新发送领取邮件` button always sends to the email stored on the paid order.
The client cannot provide or change the destination address.

The resend endpoint:

- accepts only the order number from the route;
- requires the order to be paid and its delivery window to remain valid;
- uses the existing minimum retry delay and email-attempt tracking;
- returns a neutral response where appropriate to avoid exposing buyer data;
- never returns the full email address.

The result panel retains the CocoTiny logo and the two support email links.

## Data flow

1. Alipay returns to the original product page with the random merchant order
   number.
2. The product modal opens in result mode.
3. The query endpoint confirms payment and returns masked order-display fields:
   masked email, order number, asset title, paid time, and email status.
4. Pressing resend calls the order resend endpoint without an email body.
5. The server loads the original email from Neon and sends only to that address.

## Error handling

- Pending payments keep the existing retry-query action.
- Failed email delivery is shown as a delivery status and can be retried.
- Resend cooldown or delivery errors appear below the resend button.
- Invalid, closed, or unknown orders do not expose order details.

## Verification

- Confirm the full buyer email never appears in API responses or page markup.
- Confirm resend ignores client-controlled destination data.
- Confirm paid time uses `Asia/Shanghai`.
- Confirm query, resend, TypeScript, lint, and production build pass.
- Confirm the original checkout form and Alipay creation flow remain unchanged.
