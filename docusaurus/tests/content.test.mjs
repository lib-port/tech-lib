import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdtempSync, mkdirSync, rmSync, writeFileSync} from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  createSidebar, discoverDocuments, homeFrontMatter, isDocument, localMarkdownLinks,
  orderForDirectory,
} from '../lib/content.mjs';

test('discovers new and tracked Markdown, excluding generated, ignored, and site files', t => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'tech-lib-content-'));
  t.after(() => rmSync(root, {recursive: true, force: true}));
  execFileSync('git', ['init', '--quiet'], {cwd: root});
  for (const [file, content] of Object.entries({
    'README.md': '# Home',
    'notes/First.md': '# First',
    'notes/New note.mdx': '# New',
    'notes/ignored.md': '# Ignored',
    'notes/deleted.md': '# Deleted',
    'docusaurus/README.md': '# Setup',
    'projects/.venv/vendor.md': '# Vendor',
    'projects/node_modules/package/README.md': '# Package',
    '.github/template.md': '# Infrastructure',
    'AGENTS.md': '# Instructions',
    '.gitignore': 'notes/ignored.md\n',
  })) {
    mkdirSync(path.dirname(path.join(root, file)), {recursive: true});
    writeFileSync(path.join(root, file), content);
  }
  execFileSync('git', ['add', 'README.md', 'notes/First.md', 'notes/deleted.md'], {cwd: root});
  rmSync(path.join(root, 'notes/deleted.md'));
  assert.deepEqual(discoverDocuments(root), ['notes/First.md', 'notes/New note.mdx', 'README.md']);
  assert.equal(isDocument('projects/app/README.md'), true);
});

test('extracts ordered local Markdown links without treating code or downloads as pages', () => {
  const markdown = [
    '[First](part/Chapter%202%20%26%20tools.md)',
    '[Again](part/Chapter%202%20%26%20tools.md#section)',
    '[Reference][next]',
    '[External](https://example.com/notes.md)',
    '[Download](sheet.xlsx)',
    '![Image](diagram.svg)',
    '```md',
    '[Code example](not-a-real-document.md)',
    '```',
    '[next]: <part/Chapter 10.md>',
  ].join('\n\n');
  assert.deepEqual(localMarkdownLinks(markdown, 'course/README.md'), [
    'course/part/Chapter 2 & tools.md', 'course/part/Chapter 10.md',
  ]);
});

test('only the repository README becomes the homepage', () => {
  const root = path.resolve('/tmp/library');
  const frontMatter = {description: 'Existing metadata'};
  assert.deepEqual(homeFrontMatter(path.join(root, 'README.md'), root, frontMatter), {
    description: 'Existing metadata', slug: '/', sidebar_label: 'Home',
  });
  assert.equal(homeFrontMatter(path.join(root, 'course/README.md'), root, frontMatter), frontMatter);
});

test('sidebar uses README category indexes and inherited course order with numeric fallback', () => {
  const files = [
    'README.md', 'course/README.md',
    'course/book/Z first.md', 'course/book/A second.md',
    'course/book/Chapter 10.md', 'course/book/Chapter 2.md',
    'course/videos/Video.md', 'empty-course/README.md',
  ];
  const documents = files.map(file => ({file, id: file.replace(/\.md$/, '')}));
  const orders = new Map([['course', ['course/book/Z first.md', 'course/book/A second.md']]]);
  assert.deepEqual(orderForDirectory('course/book', orders), orders.get('course'));
  const sidebar = createSidebar(documents, orders);
  assert.equal(sidebar[0].id, 'README');
  assert.equal(sidebar[1].link.id, 'course/README');
  assert.deepEqual(sidebar[1].items[0].items.map(item => item.id), [
    'course/book/Z first', 'course/book/A second', 'course/book/Chapter 2', 'course/book/Chapter 10',
  ]);
  assert.deepEqual(sidebar[2], {type: 'doc', id: 'empty-course/README', label: 'empty-course'});
});
