import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const testDir = path.dirname(fileURLToPath(import.meta.url));
const htmlPath = path.join(testDir, '..', 'index.html');
const cssPath = path.join(testDir, '..', 'static', 'css', 'index.css');
const html = readFileSync(htmlPath, 'utf8');
const css = readFileSync(cssPath, 'utf8');

test('homepage loads template-style dependencies', () => {
  assert.match(
    html,
    /<meta name="viewport" content="width=device-width,\s*initial-scale=1"\s*\/?>/i,
  );
  assert.match(html, /bulma/i);
  assert.match(html, /static\/css\/index\.css/);
  assert.match(html, /static\/js\/index\.js/);
});

test('homepage preserves MultiBooth content inside the new section structure', () => {
  assert.match(html, /publication-title/);
  assert.match(html, /More Works/);
  assert.match(html, /Abstract/);
  assert.match(html, /Approach/);
  assert.match(html, /Results/);
  assert.match(html, /Ablation Study/);
  assert.match(html, /BibTeX/i);
  assert.match(html, /Title-case\.png/);
  assert.match(html, /Framework\.png/);
  assert.match(html, /main_compare\.png/);
  assert.match(html, /Ablation_study\.png/);
});

test('homepage removes known legacy issues', () => {
  assert.doesNotMatch(html, /navigateToSelectedURL/);
  assert.doesNotMatch(html, /hhttps:\/\//);
  assert.doesNotMatch(html, /^\s*<\s*$/m);
  assert.doesNotMatch(html, /MultiBooth_files\/style\.css/);
});

test('venue badge is placed directly above the publication links instead of above the title', () => {
  const titleIndex = html.indexOf('publication-title');
  const authorsIndex = html.indexOf('publication-authors');
  const metaIndex = html.indexOf('publication-meta');
  const venueIndex = html.indexOf('publication-kicker');
  const linksIndex = html.indexOf('publication-links');

  assert.notEqual(titleIndex, -1);
  assert.notEqual(authorsIndex, -1);
  assert.notEqual(metaIndex, -1);
  assert.notEqual(venueIndex, -1);
  assert.notEqual(linksIndex, -1);
  assert.ok(titleIndex < authorsIndex);
  assert.ok(authorsIndex < metaIndex);
  assert.ok(metaIndex < venueIndex);
  assert.ok(venueIndex < linksIndex);
});

test('abstract copy is centered', () => {
  assert.match(html, /class="content project-copy project-copy-centered"/);
  assert.match(
    css,
    /\.project-copy-centered\s*\{[^}]*text-align:\s*center;/s,
  );
});
