/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in this theme source tree (src/theme/LICENSE).
 *
 * Ejected from Docusaurus 3.10.2:
 * https://github.com/facebook/docusaurus/blob/v3.10.2/packages/docusaurus-theme-classic/src/theme/DocBreadcrumbs/index.tsx
 * Customizations: use source filenames for document labels and rely on this site's
 * guaranteed README homepage instead of the internal homepage route hook.
 * Unsafe to swizzle: compare with upstream on every Docusaurus upgrade.
 */

import React from 'react';
import type {ReactNode} from 'react';
import clsx from 'clsx';
import {ThemeClassNames} from '@docusaurus/theme-common';
import {useDoc, useSidebarBreadcrumbs} from '@docusaurus/plugin-content-docs/client';
import type {PropSidebarBreadcrumbsItem} from '@docusaurus/plugin-content-docs';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import HomeBreadcrumbItem from '@theme/DocBreadcrumbs/Items/Home';
import DocBreadcrumbsStructuredData from '@theme/DocBreadcrumbs/StructuredData';

import styles from './styles.module.css';

type BreadcrumbsProps = {breadcrumbs: PropSidebarBreadcrumbsItem[]};

function BreadcrumbsItemLink({children, href, isLast}: {children: ReactNode; href?: string; isLast: boolean}) {
  const className = 'breadcrumbs__link';
  if (isLast) {
    return <span className={className}>{children}</span>;
  }
  return href ? (
    <Link className={className} href={href}>
      <span>{children}</span>
    </Link>
  ) : (
    <span className={className}>{children}</span>
  );
}

function BreadcrumbsItem({children, active}: {children: ReactNode; active: boolean}) {
  return (
    <li
      className={clsx('breadcrumbs__item', {
        'breadcrumbs__item--active': active,
      })}>
      {children}
    </li>
  );
}

export default function DocBreadcrumbs() {
  const breadcrumbs = useSidebarBreadcrumbs();
  if (!breadcrumbs) {
    return null;
  }

  // Generated category pages have no DocProvider; only doc links need filenames.
  const last = breadcrumbs.at(-1);
  return last?.type === 'link' && last.docId
    ? <DocumentBreadcrumbs breadcrumbs={breadcrumbs} />
    : <Breadcrumbs breadcrumbs={breadcrumbs} />;
}

function DocumentBreadcrumbs({breadcrumbs: sidebarBreadcrumbs}: BreadcrumbsProps) {
  const {metadata} = useDoc();
  const filename = metadata.source.slice(metadata.source.lastIndexOf('/') + 1);
  const breadcrumbs = sidebarBreadcrumbs.map(item =>
    item.type === 'link' && item.docId === metadata.id && !/^README\.mdx?$/i.test(filename)
      ? {...item, label: filename.replace(/\.mdx?$/i, '')}
      : item,
  );

  return <Breadcrumbs breadcrumbs={breadcrumbs} />;
}

function Breadcrumbs({breadcrumbs}: BreadcrumbsProps) {
  return (
    <>
      <DocBreadcrumbsStructuredData breadcrumbs={breadcrumbs} />
      <nav
        className={clsx(
          ThemeClassNames.docs.docBreadcrumbs,
          styles.breadcrumbsContainer,
        )}
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.navAriaLabel',
          message: 'Breadcrumbs',
          description: 'The ARIA label for the breadcrumbs',
        })}>
        <ul className="breadcrumbs">
          {/* The root README is always the homepage; check-build verifies it. */}
          <HomeBreadcrumbItem />
          {breadcrumbs.map((item, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            const href =
              item.type === 'category' && item.linkUnlisted
                ? undefined
                : item.href;
            return (
              <BreadcrumbsItem key={idx} active={isLast}>
                <BreadcrumbsItemLink href={href} isLast={isLast}>
                  {item.label}
                </BreadcrumbsItemLink>
              </BreadcrumbsItem>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
