# MultiBooth Template Refresh Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Rebuild the MultiBooth homepage so it keeps the current research content but adopts the structure and styling of the Academic Project Page Template.

**Architecture:** Replace the legacy single-file boxed layout with a semantic Bulma-based project page in `index.html`, backed by a new local stylesheet and a small JavaScript controller for dropdown/copy/scroll interactions. Reuse the existing image and text assets from `MultiBooth_files/` and remove reliance on the old inline behaviors.

**Tech Stack:** Static HTML, Bulma via CDN, custom CSS, vanilla JavaScript

---

### Task 1: Capture the current content and section mapping

**Files:**
- Modify: `index.html`
- Reference: `docs/plans/2026-03-12-multibooth-template-refresh-design.md`

**Step 1: Write the failing test**

Create a content checklist in the working notes and verify these items exist in the new markup plan:

```text
- Title
- Authors
- Venue
- Paper / Code / BibTeX links
- Main teaser image
- Abstract
- Approach
- Results
- Ablation Study
- BibTeX
```

**Step 2: Run test to verify it fails**

Run: `rg -n "publication-title|Abstract|Approach|Results|Ablation Study|BibTeX" index.html`

Expected: FAIL to reflect the target template structure because the current page still uses the legacy layout.

**Step 3: Write minimal implementation**

Rewrite the page outline in `index.html` so each preserved content block maps to its new section.

**Step 4: Run test to verify it passes**

Run: `rg -n "publication-title|Abstract|Approach|Results|Ablation Study|BibTeX" index.html`

Expected: PASS with all major sections present in the new structure.

**Step 5: Commit**

```bash
git add index.html
git commit -m "refactor: restructure MultiBooth homepage sections"
```

### Task 2: Replace the document head and dependency loading

**Files:**
- Modify: `index.html`

**Step 1: Write the failing test**

Identify missing head features:

```text
- responsive viewport meta tag
- descriptive title
- stylesheet link for new local CSS
- CDN dependency for Bulma
- icon font dependency for action buttons
```

**Step 2: Run test to verify it fails**

Run: `rg -n "viewport|static/css/index.css|bulma|fontawesome|academicons" index.html`

Expected: FAIL because the current head does not load the target template dependencies.

**Step 3: Write minimal implementation**

Update the `<head>` to include:

```html
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bulma@0.9.4/css/bulma.min.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/jpswalsh/academicons@1/css/academicons.min.css">
<link rel="stylesheet" href="static/css/index.css">
```

**Step 4: Run test to verify it passes**

Run: `rg -n "viewport|static/css/index.css|bulma|font-awesome|academicons|fontawesome" index.html`

Expected: PASS with all required dependencies present.

**Step 5: Commit**

```bash
git add index.html
git commit -m "feat: modernize homepage head metadata"
```

### Task 3: Add project-specific template styling

**Files:**
- Create: `static/css/index.css`
- Modify: `index.html`

**Step 1: Write the failing test**

Define the required style hooks:

```text
.publication-title
.publication-links
.publication-figure
.section-shell
.more-works-container
.scroll-to-top
.bibtex-header
```

**Step 2: Run test to verify it fails**

Run: `test -f static/css/index.css && rg -n "publication-title|publication-links|publication-figure|section-shell|more-works-container|scroll-to-top|bibtex-header" static/css/index.css`

Expected: FAIL because the stylesheet does not exist yet.

**Step 3: Write minimal implementation**

Create `static/css/index.css` with:

```css
:root {
  --primary-color: #2563eb;
  --text-primary: #1e293b;
  --background-secondary: #f8fafc;
  --border-color: #e2e8f0;
}

.publication-title { font-weight: 800; }
.section-shell { padding: 4rem 0; }
.publication-figure img { border-radius: 16px; }
.more-works-container,
.scroll-to-top { position: fixed; }
```

Then expand it to cover the final responsive layout.

**Step 4: Run test to verify it passes**

Run: `rg -n "publication-title|publication-links|publication-figure|section-shell|more-works-container|scroll-to-top|bibtex-header" static/css/index.css`

Expected: PASS with all required selectors present.

**Step 5: Commit**

```bash
git add static/css/index.css index.html
git commit -m "feat: add academic template styles for homepage"
```

### Task 4: Add the interactive template behaviors

**Files:**
- Create: `static/js/index.js`
- Modify: `index.html`

**Step 1: Write the failing test**

Define required behaviors:

```text
- toggleMoreWorks
- copyBibTeX
- scrollToTop
- outside-click close behavior
```

