import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {mkdtempSync, mkdirSync, rmSync, writeFileSync} from 'node:fs';
import {createRequire} from 'node:module';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {toSidebarDocItemLinkProp} from '@docusaurus/plugin-content-docs/lib/props.js';
import {
  createSidebar, discoverDocuments, documentFrontMatter, isDocument, localMarkdownLinks,
  orderForDirectory,
} from '../lib/content.ts';
import {inheritTitle} from '../lib/inherited-titles.ts';

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
  assert.deepEqual(documentFrontMatter(path.join(root, 'README.md'), root, frontMatter), {
    description: 'Existing metadata', slug: '/', sidebar_label: 'Home',
  });
  assert.equal(documentFrontMatter(path.join(root, 'course/README.md'), root, frontMatter), frontMatter);
});

test('normalizes filename slugs while retaining punctuation and other frontmatter', () => {
  const root = path.resolve('/tmp/library');
  const frontMatter: Record<string, unknown> = {id: 'Original ID', title: 'Original Title', sidebar_label: 'Custom label'};
  for (const [file, slug] of [
    ['pluralsight/ansible/Getting Started with Ansible.md', 'getting-started-with-ansible'],
    ['IBM/IBM-CySA/  Chapter  2\t& Tools  .mdx', 'chapter-2-&-tools'],
    ['TS-PORP/Notes (Part 1), v2.0.MD', 'notes-part-1,-v2.0'],
    ['Course/My_Note-Example.MDX', 'my_note-example'],
    ['already-normalized.md', 'already-normalized'],
  ]) {
    assert.deepEqual(documentFrontMatter(path.join(root, file), root, frontMatter), {
      ...frontMatter, slug,
    });
  }
  assert.equal(frontMatter.slug, undefined, 'Generating a slug must not mutate supplied frontmatter.');
});

test('parenthesized filenames produce URLs that match in the installed Docusaurus router', () => {
  const require = createRequire(import.meta.url);
  const requireFromCore = createRequire(require.resolve('@docusaurus/core/package.json'));
  const {matchPath} = requireFromCore('react-router');
  const root = path.resolve('/tmp/library');
  for (const name of ['Model-based Systems Engineering (MBSE)', 'Notes (Part (1))']) {
    const {slug} = documentFrontMatter(path.join(root, 'Course', `${name}.md`), root, {});
    assert.equal(typeof slug, 'string');
    const route = `/tech-lib/Course/${slug}/`;
    assert.ok(matchPath(route, {path: route, exact: true}),
      `The generated URL must render its document instead of Page Not Found: ${route}`);
    assert.doesNotMatch(route, /[()]/,
      'Generated filename URLs must not contain route-pattern parentheses.');
  }
});

test('preserves explicit slugs and the existing homepage override', () => {
  const root = path.resolve('/tmp/library');
  for (const slug of ['/Custom/Path', 'Custom-Relative', '/']) {
    const frontMatter = {slug, title: 'Custom title', pagination_label: 'Navigation title'};
    for (const file of ['Course/My Note.md', 'Course/README.md', 'Course/index.mdx']) {
      assert.equal(documentFrontMatter(path.join(root, file), root, frontMatter), frontMatter);
    }
  }
  assert.deepEqual(documentFrontMatter(path.join(root, 'README.md'), root, {slug: '/custom'}), {
    slug: '/', sidebar_label: 'Home',
  });
});

test('leaves README, index, and folder-matching category routes to Docusaurus', () => {
  const root = path.resolve('/tmp/library');
  const frontMatter = {description: 'Category introduction', pagination_label: 'Navigation title'};
  for (const file of [
    'Course/README.md', 'Course/rEaDmE.mdx', 'Course/INDEX.MD',
    'Course/index.mdx', 'Course/cOuRsE.md', 'My Course/my course.mdx', 'index.md',
  ]) {
    assert.equal(documentFrontMatter(path.join(root, file), root, frontMatter), frontMatter);
  }
  assert.deepEqual(documentFrontMatter(path.join(root, 'Course/Part/Course.md'), root, frontMatter), {
    ...frontMatter, slug: 'course',
  });
});

