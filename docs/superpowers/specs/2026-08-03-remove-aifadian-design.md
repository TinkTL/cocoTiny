# Remove Aifadian Integration

## Goal

Remove all Aifadian branding and entry points because CocoTiny no longer uses
the platform.

## Changes

- Remove the Aifadian item from the shared social-icon configuration.
- Delete the unused `public/icons/aifadian.svg` asset.
- Keep the remaining social icons and their layout unchanged.

## Verification

- Search the repository for `aifadian`, `afdian`, and `爱发电`; no application
  references or assets may remain.
- Run lint and a production build.
- Confirm the remaining social-icon row renders without an empty gap.
