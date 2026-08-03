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

Create one home-featured configuration containing asset slugs, placements, and
localized promotional badges. Hero and featured-grid components resolve each
slug through the existing asset-pack catalog instead of duplicating titles,
descriptions, tags, images, and routes.

The configuration is editorial: changing a promoted pack later requires
changing only its slug and badge configuration. The components and layout do
not need to be rewritten.

## Presentation and Behavior

- Preserve the current hero, large-card, small-card layouts, gradients,
  controls, responsive behavior, and hover animation.
- Use each selected pack's real cover, localized name, localized description,
  localized tags, and existing detail route.
- Make every promoted card and hero call to action navigate to the matching
  asset detail page.
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
