import {statSync} from 'node:fs';
import path from 'node:path';
import {visit} from 'unist-util-visit';

export default function remarkRepositoryFileLinks({repositoryRoot, repositoryUrl, ref = 'main'}) {
  const root = path.resolve(repositoryRoot);
  const baseUrl = `${repositoryUrl.replace(/\/$/, '')}/raw/${encodeURIComponent(ref)}/`;

  function repositoryLink(url, sourceFile) {
    // Absolute URLs, site routes, anchors, and query-only links are not file references.
    if (!url || /^(?:[a-z][a-z\d+.-]*:|\/|#|\?)/i.test(url)) return null;
    const suffixIndex = url.search(/[?#]/);
    const pathname = suffixIndex === -1 ? url : url.slice(0, suffixIndex);
    const suffix = suffixIndex === -1 ? '' : url.slice(suffixIndex);

    let relative;
    try {
      const decoded = decodeURIComponent(pathname);
      if (/\.(md|mdx)$/i.test(decoded)) return null;
      const target = path.resolve(path.dirname(sourceFile), decoded);
      relative = path.relative(root, target);
      if (relative === '..' || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
        return null;
      }
      if (!statSync(target, {throwIfNoEntry: false})?.isFile()) return null;
    } catch {
      // Leave malformed or unresolved paths to Docusaurus's normal link handling.
      return null;
    }

    return baseUrl + relative.split(path.sep).map(encodeURIComponent).join('/') + suffix;
  }

  return (tree, file) => {
    const definitions = new Map();
    visit(tree, 'definition', node => {
      if (!definitions.has(node.identifier)) definitions.set(node.identifier, node);
    });

    visit(tree, ['link', 'linkReference'], (node, index, parent) => {
      const definition = node.type === 'linkReference' ? definitions.get(node.identifier) : null;
      const url = repositoryLink(definition?.url ?? node.url, file.path);
      if (!url) return;
      if (node.type === 'link') {
        node.url = url;
      } else {
        // A definition may also supply an embedded image: only rewrite the hyperlink.
        parent.children[index] = {
          type: 'link', url, title: definition.title, children: node.children,
          position: node.position, ...(node.data ? {data: node.data} : {}),
        };
      }
    });
  };
}
