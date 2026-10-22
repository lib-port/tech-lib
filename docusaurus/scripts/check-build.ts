import assert from 'node:assert/strict';
import {existsSync, readFileSync, readdirSync, statSync} from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {parse, serialize} from 'parse5';
import type {DefaultTreeAdapterMap} from 'parse5';
import siteConfig from '../docusaurus.config.ts';
import {discoverDocuments} from '../lib/content.ts';
import type {DocMetadata} from '@docusaurus/plugin-content-docs';
import type {GlobalPluginData} from '@docusaurus/plugin-content-docs/client';

const siteDir = fileURLToPath(new URL('..', import.meta.url));
const repositoryRoot = path.resolve(siteDir, '..');
const buildDir = path.join(siteDir, 'build');
const metadataDir = path.join(siteDir, '.docusaurus/docusaurus-plugin-content-docs/default');
const {baseUrl, url: origin} = siteConfig;

function readBuiltHtml(filename: string) {
  // Normalize optional quotes and end tags emitted by either HTML minifier.
  return serialize(parse(readFileSync(filename, 'utf8')));
}

function walk(directory: string): string[] {
  return readdirSync(directory, {withFileTypes: true}).flatMap(entry => {
    const filename = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(filename) : [filename];
  });
}

function builtFile(url: string) {
  const pathname = new URL(url, origin).pathname;
  assert.ok(pathname.startsWith(baseUrl), `Site URL is missing ${baseUrl}: ${url}`);
  const relative = decodeURIComponent(pathname.slice(baseUrl.length));
  const target = path.join(buildDir, relative);
  return pathname.endsWith('/') || statSync(target, {throwIfNoEntry: false})?.isDirectory()
    ? path.join(target, 'index.html') : target;
}

assert.ok(existsSync(path.join(buildDir, 'index.html')), 'Run pnpm run build locally, or npm run build in CI, before checking the site.');
const documents = walk(metadataDir).filter(file => file.endsWith('.json'))
  .map(file => JSON.parse(readFileSync(file, 'utf8')) as DocMetadata)
  .filter(metadata => metadata.source && metadata.permalink && metadata.id);
