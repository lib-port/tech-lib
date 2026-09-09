import assert from 'node:assert/strict';
import {mkdirSync, mkdtempSync, rmSync, writeFileSync} from 'node:fs';
import {tmpdir} from 'node:os';
import path from 'node:path';
import test from 'node:test';
import remarkParse from 'remark-parse';
import {unified} from 'unified';
import remarkRepositoryFileLinks from '../plugins/repository-file-links.mjs';

const repositoryUrl = 'https://github.com/example/library';
const ref = 'main';

function fixture(t) {
  const directory = mkdtempSync(path.join(tmpdir(), 'repository-file-links-'));
  t.after(() => rmSync(directory, {recursive: true, force: true}));
  const repositoryRoot = path.join(directory, 'repo');
  const files = [
    'docs/topics/guide.md',
    'docs/topics/report.xlsx',
    'docs/topics/second.xlsx',
    'docs/topics/diagram.png',
    'docs/topics/page.md',
    'docs/topics/page.MD',
    'docs/topics/page.mdx',
    'docs/topics/page.MDX',
    'docs/assets/report.XLSX',
    'docs/assets/export.html',
    'docs/assets/LICENSE',
    'docs/assets/analysis Q1.xlsx',
    'docs/assets/plan #1?.csv',
    'docs/assets/%20 budget.csv',
    'docs/assets/café.csv',
  ];
  for (const file of files) {
    const absolutePath = path.join(repositoryRoot, file);
    mkdirSync(path.dirname(absolutePath), {recursive: true});
    writeFileSync(absolutePath, 'Fixture content');
  }
  writeFileSync(path.join(directory, 'outside.xlsx'), 'Outside the repository');
  const sourcePath = path.join(repositoryRoot, 'docs/topics/guide.md');
  const processor = unified().use(remarkParse).use(remarkRepositoryFileLinks, {
    repositoryRoot, repositoryUrl, ref,
  });
  return {
    parse: markdown => processor.parse(markdown),
    transform: markdown => processor.run(processor.parse(markdown), {path: sourcePath}),
  };
}

function nodesOfType(tree, type) {
  const nodes = [];
  function visit(node) {
    if (node.type === type) nodes.push(node);
    node.children?.forEach(visit);
  }
  visit(tree);
  return nodes;
}

test('rewrites existing relative non-Markdown files using repository paths', async t => {
  const {transform} = fixture(t);
  const cases = [
    ['report.xlsx', 'docs/topics/report.xlsx'],
    ['./report.xlsx', 'docs/topics/report.xlsx'],
    ['../assets/report.XLSX', 'docs/assets/report.XLSX'],
    ['../assets/export.html', 'docs/assets/export.html'],
    ['../assets/LICENSE', 'docs/assets/LICENSE'],
    ['../assets/../topics/report.xlsx?download=1&view=full#sheet-2', 'docs/topics/report.xlsx?download=1&view=full#sheet-2'],
  ];
  const tree = await transform(cases.map(([url], index) => `[File ${index}](${url})`).join('\n\n'));
  assert.deepEqual(nodesOfType(tree, 'link').map(node => node.url),
    cases.map(([, target]) => `${repositoryUrl}/raw/${ref}/${target}`));
});

test('encodes each filename segment once while preserving queries and fragments', async t => {
  const {transform} = fixture(t);
  const cases = [
    ['../assets/analysis Q1.xlsx', 'docs/assets/analysis%20Q1.xlsx'],
    ['../assets/analysis%20Q1.xlsx', 'docs/assets/analysis%20Q1.xlsx'],
    ['../assets/plan%20%231%3F.csv?raw=1#preview', 'docs/assets/plan%20%231%3F.csv?raw=1#preview'],
    ['../assets/%2520%20budget.csv', 'docs/assets/%2520%20budget.csv'],
    ['../assets/caf%C3%A9.csv', 'docs/assets/caf%C3%A9.csv'],
  ];
  const tree = await transform(cases.map(([url], index) => `[File ${index}](<${url}>)`).join('\n\n'));
  assert.deepEqual(nodesOfType(tree, 'link').map(node => node.url),
    cases.map(([, target]) => `${repositoryUrl}/raw/${ref}/${target}`));
});

