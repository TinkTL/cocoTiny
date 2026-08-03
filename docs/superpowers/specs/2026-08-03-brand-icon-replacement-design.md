# Brand Icon Replacement

## Goal

Replace CocoTiny's Xiaohongshu, Bilibili, and Alipay icons with the three SVG
files supplied by the user while preserving their original brand colors.

## Assets

- Replace `public/icons/xiaohongshu.svg` with the supplied `小红书.svg`.
- Replace `public/icons/bilibili.svg` with the supplied `哔哩哔哩.svg`.
- Add `public/icons/alipay.svg` from the supplied `支付宝支付.svg`.
- Do not alter the SVG fill colors.

## Rendering

- Change the shared social-icon row from a monochrome CSS mask to direct image
  rendering so the supplied SVG colors remain visible.
- Preserve the current Bilibili and Xiaohongshu icon sizes, spacing,
  accessibility labels, and link behavior.
- Replace the checkout's blue square containing the Chinese character `支`
  with the supplied Alipay SVG at the same 40px visual slot.
- Do not change payment behavior, checkout copy, or layout.

## Verification

- Confirm the three public SVG assets match the supplied files byte-for-byte.
- Confirm the old text-based Alipay icon is absent.
- Run lint and a production build.
- Verify the generated application references all three new icon paths.