const sourceFiles = documents.map(doc => path.relative(repositoryRoot,
  path.resolve(siteDir, doc.source.replace(/^@site\//, ''))).split(path.sep).join('/'));
assert.deepEqual([...sourceFiles].sort(), discoverDocuments(repositoryRoot).sort(),
  'Every source document must have exactly one published document.');
const home = documents.find((doc, index) => sourceFiles[index] === 'README.md');
assert.equal(home?.permalink, baseUrl, 'The root README must be the homepage.');
const globalData = JSON.parse(readFileSync(path.join(siteDir, '.docusaurus/globalData.json'), 'utf8')) as {
  'docusaurus-plugin-content-docs': Record<string, GlobalPluginData>;
};
const generatedIndexes = globalData['docusaurus-plugin-content-docs'].default.versions
  .flatMap(version => version.docs.filter(doc => doc.id.startsWith('/category/')));
const foldersWithoutReadme = new Set<string>();
for (const source of sourceFiles) {
  for (let directory = path.posix.dirname(source); directory !== '.'; directory = path.posix.dirname(directory)) {
    foldersWithoutReadme.add(directory);
  }
}
for (const source of sourceFiles) {
  if (/^README\.mdx?$/i.test(path.posix.basename(source))) foldersWithoutReadme.delete(path.posix.dirname(source));
}
assert.equal(generatedIndexes.length, foldersWithoutReadme.size,
  'Every folder without a README must have one generated index.');
const publishedRoutes = [...documents.map(doc => doc.permalink), ...generatedIndexes.map(index => index.path)];
assert.equal(new Set(publishedRoutes.map(route => decodeURIComponent(route).replace(/\/$/, ''))).size,
  publishedRoutes.length, 'Documents and generated indexes must have unique routes.');
const documentsByPermalink = new Map(documents.map(doc => [doc.permalink, doc]));
const documentBreadcrumbs: string[] = [];

for (const [index, doc] of documents.entries()) {
  const source = sourceFiles[index];
  const expectedId = path.posix.join(path.posix.dirname(source),
    doc.frontMatter.id ?? path.posix.basename(source).replace(/\.(md|mdx)$/i, ''));
  assert.equal(doc.id, expectedId, `URL normalization must preserve the document ID: ${source}`);
  const htmlPath = builtFile(doc.permalink);
  assert.ok(existsSync(htmlPath), `Missing rendered document: ${doc.permalink}`);
  const html = readBuiltHtml(htmlPath);
  assert.match(html, /<h1\b/, `Missing heading in ${doc.permalink}`);
  const breadcrumbs = elementWithClass(html, 'nav', 'theme-doc-breadcrumbs');
  assert.ok(breadcrumbs, `Missing breadcrumbs in ${doc.permalink}`);
  documentBreadcrumbs.push(breadcrumbs);
  const filename = path.posix.basename(source);
  if (!/^README\.mdx?$/i.test(filename)) {
    const expectedLabel = filename.replace(/\.mdx?$/i, '');
    const activeBreadcrumb = elementWithClass(breadcrumbs, 'li', 'breadcrumbs__item--active');
    assert.ok(activeBreadcrumb, `Missing active breadcrumb in ${doc.permalink}`);
    assert.equal(textContent(parse(activeBreadcrumb)), expectedLabel,
      `The active breadcrumb must use the source filename without its extension: ${source}`);
    assert.equal(breadcrumbStructuredData(html)?.itemListElement?.at(-1)?.name, expectedLabel,
      `Breadcrumb structured data must use the same filename label: ${source}`);
    const sidebar = elementWithClass(html, 'aside', 'theme-doc-sidebar-container');
    const sidebarLink = linkTo(sidebar ?? '', doc.permalink);
    assert.ok(sidebarLink, `Missing sidebar link for ${source}`);
    assert.equal(textContent(parse(sidebarLink)), doc.frontMatter.sidebar_label ?? expectedLabel,
      `Sidebar links must use the filename unless sidebar_label overrides it: ${source}`);
    assert.doesNotMatch(sidebarLink, /<(?:em|strong|code|del)\b/,
      `Sidebar file labels must render as plain text: ${source}`);
  }
  for (const direction of ['previous', 'next'] as const) {
    const navigation = doc[direction];
    const destination = navigation && documentsByPermalink.get(navigation.permalink);
    if (!navigation || !destination) continue;
    const destinationFilename = path.posix.basename(destination.source);
    if (/^README\.mdx?$/i.test(destinationFilename)) continue;
    const expectedLabel = destination.frontMatter.pagination_label
      ?? destination.frontMatter.sidebar_label ?? destinationFilename.replace(/\.mdx?$/i, '');
    assert.equal(navigation.title, expectedLabel,
      `The ${direction} metadata must use the destination filename or custom label: ${source}`);
    const paginator = elementWithClass(html, 'nav', 'pagination-nav');
    const paginatorLink = linkTo(paginator ?? '', navigation.permalink);
    const label = elementWithClass(paginatorLink ?? '', 'div', 'pagination-nav__label');
    assert.ok(label, `Missing ${direction} label in ${source}`);
    assert.equal(textContent(parse(label)), expectedLabel,
      `The ${direction} link must use the destination filename or custom label: ${source}`);
    assert.doesNotMatch(label, /<(?:em|strong|code|del)\b/,
      `The ${direction} file label must render as plain text: ${source}`);
  }
  const faviconLinks = [...html.matchAll(/<link\b[^>]*\brel="icon"[^>]*>/g)].map(([tag]) => tag);
  assert.equal(faviconLinks.length, 1, `Expected one favicon in ${doc.permalink}`);
  assert.ok(faviconLinks[0].includes(`href="${baseUrl}img/logo.svg"`),
    `The initial favicon must use the light logo in ${doc.permalink}`);
  assert.ok(!/class="[^"]*(?:DocSearch|navbar__search-input)/.test(html), 'Search must remain disabled.');
  assertInternalTargets(html, doc.permalink);
}

for (const index of generatedIndexes) {
  assert.ok(index.path.startsWith(`${baseUrl}category/`), 'Generated indexes must use the default category URLs.');
  const htmlPath = builtFile(index.path);
  assert.ok(existsSync(htmlPath), `Missing generated index: ${index.path}`);
  const html = readBuiltHtml(htmlPath);
  const heading = html.match(/<h1\b[^>]*>[\s\S]*?<\/h1>/)?.[0];
  assert.ok(heading, `Missing generated index heading: ${index.path}`);
  const breadcrumbs = elementWithClass(html, 'nav', 'theme-doc-breadcrumbs');
  assert.ok(breadcrumbs, `Missing generated index breadcrumbs: ${index.path}`);
  const activeBreadcrumb = elementWithClass(breadcrumbs, 'li', 'breadcrumbs__item--active');
  assert.ok(activeBreadcrumb, `Missing active category breadcrumb: ${index.path}`);
  const label = textContent(parse(activeBreadcrumb));
  assert.equal(textContent(parse(heading)), label, 'Generated index headings must use the folder label.');
  const structuredData = breadcrumbStructuredData(html)?.itemListElement?.at(-1);
  assert.equal(structuredData?.name, label, 'Generated index breadcrumb labels must match their structured data.');
  assert.equal(structuredData?.item, origin + index.path, 'Generated index structured data must use the category URL.');
  assert.ok(documentBreadcrumbs.some(nav => linkTo(nav, index.path)),
    `Document breadcrumbs must link to the generated index: ${index.path}`);
  const sidebar = elementWithClass(html, 'aside', 'theme-doc-sidebar-container');
  assert.ok(sidebar && linkTo(sidebar, index.path), `The sidebar must link to the generated index: ${index.path}`);
  const cards = [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
    .filter(match => match[1].match(/\bclass="([^"]*)"/)?.[1].split(/\s+/).includes('card'));
  assert.ok(cards.length, `The generated index must list its children as cards: ${index.path}`);
  assert.ok(elementWithClass(html, 'nav', 'pagination-nav'), `Missing generated index pagination: ${index.path}`);
  assertInternalTargets(html, index.path);
}

function assertInternalTargets(html: string, permalink: string) {
  for (const match of html.matchAll(/(?:href|src)="([^"<>]+)"/g)) {
    const href = match[1].replaceAll('&amp;', '&');
    if (!href.startsWith(baseUrl) && !href.startsWith(origin + baseUrl)) continue;
    const url = new URL(href, origin);
    assert.ok(!/\.mdx?$/.test(url.pathname), `Unconverted Markdown link: ${href}`);
    assert.ok(existsSync(builtFile(url.href)), `Missing page or asset: ${href} in ${permalink}`);
  }
}

const homeHtml = readBuiltHtml(path.join(buildDir, 'index.html'));
assert.ok(!homeHtml.includes(':notebook:'), 'GitHub emoji shortcodes should be rendered.');
const homeBreadcrumb = elementWithClass(homeHtml, 'li', 'breadcrumbs__item--active');
assert.ok(homeBreadcrumb, 'The homepage must have an active breadcrumb.');
assert.equal(textContent(parse(homeBreadcrumb)), 'Home', 'The root README breadcrumb must remain Home.');

function textContent(node: DefaultTreeAdapterMap['node']): string {
  if ('value' in node) return node.value;
  return 'childNodes' in node ? node.childNodes.map(textContent).join('') : '';
}

function breadcrumbStructuredData(html: string) {
  return [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)]
    .filter(match => /\btype="application\/ld\+json"/.test(match[1]))
    .map(match => JSON.parse(match[2]) as {'@type'?: string; itemListElement?: {name?: string; item?: string}[]})
    .find(data => data['@type'] === 'BreadcrumbList');
}

function elementWithClass(html: string, tag: string, className: string) {
  return [...html.matchAll(new RegExp(`<${tag}\\b([^>]*)>([\\s\\S]*?)</${tag}>`, 'g'))]
    .find(match => match[1].match(/\bclass="([^"]*)"/)?.[1].split(/\s+/).includes(className))?.[0];
}

function linkTo(html: string, permalink: string) {
  return [...html.matchAll(/<a\b([^>]*)>([\s\S]*?)<\/a>/g)]
    .find(match => match[1].match(/\bhref="([^"]*)"/)?.[1].replaceAll('&amp;', '&').replace(/\/$/, '')
      === permalink.replace(/\/$/, ''))?.[0];
}

const ansibleSource = 'pluralsight/ansible/Getting Started with Ansible.md';
const ansible = documents.find((doc, index) => sourceFiles[index] === ansibleSource);
assert.ok(ansible, 'The Ansible document must be published.');
const ansibleUrl = `${baseUrl}pluralsight/ansible/getting-started-with-ansible/`;
assert.equal(ansible?.permalink.replace(/\/?$/, '/'), ansibleUrl,
  'The Ansible filename must produce a lowercase, hyphenated URL.');
assert.ok(!existsSync(builtFile(`${baseUrl}pluralsight/ansible/Getting%20Started%20with%20Ansible/`)),
  'The old Ansible URL must not produce a page or redirect.');
const ansibleHtml = readBuiltHtml(builtFile(ansibleUrl));
assert.equal(ansible.title, 'Getting Started with Ansible', 'Normalization must preserve the document title.');
assert.ok(ansibleHtml.includes(`rel="canonical" href="${origin}${ansibleUrl}"`),
  'The Ansible canonical URL must use the normalized filename and trailing slash.');
assert.ok(ansibleHtml.includes('id="installation-and-environment"')
  && linkTo(ansibleHtml, '#installation-and-environment'), 'Existing heading anchors must remain usable.');
const ansibleReadme = documents.find((doc, index) => sourceFiles[index] === 'pluralsight/ansible/README.md');
assert.ok(ansibleReadme, 'The Ansible README must be published.');
assert.equal(ansibleReadme?.permalink, `${baseUrl}pluralsight/ansible/`,
  'Nested README routes must remain at their existing directory URLs.');
const ansibleReadmeHtml = readBuiltHtml(builtFile(ansibleReadme.permalink));
const ansibleReadmeArticle = ansibleReadmeHtml.match(/<article\b[^>]*>[\s\S]*?<\/article>/)?.[0] ?? '';
assert.ok(linkTo(ansibleReadmeArticle, ansibleUrl),
  'The existing encoded Markdown source link must resolve to the normalized Ansible URL.');
assert.ok(linkTo(elementWithClass(ansibleHtml, 'aside', 'theme-doc-sidebar-container') ?? '', ansibleUrl),
  'Sidebar document links must use the normalized Ansible URL.');
assert.ok(linkTo(elementWithClass(ansibleReadmeHtml, 'nav', 'pagination-nav') ?? '', ansibleUrl),
  'Paginator links must use the normalized Ansible URL.');

const punctuationSource = 'IBM/IBM-DSE/Python for Data Science, AI & Development.md';
const punctuationDoc = documents.find((doc, index) => sourceFiles[index] === punctuationSource);
assert.equal(punctuationDoc?.permalink.replace(/\/?$/, '/'),
  `${baseUrl}IBM/IBM-DSE/python-for-data-science,-ai-&-development/`,
  'Normalization must retain uppercase folder paths and filename punctuation.');

const mbseSource = 'codecademy/ASEPSE/system-architect/Model-based Systems Engineering (MBSE).md';
const mbse = documents.find((doc, index) => sourceFiles[index] === mbseSource);
assert.ok(mbse, 'The MBSE document must be published.');
const mbseUrl = `${baseUrl}codecademy/ASEPSE/system-architect/model-based-systems-engineering-mbse/`;
assert.equal(mbse.permalink.replace(/\/?$/, '/'), mbseUrl,
  'Parentheses must be omitted from generated filename URLs for literal route matching.');
const mbseHtml = readBuiltHtml(builtFile(mbseUrl));
assert.ok(mbseHtml.includes('<h1>Modern Systems Engineering: Model-based Systems Engineering (MBSE)</h1>'),
  'The parenthesized filename URL must render the MBSE article rather than Page Not Found.');
const systemsEngineeringReadme = documents.find((doc, index) => sourceFiles[index] === 'codecademy/ASEPSE/README.md');
assert.ok(systemsEngineeringReadme);
const systemsEngineeringHtml = readBuiltHtml(builtFile(systemsEngineeringReadme.permalink));
const systemsEngineeringArticle = systemsEngineeringHtml.match(/<article\b[^>]*>[\s\S]*?<\/article>/)?.[0] ?? '';
assert.ok(linkTo(systemsEngineeringArticle, mbseUrl),
  'The existing Markdown source link must resolve to the working MBSE URL.');
assert.ok(linkTo(elementWithClass(mbseHtml, 'aside', 'theme-doc-sidebar-container') ?? '', mbseUrl),
  'Sidebar links must use the working MBSE URL.');

const formattedProject = documents.find((doc, index) => sourceFiles[index]
  === 'IBM/IBM-CySA/projects/Cybersecurity Architecture Final Project.md');
assert.ok(formattedProject, 'The formatted cybersecurity architecture project must be published.');
const projectHtml = readBuiltHtml(builtFile(formattedProject.permalink));
const plainProjectTitle = 'Cybersecurity Architecture Final Project';
const richProjectTitle = '<em>Cybersecurity Architecture</em> Final Project';
assert.equal(formattedProject.title, plainProjectTitle, 'Inherited metadata titles should contain plain text.');
assert.ok(projectHtml.includes(`<h1>${richProjectTitle}</h1>`), 'The article H1 must preserve its original formatting.');
const sidebarHtml = elementWithClass(projectHtml, 'aside', 'theme-doc-sidebar-container');
assert.ok(sidebarHtml, 'The project should have a document sidebar.');
assert.equal(textContent(parse(linkTo(sidebarHtml, formattedProject.permalink) ?? '')), plainProjectTitle,
  'The project sidebar label must use the plain filename.');
const breadcrumbHtml = elementWithClass(projectHtml, 'nav', 'theme-doc-breadcrumbs');
assert.ok(breadcrumbHtml?.includes(`>${plainProjectTitle}</span>`),
  'The active breadcrumb must render the filename as plain text.');

for (const [direction, modifier, subLabel] of [['previous', 'prev', 'Previous'], ['next', 'next', 'Next']] as const) {
  const referringDocument: DocMetadata | undefined = documents.find(doc => doc[direction]?.permalink === formattedProject.permalink);
  assert.ok(referringDocument, `The formatted project should be reachable from a ${direction} paginator link.`);
  const navigation = referringDocument[direction];
  assert.ok(navigation);
  assert.equal(navigation.title, plainProjectTitle,
    `The ${direction} paginator metadata must retain the plain destination title.`);
  const referringHtml = readBuiltHtml(builtFile(referringDocument.permalink));
  const paginatorHtml = elementWithClass(referringHtml, 'nav', 'pagination-nav');
  const paginatorLink = linkTo(paginatorHtml ?? '', formattedProject.permalink);
  assert.ok(paginatorLink);
  const paginatorLabel = elementWithClass(paginatorLink, 'div', 'pagination-nav__label');
  assert.ok(paginatorLabel);
  assert.equal(textContent(parse(paginatorLabel)), plainProjectTitle,
    `The ${direction} paginator must use the filename as plain text.`);
  assert.doesNotMatch(paginatorLabel, /<(?:em|strong|code|del)\b/,
    `The ${direction} paginator must not inherit H1 formatting.`);
  assert.ok(elementWithClass(paginatorLink, 'a', `pagination-nav__link--${modifier}`),
    `The ${direction} paginator must retain its native direction class.`);
  assert.ok(elementWithClass(paginatorLink, 'div', 'pagination-nav__sublabel')?.includes(`>${subLabel}<`),
    `The ${direction} paginator must retain its native sublabel.`);
}

const browserTitle = projectHtml.match(/<title\b[^>]*>([^<]*)<\/title>/)?.[1];
assert.ok(browserTitle?.startsWith(`${plainProjectTitle} | `), 'Browser titles should use the plain inherited title.');
const openGraphTitle = [...projectHtml.matchAll(/<meta\b[^>]*>/g)]
  .find(match => /\bproperty="og:title"/.test(match[0]))?.[0].match(/\bcontent="([^"]*)"/)?.[1];
