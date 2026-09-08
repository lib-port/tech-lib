import {createElement} from 'react';

const inlineElements = new Set(['em', 'strong', 'code', 'del']);

// Navigation already supplies the link; title nodes contain inline styling only.
export function renderInlineTitle(nodes) {
  return nodes.map((node, index) => {
    if (node.type === 'text') return node.value;
    if (inlineElements.has(node.type)) {
      return createElement(node.type, {key: index}, renderInlineTitle(node.children));
    }
    return null;
  });
}

export function renderInheritedTitle(title, label) {
  return title?.text === label ? renderInlineTitle(title.nodes) : label;
}
