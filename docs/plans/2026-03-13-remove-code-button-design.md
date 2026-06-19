# Remove Code Button Design

**Date:** 2026-03-13

## Goal

Remove the `Code` button from the homepage publication links while keeping the rest of the hero link cluster unchanged.

## Current State

The publication hero in `index.html` renders four action buttons in this order:

- `Paper`
- `arXiv`
- `Code`
- `BibTeX`

The `Code` button points to the project GitHub repository. No JavaScript behavior depends on this button.

## Chosen Approach

Delete the `Code` link block from the `.publication-links` markup in `index.html`.

This is the smallest correct change because:

- the button is static HTML
- no CSS selector targets it specifically
- no JavaScript logic references it
- removing the block keeps the remaining buttons and layout intact

## Non-Goals

- Reordering the remaining buttons
- Replacing the `Code` button with another destination
- Changing the visual style of the publication links

## Verification Plan

- Add a regression test that fails while the GitHub `Code` button is still present.
- Remove the `Code` button markup from `index.html`.
- Re-run `node --test tests/index.test.mjs` and confirm the suite passes.
