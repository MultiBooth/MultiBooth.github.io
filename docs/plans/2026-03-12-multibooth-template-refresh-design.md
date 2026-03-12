# MultiBooth Template Refresh Design

**Date:** 2026-03-12

## Goal

Keep the current MultiBooth project-page content intact while migrating the page layout and visual language to match the structure of the Academic Project Page Template.

## Current State

The site is a single-page static homepage centered on `index.html` with one legacy stylesheet at `MultiBooth_files/style.css`. The content is already complete enough for a paper page: title, authors, venue, links, abstract, approach, results, ablation, BibTeX, and a small "Other works" dropdown.

The current implementation has several technical issues:

- `index.html` contains malformed markup, including a stray `<` before the ablation section.
- The paper link uses `hhttps://...`, which breaks navigation.
- Visual styling is tied to an older fixed-width template with repeated boxed containers.
- The BibTeX section is hand-formatted with `<br>` and not presented as a modern copyable code block.
- The page is not aligned with the newer template's hierarchy, spacing, responsive behavior, and utility features.

## Constraints

- Preserve the current research content and section order as much as practical.
- Reuse the existing assets in `MultiBooth_files/` rather than reorganizing the repository around a new asset tree.
- Do not add placeholder template sections for content that does not exist today, such as video presentations, supplementary PDFs, posters, or generic research carousels.
- Avoid reverting unrelated dirty worktree changes.

## Chosen Approach

Rebuild the page around the target template's semantic section structure while keeping the content and assets from the current site.

This means:

- Rewriting `index.html` into a Bulma-based academic project page structure.
- Adding a new project-specific stylesheet for the new layout and visual system.
- Adding a small JavaScript file for the interactive template behaviors that still matter for this project.
- Leaving the legacy `MultiBooth_files/style.css` in place for safety, but no longer relying on it from the homepage.

## Section Mapping

### Hero Section

Map the current title, authors, affiliations, venue, and paper/code/BibTeX links into the template's hero header. Keep the "Other works" concept, but restyle it as the template's floating "More Works" menu.

### Teaser / Main Visual

Use the current title figure image (`MultiBooth_files/Title-case.png`) as the main teaser visual below the hero actions. No placeholder video will be added.

### Abstract

Keep the existing abstract text in a dedicated abstract section with centered heading and justified body text.

### Approach

Keep the approach description and the framework image (`MultiBooth_files/Framework.png`) as a standard section with a single large figure and caption-style paragraph.

### Results

Keep the main comparison paragraph and `MultiBooth_files/main_compare.png` in a results section. Use template spacing and figure treatment rather than the carousel module.

### Ablation

Keep the ablation paragraph and `MultiBooth_files/Ablation_study.png` in a dedicated section.

### BibTeX

Convert the current BibTeX block into a `<pre><code>` block with a copy button, matching the template behavior.

### Footer

Replace the current footer note with a template-style footer that credits the Academic Project Page Template while still reflecting this specific page.

## Visual System

The refreshed page should feel clearly derived from the target template:

- large centered publication header
- rounded action buttons
- section-level spacing with a light alternating background for emphasis
- restrained academic color palette
- responsive typography and layout
- floating utility controls for "More Works" and "Scroll to Top"

The implementation should be slightly simplified relative to the upstream template:

- no unused carousel library dependencies
- no Adobe viewer dependency
- no unused video-specific components

## Technical Design

### HTML

`index.html` will become the single source of structured content. The document head should be modernized with responsive meta tags, improved title/description metadata, and external CSS dependencies required by the new layout.

### CSS

Create `static/css/index.css` with custom project styles inspired by the template. It will define:

- hero layout polish
- section spacing
- button styling
- image framing
- BibTeX presentation
- dropdown behavior styling
- responsive adjustments for tablet and mobile

Bulma and icon fonts should be loaded from CDNs to avoid vendoring large static libraries that this project does not already contain.

### JavaScript

Create `static/js/index.js` with only the interactive behaviors needed for this page:

- toggle the "More Works" dropdown
- close the dropdown on outside click or `Escape`
- copy BibTeX to clipboard
- show and handle the scroll-to-top button

The current inline `navigateToSelectedURL()` script should be removed in favor of this cleaner interaction model.

## Non-Goals

- Adding new research content
- Creating or embedding a video presentation
- Introducing a site build pipeline
- Renaming or moving all legacy assets
- Converting the site into a multi-page project

## Verification Plan

- Open the page locally through a static HTTP server and confirm the major sections render in order.
- Verify the hero links work, including the corrected paper URL.
- Verify the floating "More Works" menu opens and closes correctly.
- Verify the BibTeX copy button copies clean plain text.
- Verify the page remains readable and well-spaced on a narrow mobile viewport.
