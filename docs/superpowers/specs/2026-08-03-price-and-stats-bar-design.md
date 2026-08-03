# Asset Pack Price and Stats Bar Update

## Goal

Set the unified CocoTiny asset-pack price to `¥59.90` and make the asset-detail
statistics bar fully opaque with a slightly larger radius.

## Price Architecture

- Define the price once in a small shared pricing module as the canonical
  decimal string `59.90`.
- Use that value in the checkout modal, standalone payment-result shell, payment
  product lookup, order creation, and Alipay request generation.
- New orders store `59.90` in the database and send `59.90` to Alipay.
- Payment notification and query verification continue comparing Alipay's
  amount with the amount stored on each order. Existing test orders therefore
  retain and validate their original `0.10` amount.
- All customer-facing price displays use `¥59.90`.

## Statistics Bar

- Change the asset-detail statistics bar from 90% white to solid white.
- Increase the outer radius from approximately 4px to 8px.
- Keep the four stat cells, separators, icon backgrounds, spacing, and shadow
  unchanged.

## Verification

- Search application code for old hard-coded `0.10` price displays or product
  constants.
- Confirm the shared price reaches both checkout UI and server-side order
  creation.
- Run lint and a production build.
- Verify the generated page contains the solid statistics bar and 8px radius.
- Do not create a real Alipay order during automated verification.
