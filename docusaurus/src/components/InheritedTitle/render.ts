import {createElement} from 'react';
import type {ReactNode} from 'react';
import type {InlineTitleNode, InheritedTitle} from '../../../lib/title-types.ts';

const inlineElements = new Set(['em', 'strong', 'code', 'del']);

// Navigation already supplies the link; title nodes contain inline styling only.
export function renderInlineTitle(nodes: readonly InlineTitleNode[]): ReactNode[] {
  return nodes.map((node, index) => {
    if (node.type === 'text') return node.value;
    if (inlineElements.has(node.type)) {
      return createElement(node.type, {key: index}, renderInlineTitle(node.children));
    }
    return null;
  });
}

export function renderInheritedTitle(title: InheritedTitle | undefined, label: ReactNode): ReactNode {
  return title && title.text === label ? renderInlineTitle(title.nodes) : label;
}
