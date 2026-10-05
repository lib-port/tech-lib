import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';
import type {Heading, PhrasingContent} from 'mdast';
import type {
  InlineTitleNode, InheritedTitleData, SidebarItem, TitleFrontMatter, TitleVersion,
} from './title-types.ts';

const parser = unified().use(remarkParse).use(remarkGfm).use(remarkEmoji);
const inlineTypes = {emphasis: 'em', strong: 'strong', delete: 'del'} as const;

function stripHeadingId(heading: Heading) {
  const last = heading.children.at(-1);
  if (last?.type === 'html' && /^<!--\s*#\S+[\s\S]*-->$/.test(last.value)) {
    heading.children.pop();
  } else if (last?.type === 'text') {
    last.value = last.value.replace(/\s*(?:\{#[\w-]+\}|\{\/\*\s*#[^\s*]+[\s\S]*?\*\/\})\s*$/, '');
  }
}

function normalizeInline(children: readonly PhrasingContent[]): InlineTitleNode[] {
  const nodes: InlineTitleNode[] = [];
  function append(node: InlineTitleNode) {
    if (node.type === 'text') {
      if (!node.value) return;
      const last = nodes.at(-1);
      if (last?.type === 'text') {
        last.value += node.value;
        return;
      }
    }
    nodes.push(node);
  }
  for (const child of children) {
    if (child.type === 'emphasis' || child.type === 'strong' || child.type === 'delete') {
      append({type: inlineTypes[child.type], children: normalizeInline(child.children)});
    } else if (child.type === 'inlineCode') {
      append({type: 'code', children: [{type: 'text', value: child.value}]});
    } else if (child.type === 'image' || child.type === 'imageReference') {
      append({type: 'text', value: child.alt ?? ''});
    } else if ('children' in child) {
      // Navigation already supplies the link; retain only its inline contents.
      for (const node of normalizeInline(child.children)) append(node);
    } else {
      // Raw HTML/JSX stays inert text. The renderer never receives HTML or code.
      append({type: 'text', value: child.type === 'break' ? ' ' : ('value' in child ? child.value : '').replace(/\r?\n/g, ' ')});
    }
  }
  return nodes;
}

function textContent(nodes: readonly InlineTitleNode[]): string {
  return nodes.map(node => node.type === 'text' ? node.value : textContent(node.children)).join('');
}

export function inheritTitle(content: string, frontMatter: TitleFrontMatter): TitleFrontMatter {
  if (frontMatter.title != null) return frontMatter;

  // Match Docusaurus's handling of an MDX import prologue without evaluating it.
  const markdown = content.trim().replace(/^(?:import\s(?:.|\r?\n(?!\r?\n))*(?:\r?\n){2,})*/, '').trim();
  const tree = parser.parse(markdown);
  const heading = tree.children[0];
  if (heading?.type !== 'heading' || heading.depth !== 1) return frontMatter;

  stripHeadingId(heading);
  parser.runSync(tree);
  const nodes = normalizeInline(heading.children);
  const first = nodes[0];
  const last = nodes.at(-1);
  if (first?.type === 'text') first.value = first.value.trimStart();
  if (last?.type === 'text') last.value = last.value.trimEnd();
  const text = textContent(nodes).trim();
  if (!text) return frontMatter;
  return {...frontMatter, title: text, _inheritedTitle: {text, nodes: nodes.filter(node => node.type !== 'text' || node.value)}};
}

function hasLabel(value: unknown) {
  return value !== undefined && value !== null;
}

type SidebarDocument = {id: string; type?: 'doc' | 'ref'; category?: boolean; label?: string};

function sidebarDocuments(items: readonly SidebarItem[]): SidebarDocument[] {
  return items.flatMap(item => item.type === 'category'
    ? [
      ...(item.link?.type === 'doc' ? [{id: item.link.id, category: true}] : []),
      ...sidebarDocuments(item.items),
    ]
    : item.type === 'doc' || item.type === 'ref' ? [item] : []);
}

export function createInheritedTitleData(loadedVersions: readonly TitleVersion[]): InheritedTitleData {
  const sidebar: InheritedTitleData['sidebar'] = {};
  const pagination: InheritedTitleData['pagination'] = {};
  for (const version of loadedVersions) {
    const docsById = new Map(version.docs.map(doc => [doc.id, doc]));
    const titles = new Map(version.docs
      .flatMap(doc => {
        const title = doc.frontMatter._inheritedTitle;
        return title?.nodes.some(node => node.type !== 'text') ? [[doc.permalink, {...doc, inheritedTitle: title}] as const] : [];
      }));
    const sidebarItems = Object.fromEntries(Object.entries(version.sidebars)
      .map(([name, items]) => [name, sidebarDocuments(items)]));
    for (const items of Object.values(sidebarItems)) {
      for (const item of items) {
        if (item.category || hasLabel(item.label)) continue;
        const doc = docsById.get(item.id);
        if (doc && titles.has(doc.permalink) && !hasLabel(doc.frontMatter.sidebar_label)) {
          sidebar[doc.permalink] = titles.get(doc.permalink)!.inheritedTitle;
        }
      }
    }
    for (const source of version.docs) {
      for (const [direction, override] of [['previous', 'pagination_prev'], ['next', 'pagination_next']] as const) {
        const link = source[direction];
        const target = link && titles.get(link.permalink);
        if (!link || !target || hasLabel(target.frontMatter.sidebar_label) || hasLabel(target.frontMatter.pagination_label)) continue;
        if (source.frontMatter[override] === undefined) {
          const item = source.sidebar === undefined ? undefined : sidebarItems[source.sidebar]?.find(candidate => candidate.id === target.id && candidate.type !== 'ref');
          if (!item || (!item.category && hasLabel(item.label))) continue;
        }
        // A different final label (for example, a translation) must stay intact.
        if (link.title !== target.inheritedTitle.text) continue;
        (pagination[source.permalink] ??= {})[direction] = target.inheritedTitle;
      }
    }
  }
  return {sidebar, pagination};
}
