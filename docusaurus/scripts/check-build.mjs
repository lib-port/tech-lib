import assert from 'node:assert/strict';
import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {discoverDocuments} from '../lib/content.mjs';

const siteDir = fileURLToPath(new URL('..', import.meta.url));
const repositoryRoot = path.resolve(siteDir, '..');
const buildDir = path.join(siteDir, 'build');
const metadataDir = path.join(siteDir, '.docusaurus/docusaurus-plugin-content-docs/default');
const baseUrl = '/tech-lib/';
const origin = 'https://lib-port.github.io';

function walk(directory) {
  return readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(filename) : [filename];
  });
}

function builtFile(url) {
  const pathname = new URL(url, origin).pathname;
  assert.ok(pathname.startsWith(baseUrl), `Site URL is missing ${baseUrl}: ${url}`);
  const relative = decodeURIComponent(pathname.slice(baseUrl.length));
  const target = path.join(buildDir, relative);
  return pathname.endsWith('/') || statSync(target, {throwIfNoEntry: false})?.isDirectory()
    ? path.join(target, 'index.html') : target;
}

assert.ok(existsSync(path.join(buildDir, 'index.html')), 'Run npm run build before checking the site.');
const documents = walk(metadataDir).filter(file => file.endsWith('.json'))
  .map(file => JSON.parse(readFileSync(file, 'utf8')))
  .filter(metadata => metadata.source && metadata.permalink && metadata.id);
const sourceFiles = documents.map(doc => path.relative(repositoryRoot,
  path.resolve(siteDir, doc.source.replace(/^@site\//, ''))).split(path.sep).join('/'));
assert.deepEqual([...sourceFiles].sort(), discoverDocuments(repositoryRoot).sort(),
  'Every source document must have exactly one published document.');
const home = documents.find((doc, index) => sourceFiles[index] === 'README.md');
assert.equal(home?.permalink, baseUrl, 'The root README must be the homepage.');

for (const doc of documents) {
  const htmlPath = builtFile(doc.permalink);
  assert.ok(existsSync(htmlPath), `Missing rendered document: ${doc.permalink}`);
  const html = readFileSync(htmlPath, 'utf8');
  assert.match(html, /<h1\b/, `Missing heading in ${doc.permalink}`);
  assert.ok(!/class="[^"]*(?:DocSearch|navbar__search-input)/.test(html), 'Search must remain disabled.');
  for (const match of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (!href.startsWith(baseUrl) && !href.startsWith(origin + baseUrl)) continue;
    const url = new URL(href, origin);
    assert.ok(!/\.mdx?$/.test(url.pathname), `Unconverted Markdown link: ${href}`);
    assert.ok(existsSync(builtFile(url.href)), `Missing page or asset: ${href} in ${doc.permalink}`);
  }
}

const homeHtml = readFileSync(path.join(buildDir, 'index.html'), 'utf8');
assert.match(homeHtml, /<details\b/, 'Homepage introductions should remain expandable.');
assert.ok(!homeHtml.includes(':notebook:'), 'GitHub emoji shortcodes should be rendered.');

function elementWithClass(html, tag, className) {
  return [...html.matchAll(new RegExp(`<${tag}\\b([^>]*)>([\\s\\S]*?)</${tag}>`, 'g'))]
    .find(match => match[1].match(/\bclass="([^"]*)"/)?.[1].split(/\s+/).includes(className))?.[0];
}

function linkTo(html, permalink) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
    .find(match => match[1].match(/\bhref="([^"]*)"/)?.[1].replace(/\/$/, '')
      === permalink.replace(/\/$/, ''))?.[0];
}

const formattedProject = documents.find((doc, index) => sourceFiles[index]
  === 'IBM/IBM-CySA/projects/Cybersecurity Architecture Final Project.md');
assert.ok(formattedProject, 'The formatted cybersecurity architecture project must be published.');
const projectHtml = readFileSync(builtFile(formattedProject.permalink), 'utf8');
const plainProjectTitle = 'Cybersecurity Architecture Final Project';
const richProjectTitle = '<em>Cybersecurity Architecture</em> Final Project';
assert.equal(formattedProject.title, plainProjectTitle, 'Inherited metadata titles should contain plain text.');
assert.ok(projectHtml.includes(`<h1>${richProjectTitle}</h1>`), 'The article H1 must preserve its original formatting.');
const sidebarHtml = elementWithClass(projectHtml, 'aside', 'theme-doc-sidebar-container');
assert.ok(sidebarHtml, 'The project should have a document sidebar.');
assert.ok(linkTo(sidebarHtml, formattedProject.permalink)?.includes(richProjectTitle),
  'The project sidebar label should render inherited emphasis.');
const breadcrumbHtml = elementWithClass(projectHtml, 'nav', 'theme-doc-breadcrumbs');
assert.ok(breadcrumbHtml?.includes(richProjectTitle), 'The active breadcrumb should render inherited emphasis.');

const referringDocument = documents.find(doc => [doc.previous, doc.next]
  .some(item => item?.permalink === formattedProject.permalink));
assert.ok(referringDocument, 'The formatted project should be reachable from a paginator.');
const referringHtml = readFileSync(builtFile(referringDocument.permalink), 'utf8');
const paginatorHtml = elementWithClass(referringHtml, 'nav', 'pagination-nav');
assert.ok(paginatorHtml && linkTo(paginatorHtml, formattedProject.permalink)?.includes(richProjectTitle),
  'The paginator should render inherited emphasis in the destination title.');

const browserTitle = projectHtml.match(/<title\b[^>]*>([^<]*)<\/title>/)?.[1];
assert.ok(browserTitle?.startsWith(`${plainProjectTitle} | `), 'Browser titles should use the plain inherited title.');
const openGraphTitle = [...projectHtml.matchAll(/<meta\b[^>]*>/g)]
  .find(match => /\bproperty="og:title"/.test(match[0]))?.[0].match(/\bcontent="([^"]*)"/)?.[1];