test('preserves Markdown navigation, non-file targets, and other URL forms', async t => {
  const {parse, transform} = fixture(t);
  const urls = [
    'page.md', 'page.MD', 'page.mdx', 'page.MDX', 'page.md#heading',
    '../assets', '../assets/', 'missing.xlsx', '../../../outside.xlsx',
    '/docs/topics/report.xlsx', '//example.com/report.xlsx',
    'https://example.com/report.xlsx', 'http://example.com/report.xlsx',
    'mailto:example@example.com', 'data:text/plain,hello',
    '#report.xlsx', '?download=1',
  ];
  const markdown = urls.map((url, index) => `[Target ${index}](${url})`).join('\n\n');
  assert.deepEqual(await transform(markdown), parse(markdown));
});

test('preserves embedded images and code while rewriting links to image files', async t => {
  const {parse, transform} = fixture(t);
  const markdown = [
    '![Diagram](diagram.png "Embedded diagram")',
    '[Open diagram](diagram.png "View file")',
    '`[Example](report.xlsx)`',
    '```md\n[Example](report.xlsx)\n```',
  ].join('\n\n');
  const original = parse(markdown);
  const tree = await transform(markdown);
  for (const type of ['image', 'inlineCode', 'code']) {
    assert.deepEqual(nodesOfType(tree, type), nodesOfType(original, type));
  }
  const [link] = nodesOfType(tree, 'link');
  assert.equal(link.url, `${repositoryUrl}/raw/main/docs/topics/diagram.png`);
  assert.equal(link.title, 'View file');
  assert.deepEqual(link.children, nodesOfType(original, 'link')[0].children);
});

test('rewrites reference links without changing a definition shared by images', async t => {
  const {parse, transform} = fixture(t);
  const markdown = [
    '[Read **now**][RePoRt]',
    '![Original][report]',
    '[Report][]',
    '[Report]',
    '[report]: report.xlsx?raw=1#sheet "Workbook title"',
  ].join('\n\n');
  const original = parse(markdown);
  const tree = await transform(markdown);
  const originalLinks = nodesOfType(original, 'linkReference');
  const links = nodesOfType(tree, 'link');
  assert.equal(links.length, 3);
  assert.equal(nodesOfType(tree, 'linkReference').length, 0);
  for (const [index, link] of links.entries()) {
    assert.equal(link.url, `${repositoryUrl}/raw/main/docs/topics/report.xlsx?raw=1#sheet`);
    assert.equal(link.title, 'Workbook title');
    assert.deepEqual(link.children, originalLinks[index].children);
  }
  assert.deepEqual(nodesOfType(tree, 'imageReference'), nodesOfType(original, 'imageReference'));
  assert.deepEqual(nodesOfType(tree, 'definition'), nodesOfType(original, 'definition'));
});

test('uses the first reference definition, including when the first target is Markdown', async t => {
  const {parse, transform} = fixture(t);
  const markdown = [
    '[Workbook][report]',
    '[Page][page]',
    '[report]: report.xlsx "First definition"',
    '[REPORT]: second.xlsx "Later definition"',
    '[page]: page.md',
    '[PAGE]: report.xlsx',
  ].join('\n\n');
  const original = parse(markdown);
  const tree = await transform(markdown);
  const [link] = nodesOfType(tree, 'link');
  assert.equal(link.url, `${repositoryUrl}/raw/main/docs/topics/report.xlsx`);
  assert.equal(link.title, 'First definition');
  assert.deepEqual(nodesOfType(tree, 'linkReference'),
    nodesOfType(original, 'linkReference').filter(node => node.identifier === 'page'));
  assert.deepEqual(nodesOfType(tree, 'definition'), nodesOfType(original, 'definition'));
});

test('keeps reference links unchanged when their destinations are not repository assets', async t => {
  const {parse, transform} = fixture(t);
  const markdown = [
    '[Page][page] [Missing][missing] [External][external] [Directory][directory]',
    '![Only an image][image]',
    '[page]: page.MDX',
    '[missing]: missing.xlsx',
    '[external]: https://example.com/report.xlsx',
    '[directory]: ../assets/',
    '[image]: diagram.png',
  ].join('\n\n');
  assert.deepEqual(await transform(markdown), parse(markdown));
});
