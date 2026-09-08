import assert from 'node:assert/strict';
import test from 'node:test';
import {createInheritedTitleData, inheritTitle} from '../lib/inherited-titles.mjs';
import inheritedTitlesPlugin from '../plugins/inherited-titles.mjs';

const text = value => ({type: 'text', value});
const inline = (type, ...children) => ({type, children});

test('inherits nested inline formatting and plain metadata from an ATX H1', () => {
  const frontMatter = {description: 'Keep this', sidebar_custom_props: {color: 'blue'}};
  const content = '# **Use *the* `tool`** and ~~old~~ commands {#commands}\n\nBody stays unchanged.';
  const result = inheritTitle(content, frontMatter);
  assert.equal(result.title, 'Use the tool and old commands');
  assert.deepEqual(result._inheritedTitle, {
    text: result.title,
    nodes: [
      inline('strong', text('Use '), inline('em', text('the')), text(' '), inline('code', text('tool'))),
      text(' and '), inline('del', text('old')), text(' commands'),
    ],
  });
  assert.equal(result.description, frontMatter.description);
  assert.equal(result.sidebar_custom_props, frontMatter.sidebar_custom_props);
  assert.deepEqual(frontMatter, {description: 'Keep this', sidebar_custom_props: {color: 'blue'}});
  assert.equal(content, '# **Use *the* `tool`** and ~~old~~ commands {#commands}\n\nBody stays unchanged.');
});

test('supports Setext headings, reference links, image alt, escapes, entities, and emoji', () => {
  const result = inheritTitle('[**Tools**][tools] ![diagram](map.svg) \\*literal\\* &amp; :smile:\n===\n\n[tools]: /tools', {});
  assert.equal(result.title, 'Tools diagram *literal* & 😄');
  assert.deepEqual(result._inheritedTitle.nodes, [inline('strong', text('Tools')), text(' diagram *literal* & 😄')]);
  assert.equal(inheritTitle('# `:smile: &amp;`', {}).title, ':smile: &amp;');
  assert.equal(inheritTitle('# ``a ` b`` ###', {}).title, 'a ` b');
});

test('strips supported heading IDs while leaving code and unsupported HTML/JSX inert', () => {
  for (const suffix of ['{#custom-id}', '<!-- #custom-id -->', '{/* #custom-id */}']) {
    assert.equal(inheritTitle(`# **Title** ${suffix}`, {}).title, 'Title');
  }
  assert.equal(inheritTitle('# `literal {#id}`', {}).title, 'literal {#id}');
  assert.deepEqual(inheritTitle('# <Widget /> {sideEffect()} **safe**', {})._inheritedTitle.nodes,
    [text('<Widget /> {sideEffect()} '), inline('strong', text('safe'))]);
});

test('preserves explicit titles and only infers a leading H1', () => {
  for (const title of ['Manual *title*', '']) {
    const frontMatter = {title, sidebar_label: 'Navigation'};
    assert.equal(inheritTitle('# **Inferred**', frontMatter), frontMatter);
  }
  for (const content of ['## Subtitle\n\n# Later', 'Intro\n\n# Later', '```md\n# Example\n```', '#', '---\n\n# Later']) {
    const frontMatter = {description: 'Unchanged'};
    assert.equal(inheritTitle(content, frontMatter), frontMatter);
  }
  assert.equal(inheritTitle('import Thing from "./thing";\n\n# **Title**', {}).title, 'Title');
});

function doc(id, frontMatter = {}, heading = `# **${id}**`) {
  const matter = inheritTitle(heading, frontMatter);
  return {id, permalink: `/tech-lib/${id}/`, title: matter.title, frontMatter: matter, sidebar: 'library'};
}

function nav(target) {
  return {title: target.frontMatter.pagination_label ?? target.frontMatter.sidebar_label ?? target.title, permalink: target.permalink};
}

test('formats inherited doc links while retaining category, README-only, and explicit labels', () => {
  const direct = doc('direct');
  const reference = doc('reference');
  const category = doc('folder-index');
  const readmeOnly = doc('literal-folder');
  const sidebarOverride = doc('sidebar-override', {sidebar_label: 'sidebar-override'});
  const paginationOverride = doc('pagination-override', {pagination_label: 'pagination-override'});
  const explicitTitle = doc('explicit-title', {title: 'explicit-title'});
  const plain = doc('plain', {}, '# Plain heading');
  const docs = [direct, reference, category, readmeOnly, sidebarOverride, paginationOverride, explicitTitle, plain];
  const data = createInheritedTitleData([{docs, sidebars: {library: [
    {type: 'doc', id: direct.id},
    {type: 'ref', id: reference.id},
    {type: 'category', label: 'folder-name', link: {type: 'doc', id: category.id}, items: []},
    {type: 'doc', id: readmeOnly.id, label: 'literal-folder'},
    ...[sidebarOverride, paginationOverride, explicitTitle, plain].map(item => ({type: 'doc', id: item.id})),
  ]}}]);
  assert.deepEqual(Object.keys(data.sidebar), [direct.permalink, reference.permalink, paginationOverride.permalink]);
  assert.deepEqual(data.pagination, {});
});

test('pagination follows native labels and explicit target precedence', () => {
  const direct = doc('direct');
  const category = doc('category-index');
  const readmeOnly = doc('literal-folder');
  const sidebarOverride = doc('sidebar-override', {sidebar_label: 'sidebar-override'});
  const paginationOverride = doc('pagination-override', {pagination_label: 'pagination-override'});
  const explicitTitle = doc('explicit-title', {title: 'explicit-title'});
  const targets = [direct, category, readmeOnly, sidebarOverride, paginationOverride, explicitTitle];
  const sources = targets.map(target => ({...doc(`source-${target.id}`), next: nav(target)}));
  const explicit = {...doc('explicit-target', {pagination_prev: readmeOnly.id}), previous: nav(readmeOnly)};
  const translated = {...doc('translated'), next: {...nav(direct), title: 'Translated caption'}};
  const data = createInheritedTitleData([{docs: [...targets, ...sources, explicit, translated], sidebars: {library: [
    {type: 'doc', id: direct.id},
    {type: 'category', label: 'category-name', link: {type: 'doc', id: category.id}, items: []},
    {type: 'doc', id: readmeOnly.id, label: 'literal-folder'},
    ...[sidebarOverride, paginationOverride, explicitTitle, ...sources, explicit, translated].map(item => ({type: 'doc', id: item.id})),
  ]}}]);
  assert.deepEqual(data.pagination, {
    [sources[0].permalink]: {next: direct.frontMatter._inheritedTitle},
    [sources[1].permalink]: {next: category.frontMatter._inheritedTitle},
    [explicit.permalink]: {previous: readmeOnly.frontMatter._inheritedTitle},
  });
});

test('plugin consumes completed docs data and replaces its payload on reload', () => {
  const plugin = inheritedTitlesPlugin();
  const target = doc('target');
  const results = [];
  const actions = {setGlobalData: data => results.push(data)};
  plugin.allContentLoaded({actions, allContent: {'docusaurus-plugin-content-docs': {default: {loadedVersions: [{
    docs: [target], sidebars: {library: [{type: 'doc', id: target.id}]},
  }]}}}});
  plugin.allContentLoaded({actions, allContent: {}});
  assert.equal(plugin.name, 'inherited-titles');
  assert.deepEqual(results[0], {sidebar: {[target.permalink]: target.frontMatter._inheritedTitle}, pagination: {}});
  assert.deepEqual(results[1], {sidebar: {}, pagination: {}});
});
