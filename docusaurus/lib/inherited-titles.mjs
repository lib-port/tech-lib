import {unified} from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import remarkEmoji from 'remark-emoji';

const parser = unified().use(remarkParse).use(remarkGfm).use(remarkEmoji);
const inlineTypes = {emphasis: 'em', strong: 'strong', delete: 'del'};

function stripHeadingId(heading) {
  const last = heading.children.at(-1);
  if (last?.type === 'html' && /^<!--\s*#\S+[\s\S]*-->$/.test(last.value)) {
    heading.children.pop();
  } else if (last?.type === 'text') {
    last.value = last.value.replace(/\s*(?:\{#[\w-]+\}|\{\/\*\s*#[^\s*]+[\s\S]*?\*\/\})\s*$/, '');
  }
}

function normalizeInline(children) {
  const nodes = [];
  function append(node) {
    if (node.type === 'text') {
      if (!node.value) return;
      if (nodes.at(-1)?.type === 'text') {
        nodes.at(-1).value += node.value;
        return;
      }
    }
    nodes.push(node);
  }
  for (const child of children) {
    if (inlineTypes[child.type]) {
      append({type: inlineTypes[child.type], children: normalizeInline(child.children)});
    } else if (child.type === 'inlineCode') {
      append({type: 'code', children: [{type: 'text', value: child.value}]});
    } else if (child.type === 'image' || child.type === 'imageReference') {
      append({type: 'text', value: child.alt ?? ''});
    } else if (child.children) {
      // Navigation already supplies the link; retain only its inline contents.
      for (const node of normalizeInline(child.children)) append(node);
    } else {
      // Raw HTML/JSX stays inert text. The renderer never receives HTML or code.
      append({type: 'text', value: child.type === 'break' ? ' ' : (child.value ?? '').replace(/\r?\n/g, ' ')});
    }
  }
  return nodes;
}

function textContent(nodes) {
  return nodes.map(node => node.type === 'text' ? node.value : textContent(node.children)).join('');
}

export function inheritTitle(content, frontMatter) {
  if (frontMatter.title != null) return frontMatter;

  // Match Docusaurus's handling of an MDX import prologue without evaluating it.
  const markdown = content.trim().replace(/^(?:import\s(?:.|\r?\n(?!\r?\n))*(?:\r?\n){2,})*/, '').trim();
  const tree = parser.parse(markdown);
  const heading = tree.children[0];
  if (heading?.type !== 'heading' || heading.depth !== 1) return frontMatter;

  stripHeadingId(heading);
  parser.runSync(tree);
  const nodes = normalizeInline(heading.children);
  if (nodes[0]?.type === 'text') nodes[0].value = nodes[0].value.trimStart();
  if (nodes.at(-1)?.type === 'text') nodes.at(-1).value = nodes.at(-1).value.trimEnd();
  const text = textContent(nodes).trim();
  if (!text) return frontMatter;
  return {...frontMatter, title: text, _inheritedTitle: {text, nodes: nodes.filter(node => node.type !== 'text' || node.value)}};
}

function hasLabel(value) {
  return value !== undefined && value !== null;
}

function sidebarDocuments(items) {
  return items.flatMap(item => item.type === 'category'
    ? [
      ...(item.link?.type === 'doc' ? [{id: item.link.id, category: true}] : []),
      ...sidebarDocuments(item.items),
    ]
    : item.type === 'doc' || item.type === 'ref' ? [item] : []);
}

export function createInheritedTitleData(loadedVersions) {
  const sidebar = {};
  const pagination = {};
  for (const version of loadedVersions) {
    const docsById = new Map(version.docs.map(doc => [doc.id, doc]));
    const titles = new Map(version.docs
      .filter(doc => doc.frontMatter._inheritedTitle?.nodes.some(node => node.type !== 'text'))
      .map(doc => [doc.permalink, doc]));
    const sidebarItems = Object.fromEntries(Object.entries(version.sidebars)
      .map(([name, items]) => [name, sidebarDocuments(items)]));
    for (const items of Object.values(sidebarItems)) {
      for (const item of items) {
        if (item.category || hasLabel(item.label)) continue;
        const doc = docsById.get(item.id);
        if (doc && titles.has(doc.permalink) && !hasLabel(doc.frontMatter.sidebar_label)) {
          sidebar[doc.permalink] = doc.frontMatter._inheritedTitle;
        }
      }
    }
    for (const source of version.docs) {
      for (const [direction, override] of [['previous', 'pagination_prev'], ['next', 'pagination_next']]) {
        const link = source[direction];
        const target = link && titles.get(link.permalink);
        if (!target || hasLabel(target.frontMatter.sidebar_label) || hasLabel(target.frontMatter.pagination_label)) continue;
        if (source.frontMatter[override] === undefined) {
          const item = sidebarItems[source.sidebar]?.find(candidate => candidate.id === target.id && candidate.type !== 'ref');
          if (!item || (!item.category && hasLabel(item.label))) continue;
        }
        // A different final label (for example, a translation) must stay intact.
        if (link.title !== target.frontMatter._inheritedTitle.text) continue;
        (pagination[source.permalink] ??= {})[direction] = target.frontMatter._inheritedTitle;
      }
    }
  }
  return {sidebar, pagination};
}
