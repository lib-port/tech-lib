import {usePluginData} from '@docusaurus/useGlobalData';
import {renderInheritedTitle} from './render.mjs';

export function useInheritedTitles() {
  return usePluginData('inherited-titles');
}

export default function InheritedTitle({title, children}) {
  return renderInheritedTitle(title, children);
}
