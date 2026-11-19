import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import { readPublishedPosts } from '../scripts/blog-content.js';

function collection(t) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'field-notes-'));
  t.after(() => fs.rmSync(dir, { recursive: true, force: true }));
  const file = (slug) => path.join(dir, `${slug}.md`);
  return {
    read: () => readPublishedPosts(dir),
    write: (slug, text) => fs.writeFileSync(file(slug), text),
    remove: (slug) => fs.unlinkSync(file(slug)),
  };
}
const article = `---
title: 'A note: from the editor'
description: >-
  Verify a source
  before quoting it.
date: 2026-11-18
category: AI & Data
tags:
  - 'Two words'
  - 'A, B'
featured: false
---

Keep the **body** intact.\n`;

test('CMS-style block lists, folded text and unquoted dates survive a save', (t) => {
  const files = collection(t);
  files.write('public-note', article.replaceAll('\n', '\r\n'));
  const [post] = files.read();
  assert.equal(post.title, 'A note: from the editor');
  assert.equal(post.description, 'Verify a source before quoting it.');
  assert.equal(post.date, '2026-11-18');
  assert.deepEqual(post.tags, ['Two words', 'A, B']);
  assert.equal(post.featured, false);
  assert.equal(post.readingTime, '1 min read');
  assert.equal(post.coverImage, '/share/jospeed-portfolio.jpg');
  assert.equal(post.content.trim(), 'Keep the **body** intact.');
});

test('publishing, unpublishing and deleting update the same date-ordered collection', (t) => {
  const files = collection(t);
  const draft = article.replace('featured: false', 'draft: true');
  files.write('second-note', article);
  files.write('older-note', article.replace('2026-11-18', '"2025-10-10"'));
  files.write('first-note', draft);
  const slugs = () => files.read().map((p) => p.slug);
  assert.deepEqual(slugs(), ['second-note', 'older-note']);
  files.write('first-note', draft.replace('draft: true', 'draft: false'));
  assert.deepEqual(slugs(), ['first-note', 'second-note', 'older-note']);
  files.write('second-note', draft);
  assert.deepEqual(slugs(), ['first-note', 'older-note']);
  files.remove('older-note');
  assert.deepEqual(slugs(), ['first-note']);
});

test('a mistyped draft flag is not silently treated as published', (t) => {
  const files = collection(t);
  files.write('typo', article.replace('featured: false', 'draft: "true"'));
  assert.throws(files.read, /draft must be true or false/);
});
