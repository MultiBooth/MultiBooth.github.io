# Remove Code Button Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Remove the GitHub `Code` button from the homepage publication links without changing the other hero actions.

**Architecture:** This is a static markup change in `index.html` backed by a regression test in `tests/index.test.mjs`. No CSS or JavaScript changes are needed because the button is not referenced outside the hero link markup.

**Tech Stack:** Static HTML, Node test runner

---

### Task 1: Remove the publication `Code` button

**Files:**
- Modify: `tests/index.test.mjs`
- Modify: `index.html`

**Step 1: Write the failing test**

Add a regression test asserting the homepage HTML no longer contains:

```text
https://github.com/chenyangzhu1/MultiBooth
<span>Code</span>
```

**Step 2: Run test to verify it fails**

Run: `node --test tests/index.test.mjs`

Expected: FAIL because the current homepage still includes the GitHub `Code` button.

**Step 3: Write minimal implementation**

Delete the `Code` link block from `.publication-links` in `index.html` and keep the surrounding `Paper`, `arXiv`, and `BibTeX` blocks unchanged.

**Step 4: Run test to verify it passes**

Run: `node --test tests/index.test.mjs`

Expected: PASS with the new regression test green and the existing homepage checks still green.
