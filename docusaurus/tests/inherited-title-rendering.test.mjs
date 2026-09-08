import assert from 'node:assert/strict';
import {createElement, Fragment} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import test from 'node:test';
import {inheritTitle} from '../lib/inherited-titles.mjs';
import {renderInheritedTitle} from '../src/components/InheritedTitle/render.mjs';

function render(title, label) {
  return renderToStaticMarkup(createElement(Fragment, null, renderInheritedTitle(title, label)));
}

test('inherited navigation preserves inline styling inside a single article link', () => {
  const {title, _inheritedTitle} = inheritTitle(
    '# [*Useful **tools***](https://example.com) and `a < b` ~~notes~~ ![diagram](diagram.png)', {},
  );
  assert.equal(title, 'Useful tools and a < b notes diagram');
  const label = render(_inheritedTitle, title);
  assert.equal(label, '<em>Useful <strong>tools</strong></em> and <code>a &lt; b</code> <del>notes</del> diagram');
  const html = renderToStaticMarkup(createElement('a', {href: '/tech-lib/article/'},
    renderInheritedTitle(_inheritedTitle, title)));
  assert.equal((html.match(/<a\b/g) ?? []).length, 1);
  assert.ok(!/<img\b/.test(html));
});

test('explicit or folder labels retain their original text', () => {
  const {_inheritedTitle} = inheritTitle('# *A course*', {});
  assert.equal(render(_inheritedTitle, 'course-notes'), 'course-notes');
  assert.equal(render(undefined, '*Explicit label*'), '*Explicit label*');
});

test('title text is escaped and unsupported elements cannot inject HTML', () => {
  const inherited = {text: '<script> & text', nodes: [
    {type: 'text', value: '<script> & text'},
    {type: 'script', children: [{type: 'text', value: 'alert(1)'}]},
  ]};
  assert.equal(render(inherited, inherited.text), '&lt;script&gt; &amp; text');
});
