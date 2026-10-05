import type {DocFrontMatter, DocMetadata, LoadedVersion, PluginOptions} from '@docusaurus/plugin-content-docs';

export type SidebarItem = Awaited<ReturnType<PluginOptions['sidebarItemsGenerator']>>[number];

export type InlineElement = 'em' | 'strong' | 'code' | 'del';
export type InlineTitleNode =
  | {type: 'text'; value: string}
  | {type: InlineElement; children: InlineTitleNode[]};

export type InheritedTitle = {text: string; nodes: InlineTitleNode[]};
export type TitleFrontMatter = Record<string, unknown> & {
  title?: string;
  _inheritedTitle?: InheritedTitle;
};

export type InheritedTitleData = {
  sidebar: Record<string, InheritedTitle>;
  pagination: Record<string, {previous?: InheritedTitle; next?: InheritedTitle}>;
};

// Only the metadata consumed by title inheritance; tests need no synthetic build fields.
export type TitleDocument = Pick<DocMetadata, 'id' | 'permalink' | 'title' | 'sidebar' | 'previous' | 'next'> & {
  frontMatter: DocFrontMatter & {_inheritedTitle?: InheritedTitle};
};
export type TitleVersion = {
  docs: TitleDocument[];
  sidebars: Record<string, SidebarItem[]>;
};

export type DocsContent = {loadedVersions: LoadedVersion[]};