assert.equal(openGraphTitle, browserTitle, 'Social metadata should use the same plain title as the browser.');
assert.equal(breadcrumbStructuredData(projectHtml)?.itemListElement?.at(-1)?.name, plainProjectTitle,
  'Breadcrumb structured data should contain the plain filename label.');

for (const [permalink, labels] of [
  [`${baseUrl}TS-PORP/deep-dive/`, ['TS-PORP', 'deep-dive']],
  [`${baseUrl}red-hat/RHCSC/`, ['red-hat', 'RHCSC']],
] as const) {
  const html = readBuiltHtml(builtFile(permalink));
  const breadcrumbs = elementWithClass(html, 'nav', 'theme-doc-breadcrumbs');
  assert.ok(breadcrumbs, `Missing breadcrumbs in ${permalink}`);
  for (const label of labels) {
    assert.ok(breadcrumbs.includes(`>${label}<`), `Folder labels must remain literal: ${label}`);
  }
}

const capstone = documents.find((doc, index) => sourceFiles[index] === 'IBM/IBM-BA/capstone/README.md');
assert.ok(capstone, 'The business analysis capstone must be published.');
const capstoneHtml = readBuiltHtml(builtFile(capstone.permalink));
const spreadsheetUrl = 'https://github.com/lib-port/tech-lib/raw/main/'
  + 'IBM/IBM-BA/capstone/Capstone_Project_M04L01_Data_Analysis.xlsx';
assert.ok(linkTo(capstoneHtml, spreadsheetUrl),
  'The capstone spreadsheet must link directly to its raw workbook on main.');
assert.ok(!walk(buildDir).some(file => /\.xlsx$/i.test(file)),
  'Linked spreadsheets must not be bundled into the site.');

for (const filename of ['package-lock.json', 'npm-shrinkwrap.json', 'pnpm-lock.yaml']) {
  assert.ok(!existsSync(path.join(siteDir, filename)), `Project lockfiles are disabled: ${filename}`);
}
assert.ok(!walk(buildDir).some(file => /search[-_]index/i.test(path.basename(file))), 'No search index should be generated.');
console.log(`Verified ${documents.length} documents and ${generatedIndexes.length} generated folder indexes, unique routes, default category navigation and cards, normalized filename URLs, preserved IDs, filename sidebar, breadcrumb, and paginator labels, plain metadata, literal folder labels, homepage, internal targets, assets, raw spreadsheet download link without bundling, and disabled search/lockfiles.`);
