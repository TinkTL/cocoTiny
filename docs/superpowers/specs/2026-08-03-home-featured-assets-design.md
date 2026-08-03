# Home Featured Asset Configuration

## Goal

Replace the fictional games and event content in the home hero and featured
grid with CocoTiny's real asset packs. Keep the selection easy to change as new
packs become the site's promoted content.

## Featured Selection

- Hero carousel: Qing Luo Outpost, Gardenia Herb Society, and Ying Long Night
  Lantern.
- Editor's Pick: Mint Knights.
- Two supporting cards: Dengmiao Youchai and Shacha Tangguowu.
- Windmill Bakery is not included in the featured area.
- The existing More Art Assets grid continues to show the full catalog, so an
  asset may appear in both sections.

## Architecture

Create one home-featured configuration for both reusable promotional banners
and asset placements. Hero banners have their own image, localized title,
localized description, and destination URL. This keeps the hero generic enough
to promote future events, announcements, or other non-asset content. The
current hero entries may resolve those fields from the existing asset catalog.

The featured grid continues to resolve asset slugs through the existing catalog
instead of duplicating names, descriptions, tags, covers, and routes.

The configuration is editorial: changing a featured asset or hero promotion
later requires changing only its configured content, destination, or asset
slug. The components and layout do not need to be rewritten.

## Presentation and Behavior

- Render the hero as a roughly 16:9 banner, matching the visual proportion of
  the large Editor's Pick card below it.
- Keep the hero title, description, carousel dots, arrow controls, responsive
  behavior, gradient, and hover animation.
- Do not show a badge or call-to-action button inside hero banners. The complete
  banner remains clickable and uses its configured destination URL.
- Use each selected pack's real cover, localized name, localized description,
  localized tags, and existing detail route.
- Keep the complete Editor's Pick card clickable but remove its visible View
  Asset Pack button.
- Label both supporting cards "Recently Updated" in English and "最近更新" in
  Chinese. Render both labels with the same bright green `#32C875` background
  and white text.
- Make every promoted card navigate to the matching asset detail page.
- Replace event dates, YouTube language, fictional game franchises, and game
  release messaging with asset-oriented labels.
- All visible copy follows the active English or Chinese locale.

## Verification

- Run lint and a production build.
- Check all six promoted links and images.
- Check English and Chinese content.
- Check carousel controls and responsive card layouts.
- Confirm More Art Assets remains unchanged and continues to list the full
  catalog.