assert.equal(openGraphTitle, browserTitle, 'Social metadata should use the same plain title as the browser.');
const breadcrumbData = [...projectHtml.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
  .filter(match => /\btype="application\/ld\+json"/.test(match[1]))
  .map(match => JSON.parse(match[2])).find(data => data['@type'] === 'BreadcrumbList');
assert.equal(breadcrumbData?.itemListElement.at(-1)?.name, plainProjectTitle,
  'Breadcrumb structured data should contain plain text.');

for (const [permalink, labels] of [
  [`${baseUrl}TS-PORP/deep-dive/`, ['TS-PORP', 'deep-dive']],
  [`${baseUrl}red-hat/RHCSC/`, ['red-hat']],
]) {
  const html = readFileSync(builtFile(permalink), 'utf8');
  const breadcrumbs = elementWithClass(html, 'nav', 'theme-doc-breadcrumbs');
  assert.ok(breadcrumbs, `Missing breadcrumbs in ${permalink}`);
  for (const label of labels) {
    assert.ok(breadcrumbs.includes(`>${label}<`), `Folder labels must remain literal: ${label}`);
  }
}

const capstone = documents.find((doc, index) => sourceFiles[index] === 'IBM/IBM-BA/capstone/README.md');
assert.ok(capstone, 'The business analysis capstone must be published.');
const capstoneHtml = readFileSync(builtFile(capstone.permalink), 'utf8');
const download = [...capstoneHtml.matchAll(/href="([^"]+\.xlsx)"/g)][0]?.[1];
assert.ok(download, 'The capstone spreadsheet download must remain linked.');
assert.ok(existsSync(builtFile(download)), 'The linked spreadsheet must be bundled.');
assert.deepEqual(readFileSync(builtFile(download)), readFileSync(path.join(repositoryRoot,
  'IBM/IBM-BA/capstone/Capstone_Project_M04L01_Data_Analysis.xlsx')),
  'The spreadsheet download must preserve the original bytes.');

for (const filename of ['package-lock.json', 'npm-shrinkwrap.json']) {
  assert.ok(!existsSync(path.join(siteDir, filename)), `Project lockfiles are disabled: ${filename}`);
}
assert.ok(!walk(buildDir).some(file => /search[-_]index/i.test(path.basename(file))), 'No search index should be generated.');
console.log(`Verified ${documents.length} documents, inherited title formatting, plain metadata, literal folder labels, homepage, internal targets, assets, spreadsheet download, and disabled search/lockfiles.`);
