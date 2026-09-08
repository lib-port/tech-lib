/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in this theme source tree (src/theme/LICENSE).
 */

import React from 'react';
import {useDoc} from '@docusaurus/plugin-content-docs/client';
import DocPaginator from '@theme/DocPaginator';
import InheritedTitle, {useInheritedTitles} from '@site/src/components/InheritedTitle';

function withInheritedTitle(link, title) {
  return link && title ? {
    ...link,
    title: <InheritedTitle title={title}>{link.title}</InheritedTitle>,
  } : link;
}

export default function DocItemPaginator() {
  const {metadata} = useDoc();
  const titles = useInheritedTitles();
  const pagination = titles.pagination[metadata.permalink];
  return (
    <DocPaginator
      className="docusaurus-mt-lg"
      previous={withInheritedTitle(metadata.previous, pagination?.previous)}
      next={withInheritedTitle(metadata.next, pagination?.next)}
    />
  );
}
