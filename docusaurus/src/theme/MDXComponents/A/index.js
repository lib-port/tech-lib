import React from 'react';
import OriginalA from '@theme-original/MDXComponents/A';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export default function MarkdownLink({href, ...props}) {
  const {siteConfig: {baseUrl}} = useDocusaurusContext();
  // Bundled downloads are files, so they must not receive page trailing slashes
  // or React Router navigation. Keep original Markdown links unchanged.
  if (href?.startsWith(`${baseUrl}assets/`)) {
    return <OriginalA {...props} href={`pathname://${href}`} target={props.target ?? '_self'} />;
  }
  return <OriginalA {...props} href={href} />;
}
