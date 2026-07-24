# CocoTiny Paid Asset Delivery Implementation Plan

## Scope

Implement the approved paid-asset delivery design for the eight products already available for purchase. Persist orders in Neon, send claim links with Resend, and authorize private Tencent COS downloads without proxying ZIP files through Vercel.

## Work breakdown

1. Add the Neon, Resend, and Tencent COS server dependencies.
2. Add a repeatable SQL migration for the `payment_orders` table and its constraints/indexes.
3. Replace the in-memory order store with async, parameterized Neon queries.
4. Extend the server-side product catalog with an explicit allowlisted COS object key.
5. Require and normalize a buyer email when creating an Alipay order.
6. Make Alipay notification and active-query confirmation persist the paid state idempotently.
7. Generate hashed claim tokens, send Resend email attempts with idempotency keys, and record delivery state.
8. Add an authenticated resend endpoint that matches the original email and rotates the claim token.
9. Add claim-information and atomic claim database operations.
10. Generate five-minute COS GET URLs using server-only CAM credentials.
11. Add the claim page and client-side download action.
12. Update checkout and payment-result UI for email capture, masked delivery state, and resend.
13. Update environment-variable documentation.
14. Run lint, production build, focused API/unit tests, and review the final diff.
15. Sync only the intended files to the remote project, commit them, run the Neon migration, redeploy, and perform a real ¥0.10 smoke test.

## Verification gates

- No client bundle imports database, Resend, or COS credentials.
- All eight current product slugs map to an allowlisted ZIP; the other four do not.
- Payment confirmation compares the callback/query amount with the persisted order amount.
- Duplicate payment confirmation cannot rotate a token or reset counters.
- Claim authorization is an atomic conditional update capped at three.
- The fourth claim and expired/tampered tokens fail without exposing storage details.
- `pnpm lint` and `pnpm build` pass before remote synchronization.
