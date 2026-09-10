/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in this theme source tree (src/theme/LICENSE).
 *
 * Ejected from Docusaurus 3.10.2:
 * https://github.com/facebook/docusaurus/blob/v3.10.2/packages/docusaurus-theme-classic/src/theme/DocSidebarItem/Link/index.tsx
 * Customization: render inherited inline titles while retaining string labels
 * in sidebar metadata and preserving native link behavior.
 * Unsafe to swizzle: compare with upstream on every Docusaurus upgrade.
 */

import React from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {isActiveSidebarItem} from '@docusaurus/plugin-content-docs/client';
import Link from '@docusaurus/Link';
import isInternalUrl from '@docusaurus/isInternalUrl';
import IconExternalLink from '@theme/Icon/ExternalLink';
import InheritedTitle, {useInheritedTitles} from '@site/src/components/InheritedTitle';

import styles from './styles.module.css';

export default function DocSidebarItemLink({
  item,
  onItemClick,
  activePath,
  level,
  index,
  ...props
}) {
  const {href, label, className, autoAddBaseUrl} = item;
  const titles = useInheritedTitles();
  const title = item.type === 'link' && item.docId ? titles.sidebar[href] : undefined;
  const isActive = isActiveSidebarItem(item, activePath);
  const isInternalLink = isInternalUrl(href);
  return (
    <li
      className={clsx(
        ThemeClassNames.docs.docSidebarItemLink,
        ThemeClassNames.docs.docSidebarItemLinkLevel(level),
        'menu__list-item',
        className,
      )}
      key={label}>
      <Link
        className={clsx(
          'menu__link',
          !isInternalLink && styles.menuExternalLink,
          {
            'menu__link--active': isActive,
          },
        )}
        autoAddBaseUrl={autoAddBaseUrl}
        aria-current={isActive ? 'page' : undefined}
        to={href}
        {...(isInternalLink && {
          onClick: onItemClick ? () => onItemClick(item) : undefined,
        })}
        {...props}>
        <span className={styles.linkLabel}>
          <InheritedTitle title={title}>{label}</InheritedTitle>
        </span>
        {!isInternalLink && <IconExternalLink />}
      </Link>
    </li>
  );
}
