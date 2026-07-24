# Payment Result Internationalization

## Goal

Make the payment result content in the checkout modal follow CocoTiny's active
language. English mode must not leave the right-hand order status panel in
Chinese.

## Scope

- Localize the payment result panel's headings, order labels, email statuses,
  buttons, retry messages, errors, remaining-attempt text, and support prompt.
- Format the paid timestamp with the active locale while retaining the
  Asia/Shanghai time zone used by the existing payment flow.
- Localize the missing-order fallback shown by the standalone payment result
  route.
- Keep the existing modal layout, order data, payment queries, resend limits,
  download delivery, and API behavior unchanged.

## Design

`PaymentReturnPanel` will read the existing `LanguageProvider` locale, just like
the checkout component already does. A local typed copy map will provide the
English and Chinese strings so every visible state uses the same selected
language. The standalone result fallback will also become a client-side
localized component or receive localized copy through a small client boundary.

Product names continue to come from the current product presentation. Dynamic
server error messages will use a localized client fallback when no suitable
message is available; no API contract changes are required.

## Verification

- Run lint and production build.
- Verify both `en` and `zh` renderings for checking, paid, pending, closed, and
  error states.
- Confirm paid timestamps use `en` formatting in English mode and `zh-CN`
  formatting in Chinese mode.
- Confirm copy-order and resend interactions remain unchanged.
