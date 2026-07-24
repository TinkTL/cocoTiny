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

## Resend cooldown presentation

The query response includes the server-calculated number of seconds until the
next resend is allowed. The value is derived from the persisted last email
attempt time and the existing 60-second retry interval.

- When available, the resend button uses a solid CocoTiny purple background
  with white text: `重新发送领取邮件`.
- During cooldown, the button is disabled with a lighter purple treatment and
  displays the live countdown, for example `52 秒后可重新发送`.
- A successful resend resets the countdown to 60 seconds.
- Reloading the page resumes from server time instead of restarting a
  client-only timer.

## Resend limit and order-number handling

- The first delivery email does not count as a resend.
- Each paid order allows at most three resend attempts.
- The database update enforces the total attempt limit atomically so repeated
  or concurrent client requests cannot bypass it.
- The UI displays the remaining resend count and disables the action when it
  reaches zero.
- The order number remains visually truncated and has a copy action that writes
  the complete value to the clipboard, with explicit success and failure
  feedback.
- After the product page consumes `payment=return` and `orderNo`, it removes
  both values from the visible URL using history replacement without reloading
  the page. The in-memory panel keeps the order number for the active result
  view.

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
- Confirm resend cooldown survives reload and reaches zero against server time.
- Confirm the active and disabled button colors meet the approved visual state.
- Confirm four total delivery attempts are possible: one initial delivery and
  three resends.
- Confirm concurrent resend requests cannot exceed the database limit.
- Confirm the return query is removed without closing the active modal.
- Confirm the copy action copies the full, untruncated order number.
- Confirm query, resend, TypeScript, lint, and production build pass.
- Confirm the original checkout form and Alipay creation flow remain unchanged.
