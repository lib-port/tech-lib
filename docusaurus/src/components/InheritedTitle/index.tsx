import {usePluginData} from '@docusaurus/useGlobalData';
import {renderInheritedTitle} from './render.ts';
import type {ReactNode} from 'react';
import type {InheritedTitle as Title, InheritedTitleData} from '../../../lib/title-types.ts';

export function useInheritedTitles() {
  return usePluginData('inherited-titles') as InheritedTitleData;
}

export default function InheritedTitle({title, children}: {title?: Title; children: ReactNode}) {
  return renderInheritedTitle(title, children);
}
