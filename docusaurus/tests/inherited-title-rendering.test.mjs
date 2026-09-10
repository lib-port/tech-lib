import assert from 'node:assert/strict';
import {createElement, Fragment} from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import test from 'node:test';
import {inheritTitle} from '../lib/inherited-titles.mjs';
import {getInheritedPaginationTitle} from '../src/components/InheritedTitle/pagination.mjs';
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

test('pagination selects each direction using full source paths despite case and trailing slash differences', () => {
  const previous = inheritTitle('# *Earlier* topic', {})._inheritedTitle;
  const next = inheritTitle('# **Later** topic', {})._inheritedTitle;
  const pagination = {
    '/tech-lib/IBM/Course': {previous, next},
    '/tech-lib/directory/': {next},
    '/': {next: previous},
    '/other-library/': {previous: next},
    '/other-library/IBM/Course/': {next: previous},
  };
  for (const pathname of ['/tech-lib/IBM/Course', '/tech-lib/IBM/Course/', '/TECH-LIB/ibm/course/']) {
    assert.equal(getInheritedPaginationTitle(pagination, pathname), previous);
    assert.equal(getInheritedPaginationTitle(pagination, pathname, false), previous);
    assert.equal(getInheritedPaginationTitle(pagination, pathname, true), next);
  }
  assert.equal(getInheritedPaginationTitle(pagination, '/tech-lib/directory', true), next);
  assert.equal(getInheritedPaginationTitle(pagination, '/', true), previous);
  assert.equal(getInheritedPaginationTitle(pagination, '/other-library', false), next);
  assert.equal(getInheritedPaginationTitle(pagination, '/other-library/IBM/Course', true), previous);
  for (const pathname of ['/IBM/Course/', '/tech-lib/IBM/', '/tech-lib/IBM/Course/child/', '/tech-lib/IBM/Course-extra/']) {
    assert.equal(getInheritedPaginationTitle(pagination, pathname, true), undefined,
      `A different complete source path must not inherit the course's title: ${pathname}`);
  }
  assert.equal(render(getInheritedPaginationTitle(pagination, '/tech-lib/ibm/course/', false), previous.text),
    '<em>Earlier</em> topic');
  assert.equal(render(getInheritedPaginationTitle(pagination, '/tech-lib/ibm/course/', true), next.text),
    '<strong>Later</strong> topic');
});

test('missing pagination entries and explicit labels pass through string and React titles', () => {
  const inherited = inheritTitle('# *A course*', {})._inheritedTitle;
  const pagination = {'/tech-lib/source/': {next: inherited}};
  const reactLabel = createElement('span', {lang: 'fr'}, 'Un cours');
  for (const [pathname, isNext] of [
    ['/tech-lib/source/', false],
    ['/tech-lib/generated-index/', true],
    ['/about/', true],
  ]) {
    const title = getInheritedPaginationTitle(pagination, pathname, isNext);
    assert.equal(title, undefined);
    for (const label of [inherited.text, reactLabel, undefined, null]) {
      assert.equal(renderInheritedTitle(title, label), label);
    }
  }
  assert.equal(getInheritedPaginationTitle({}, '/tech-lib/source/', true), undefined);
  const title = getInheritedPaginationTitle(pagination, '/tech-lib/source/', true);
  assert.equal(renderInheritedTitle(title, 'Explicit caption'), 'Explicit caption');
  assert.equal(renderInheritedTitle(title, reactLabel), reactLabel);
});
