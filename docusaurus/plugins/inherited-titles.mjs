import {createInheritedTitleData} from '../lib/inherited-titles.mjs';

export default function inheritedTitlesPlugin() {
  return {
    name: 'inherited-titles',
    allContentLoaded({allContent, actions}) {
      const instances = Object.values(allContent['docusaurus-plugin-content-docs'] ?? {});
      actions.setGlobalData(createInheritedTitleData(instances.flatMap(content => content.loadedVersions)));
    },
  };
}
