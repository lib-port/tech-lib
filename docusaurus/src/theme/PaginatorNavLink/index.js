/**
 * Wrapper verified against Docusaurus 3.10.2:
 * https://github.com/facebook/docusaurus/blob/v3.10.2/packages/docusaurus-theme-classic/src/theme/PaginatorNavLink/index.tsx
 * Customization: format inherited doc titles at the ReactNode title prop,
 * keeping navigation metadata as strings and forwarding native link props.
 * Unsafe to swizzle: compare with upstream on every Docusaurus upgrade.
 */

import React from 'react';
import {useLocation} from '@docusaurus/router';
import PaginatorNavLink from '@theme-original/PaginatorNavLink';
import {useInheritedTitles} from '@site/src/components/InheritedTitle';
import {getInheritedPaginationTitle} from '@site/src/components/InheritedTitle/pagination.mjs';
import {renderInheritedTitle} from '@site/src/components/InheritedTitle/render.mjs';

export default function PaginatorNavLinkWrapper(props) {
  const {pathname} = useLocation();
  const {pagination} = useInheritedTitles();
  const title = getInheritedPaginationTitle(pagination, pathname, props.isNext);
  const label = title ? renderInheritedTitle(title, props.title) : props.title;
  return <PaginatorNavLink {...props} title={label} />;
}
