import React from 'react';
import Head from '@docusaurus/Head';
import useBaseUrl from '@docusaurus/useBaseUrl';
import {useColorMode} from '@docusaurus/theme-common';
import Layout from '@theme-original/Layout';

function ThemeFavicon() {
  const {colorMode} = useColorMode();
  const faviconUrl = useBaseUrl(
    colorMode === 'dark' ? 'img/logo-dark.svg' : 'img/logo.svg',
  );

  return (
    <Head>
      <link rel="icon" type="image/svg+xml" href={faviconUrl} />
    </Head>
  );
}

export default function LayoutWrapper({children, ...props}) {
  return (
    <Layout {...props}>
      <ThemeFavicon />
      {children}
    </Layout>
  );
}