test('pagination uses filenames despite headings, explicit titles, custom routes, and IDs', () => {
  const root = path.resolve('/tmp/library');
  for (const [frontMatter, content] of [
    [{}, '# **Actual** heading'],
    [{title: 'Explicit title'}, '# Different heading'],
    [{slug: '/custom'}, '# Actual heading'],
    [{id: 'custom-id'}, 'No heading'],
    [{}, 'No heading'],
    [{title: ''}, 'No heading'],
  ] as const) {
    const inherited = inheritTitle(content, frontMatter);
    const result = documentFrontMatter(path.join(root, 'course/My_Note (Part 1).mdx'), root, inherited);
    assert.equal(result.pagination_label, 'My_Note (Part 1)');
    assert.equal(inherited.pagination_label, undefined, 'Derived navigation labels must not mutate source metadata.');
  }
  for (const frontMatter of [
    {title: 'Heading', sidebar_label: 'Custom sidebar'},
    {title: 'Heading', pagination_label: 'Custom pagination'},
  ]) {
    const result = documentFrontMatter(path.join(root, 'course/My Note.md'), root, frontMatter);
    assert.equal(result.pagination_label, frontMatter.pagination_label);
  }
});

test('sidebar and pagination labels use the exact filename without its Markdown extension', () => {
  const files = ['My_Note (Part 1), v2.0.MD', '  Mixed CASE & tools  .mDx'];
  const documents = files.map((file, index) => ({file: `course/${file}`, id: `custom-id-${index}`}));
  const sidebar = createSidebar(documents, new Map([['course', documents.map(doc => doc.file)]]));
  assert.ok(sidebar[0].type === 'category');
  assert.deepEqual(sidebar[0].items.map(item => {
    assert.ok(item.type === 'doc');
    return item.label;
  }), ['My_Note (Part 1), v2.0', '  Mixed CASE & tools  ']);
  for (const file of files) {
    assert.equal(documentFrontMatter(`/tmp/library/course/${file}`, '/tmp/library', {}).pagination_label,
      file.replace(/\.mdx?$/i, ''));
  }
});

test('Docusaurus applies custom sidebar labels ahead of generated filenames and document titles', () => {
  const sidebar = createSidebar([{file: 'My_Note.md', id: 'custom-id'}], new Map());
  const item = sidebar[0];
  assert.ok(item.type === 'doc');
  for (const [frontMatter, expected] of [[{}, 'My_Note'], [{sidebar_label: 'Custom label'}, 'Custom label']] as const) {
    const link = toSidebarDocItemLinkProp({item, doc: {
      id: 'custom-id', title: 'Different heading', permalink: '/tech-lib/my-note/', frontMatter, unlisted: false,
    }});
    assert.equal(link.label, expected);
  }
});

test('sidebar uses README or generated indexes and inherited course order with numeric fallback', () => {
  const files = [
    'README.md', 'course/README.md',
    'course/book/Z first.md', 'course/book/A second.md',
    'course/book/Chapter 10.md', 'course/book/Chapter 2.md',
    'course/videos/Video.md', 'empty-course/README.md',
    'mdx-course/rEaDmE.MDX', 'mdx-course/Topic.md',
  ];
  const documents = files.map(file => ({file, id: file.replace(/\.mdx?$/i, '')}));
  const orders = new Map([['course', ['course/book/Z first.md', 'course/book/A second.md']]]);
  assert.deepEqual(orderForDirectory('course/book', orders), orders.get('course'));
  const sidebar = createSidebar(documents, orders);
  assert.ok(sidebar[0].type === 'doc');
  assert.equal(sidebar[0].id, 'README');
  assert.ok(sidebar[1].type === 'category' && sidebar[1].link?.type === 'doc');
  assert.equal(sidebar[1].link.id, 'course/README');
  const book = sidebar[1].items[0];
  assert.ok(book.type === 'category');
  assert.deepEqual(book.link, {type: 'generated-index'});
  assert.deepEqual(book.items.map(item => {
    assert.ok(item.type === 'doc');
    return item.id;
  }), [
    'course/book/Z first', 'course/book/A second', 'course/book/Chapter 2', 'course/book/Chapter 10',
  ]);
  const videos = sidebar[1].items[1];
  assert.ok(videos.type === 'category');
  assert.deepEqual(videos.link, {type: 'generated-index'});
  assert.deepEqual(sidebar[2], {type: 'doc', id: 'empty-course/README', label: 'empty-course'});
  assert.ok(sidebar[3].type === 'category');
  assert.deepEqual(sidebar[3].link, {type: 'doc', id: 'mdx-course/rEaDmE'});
});
