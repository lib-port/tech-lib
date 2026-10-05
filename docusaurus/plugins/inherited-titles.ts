import {createInheritedTitleData} from '../lib/inherited-titles.ts';
import type {Plugin} from '@docusaurus/types';
import type {DocsContent} from '../lib/title-types.ts';

export default function inheritedTitlesPlugin() {
  return {
    name: 'inherited-titles',
    allContentLoaded({allContent, actions}: {
      allContent: Record<string, Record<string, unknown>>;
      actions: Pick<Parameters<NonNullable<Plugin['allContentLoaded']>>[0]['actions'], 'setGlobalData'>;
    }) {
      // Docusaurus's cross-plugin content is untyped; the docs plugin owns this shape.
      const instances = Object.values(allContent['docusaurus-plugin-content-docs'] ?? {}) as DocsContent[];
      actions.setGlobalData(createInheritedTitleData(instances.flatMap(content => content.loadedVersions)));
    },
  } satisfies Plugin;
}
