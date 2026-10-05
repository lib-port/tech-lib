import {execFileSync} from 'node:child_process';
import {existsSync, readFileSync} from 'node:fs';
import path from 'node:path';
import {unified} from 'unified';
import remarkParse from 'remark-parse';
import {visit} from 'unist-util-visit';
import type {SidebarItem} from './title-types.ts';

type CourseOrders = ReadonlyMap<string, string[]>;
type SourceDocument = {id: string; file: string};

const excludedDirectories = new Set([
  'docusaurus', 'node_modules', 'vendor', 'venv', 'env', 'build', 'dist', 'coverage',
]);
const collator = new Intl.Collator('en', {numeric: true, sensitivity: 'base'});
const parser = unified().use(remarkParse);

export function isDocument(file: string) {
  const parts = file.split('/');
  return /\.(md|mdx)$/i.test(file)
    && !parts.some(part => part.startsWith('.') || excludedDirectories.has(part))
    && !['AGENTS.md', 'SKILL.md'].includes(parts.at(-1) ?? '');
}

export function discoverDocuments(repositoryRoot: string) {
  const files = execFileSync('git', [
    'ls-files', '--cached', '--others', '--exclude-standard', '-z',
  ], {cwd: repositoryRoot, encoding: 'utf8', maxBuffer: 16 * 1024 * 1024});
  return [...new Set(files.split('\0'))]
    .filter(file => isDocument(file) && existsSync(path.join(repositoryRoot, file)))
    .sort(collator.compare);
}

export function escapeGlob(file: string) {
  return file.replace(/[\\*?{}()[\]!+@]/g, '\\$&');
}

export function localMarkdownLinks(markdown: string, sourceFile: string) {
  const tree = parser.parse(markdown);
  const definitions = new Map<string, string>();
  visit(tree, 'definition', node => { definitions.set(node.identifier, node.url); });
  const links: string[] = [];
  visit(tree, node => {
    const url = node.type === 'link' ? node.url
      : node.type === 'linkReference' ? definitions.get(node.identifier) : null;
    if (!url || /^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(url)) return;
    const target = decodeURIComponent(url.split(/[?#]/, 1)[0]);
    if (!/\.(md|mdx)$/i.test(target)) return;
    const resolved = path.posix.normalize(path.posix.join(path.posix.dirname(sourceFile), target));
    if (!resolved.startsWith('../')) links.push(resolved);
  });
  return [...new Set(links)];
}

export function readCourseOrders(repositoryRoot: string, files: readonly string[]) {
  const orders = new Map<string, string[]>();
  for (const file of files) {
    if (/\/README\.(md|mdx)$/i.test(file)) {
      orders.set(path.posix.dirname(file), localMarkdownLinks(
        readFileSync(path.join(repositoryRoot, file), 'utf8'), file,
      ));
    }
  }
  return orders;
}

export function orderForDirectory(directory: string, orders: CourseOrders): string[] {
  let current = directory;
  while (current !== '.') {
    const order = orders.get(current);
    if (order) return order;
    current = path.posix.dirname(current);
  }
  return [];
}

// Physical file paths determine categories; Docusaurus metadata supplies IDs and titles.
export function createSidebar(documents: readonly SourceDocument[], orders: CourseOrders): SidebarItem[] {
  function itemsFor(directory: string): SidebarItem[] {
    const direct: {file: string; item: SidebarItem}[] = [];
    const directories = new Set<string>();
    const prefix = directory === '.' ? '' : `${directory}/`;
    for (const doc of documents) {
      if (!doc.file.startsWith(prefix)) continue;
      const rest = doc.file.slice(prefix.length);
      if (rest.includes('/')) directories.add(prefix + rest.split('/')[0]);
      else if (directory === '.' || !/^README\.(md|mdx)$/i.test(rest)) {
        direct.push({file: doc.file, item: {type: 'doc', id: doc.id}});
      }
    }
    for (const child of directories) {
      const index = documents.find(doc => /^README\.(md|mdx)$/i.test(path.posix.basename(doc.file))
        && path.posix.dirname(doc.file) === child);
      const items = itemsFor(child);
      const label = path.posix.basename(child);
      const item: SidebarItem = items.length ? {
        type: 'category', label, collapsed: true, items,
        ...(index ? {link: {type: 'doc', id: index.id}} : {}),
      } : {type: 'doc', id: index!.id, label};
      direct.push({file: child, item});
    }
    const order = orderForDirectory(directory, orders);
    const rank = (file: string) => {
      if (file === 'README.md') return -1;
      const index = order.findIndex(target => target === file || target.startsWith(`${file}/`));
      return index === -1 ? Infinity : index;
    };
    return direct.sort((a, b) => rank(a.file) - rank(b.file)
      || collator.compare(a.file, b.file)).map(entry => entry.item);
  }
  return itemsFor('.');
}

export function documentFrontMatter(filePath: string, repositoryRoot: string, frontMatter: Record<string, unknown>) {
  const source = path.relative(repositoryRoot, path.resolve(filePath));
  if (source === 'README.md') {
    return {...frontMatter, slug: '/', sidebar_label: 'Home'};
  }
  if (frontMatter.slug !== undefined) return frontMatter;

  const {name, dir} = path.parse(source);
  // Leave Docusaurus category indexes at their existing directory URLs.
  if (['readme', 'index', path.basename(dir).toLowerCase()].includes(name.toLowerCase())) {
    return frontMatter;
  }
  // A relative slug changes only the filename segment, preserving directory paths and IDs.
  return {...frontMatter, slug: name.trim().toLowerCase().replace(/\s+/g, '-')};
}