**Step 2: Run test to verify it fails**

Run: `test -f static/js/index.js && rg -n "toggleMoreWorks|copyBibTeX|scrollToTop|addEventListener" static/js/index.js`

Expected: FAIL because the script does not exist yet.

**Step 3: Write minimal implementation**

Create `static/js/index.js` containing:

```js
function toggleMoreWorks() {}
function copyBibTeX() {}
function scrollToTop() {}

document.addEventListener('click', () => {});
document.addEventListener('keydown', () => {});
window.addEventListener('scroll', () => {});
```

Then complete each behavior and load the script from `index.html`.

**Step 4: Run test to verify it passes**

Run: `rg -n "toggleMoreWorks|copyBibTeX|scrollToTop|addEventListener" static/js/index.js && rg -n "static/js/index.js" index.html`

Expected: PASS with the script defined and referenced.

**Step 5: Commit**

```bash
git add static/js/index.js index.html
git commit -m "feat: add homepage interaction behaviors"
```

### Task 5: Migrate the hero content and action buttons

**Files:**
- Modify: `index.html`

**Step 1: Write the failing test**

Check for a proper hero composition:

```text
- title block
- author block
- venue block
- action buttons for Paper, Code, BibTeX
- teaser figure below the header
```

**Step 2: Run test to verify it fails**

Run: `rg -n "publication-title|publication-authors|publication-links|Title-case.png" index.html`

Expected: FAIL or partial FAIL because the current page does not use the new hero structure.

**Step 3: Write minimal implementation**

Build the hero markup around:

```html
<section class="hero publication-header">
  ...
  <h1 class="title is-1 publication-title">MultiBooth: ...</h1>
  <div class="publication-authors">...</div>
  <div class="publication-links">...</div>
</section>
```

Keep the current title figure as the hero teaser image.

**Step 4: Run test to verify it passes**

Run: `rg -n "publication-title|publication-authors|publication-links|Title-case.png" index.html`

Expected: PASS with the new hero structure in place.

**Step 5: Commit**

```bash
git add index.html
git commit -m "feat: migrate MultiBooth hero section"
```

### Task 6: Migrate the paper sections and BibTeX

**Files:**
- Modify: `index.html`

**Step 1: Write the failing test**

Confirm the new sections and figures are present:

```text
- Framework.png in Approach
- main_compare.png in Results
- Ablation_study.png in Ablation Study
- pre/code BibTeX block
```

**Step 2: Run test to verify it fails**

Run: `rg -n "Framework.png|main_compare.png|Ablation_study.png|<pre|bibtex-code" index.html`

Expected: FAIL to match the intended modern section structure.

**Step 3: Write minimal implementation**

Rebuild these sections using semantic headings, template spacing, and figure wrappers while preserving the current descriptive text.

**Step 4: Run test to verify it passes**

Run: `rg -n "Framework.png|main_compare.png|Ablation_study.png|<pre|bibtex-code" index.html`

Expected: PASS with all preserved assets and the new BibTeX block present.

**Step 5: Commit**

```bash
git add index.html
git commit -m "feat: migrate research sections and bibtex block"
```

### Task 7: Remove legacy behaviors and validate the final page

**Files:**
- Modify: `index.html`
- Modify: `static/css/index.css`
- Modify: `static/js/index.js`

**Step 1: Write the failing test**

List final cleanup targets:

```text
- no inline navigateToSelectedURL script
- no legacy stylesheet reference
- no malformed stray "<" token
- page should reference only the new homepage assets
```

**Step 2: Run test to verify it fails**

Run: `rg -n "navigateToSelectedURL|MultiBooth_files/style.css|^    <$" index.html`

Expected: FAIL because the current file still contains legacy remnants.

**Step 3: Write minimal implementation**

Remove the legacy hooks, ensure the document is well-formed, and make small CSS/JS adjustments needed after end-to-end review.

**Step 4: Run test to verify it passes**

Run: `rg -n "navigateToSelectedURL|MultiBooth_files/style.css|^    <$" index.html`

Expected: PASS with no matches.

Then run:

```bash
python3 -m http.server 8000
```

Manually verify:

```text
- desktop layout
- mobile layout
- paper/code/bibtex links
- More Works dropdown
- BibTeX copy button
- scroll-to-top control
```

**Step 5: Commit**

```bash
git add index.html static/css/index.css static/js/index.js
git commit -m "refactor: complete MultiBooth academic template refresh"
```
