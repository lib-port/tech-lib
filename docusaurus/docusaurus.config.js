import path from 'node:path';
import {fileURLToPath} from 'node:url';
import remarkGithubAdmonitionsToDirectives from 'remark-github-admonitions-to-directives';
import {
  createSidebar, discoverDocuments, documentFrontMatter, escapeGlob, readCourseOrders,
} from './lib/content.mjs';
import {inheritTitle} from './lib/inherited-titles.mjs';
import {homepageActiveRegex} from './lib/site-urls.mjs';
import inheritedTitlesPlugin from './plugins/inherited-titles.mjs';
import remarkRepositoryFileLinks from './plugins/repository-file-links.mjs';

const siteDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(siteDirectory, '..');
const files = discoverDocuments(repositoryRoot);
const baseUrl = '/tech-lib/';

export default {
  title: 'Notes and Projects Library',
  tagline: 'Engineering, architecture, cybersecurity, and product notes and projects',
  url: 'https://lib-port.github.io',
  baseUrl,
  trailingSlash: true,
  organizationName: 'lib-port',
  projectName: 'tech-lib',
  onBrokenLinks: 'throw',
  onBrokenAnchors: 'throw',
  onDuplicateRoutes: 'throw',
  i18n: {defaultLocale: 'en', locales: ['en']},
  future: {
    faster: {
      // Shared MDX compilation stalls when restoring the persistent build cache.
      mdxCrossCompilerCache: false,
    },
    v4: {fasterByDefault: true, removeLegacyPostBuildHeadAttribute: true},
  },
  markdown: {
    format: 'detect',
    mermaid: true,
    emoji: true,
    hooks: {onBrokenMarkdownLinks: 'throw', onBrokenMarkdownImages: 'throw'},
    async parseFrontMatter(params) {
      const result = await params.defaultParseFrontMatter(params);
      const frontMatter = documentFrontMatter(params.filePath, repositoryRoot, result.frontMatter);
      return {...result, frontMatter: inheritTitle(result.content, frontMatter)};
    },
  },
  presets: [
    ['classic', {
      docs: {
        path: '..',
        routeBasePath: '/',
        include: files.map(escapeGlob),
        exclude: [],
        sidebarPath: './sidebars.js',
        numberPrefixParser: false,
        beforeDefaultRemarkPlugins: [
          remarkGithubAdmonitionsToDirectives,
          [remarkRepositoryFileLinks, {
            repositoryRoot,
            repositoryUrl: 'https://github.com/lib-port/tech-lib',
            ref: 'main',
          }],
        ],
        async sidebarItemsGenerator({docs}) {
          const documents = docs.map(doc => ({
            id: doc.id,
            file: path.relative(repositoryRoot,
              path.resolve(siteDirectory, doc.source.replace(/^@site\//, ''))).split(path.sep).join('/'),
          }));
          return createSidebar(documents, readCourseOrders(repositoryRoot, files));
        },
      },
      blog: false,
      pages: false,
      theme: {customCss: './src/css/custom.css'},
    }],
  ],
  plugins: [inheritedTitlesPlugin],
  themes: ['@docusaurus/theme-mermaid'],
  themeConfig: {
    colorMode: {defaultMode: 'light', respectPrefersColorScheme: true},
    navbar: {
      title: 'Notes and Projects Library',
      logo: {
        alt: 'Site Logo',
        src: 'img/logo.svg',
        srcDark: 'img/logo-dark.svg',
      },
      items: [
        {to: '/', label: 'Content', position: 'left', activeBaseRegex: homepageActiveRegex(baseUrl)},
        {
          href: 'https://github.com/lib-port/tech-lib',
          html: [
            `<span class="header-github-icon header-github-icon-light" style="--github-icon: url('${baseUrl}img/mark-github.svg')" aria-hidden="true"></span>`,
            `<span class="header-github-icon header-github-icon-dark" style="--github-icon: url('${baseUrl}img/mark-github-dark.svg')" aria-hidden="true"></span>`,
          ].join(''),
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
          title: 'GitHub repository',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: 'Built with <a href="https://docusaurus.io/">Docusaurus</a> and <a href="https://pages.github.com/">GitHub Pages</a>',
    },
    docs: {sidebar: {hideable: true}},
    prism: {additionalLanguages: ['bash', 'python', 'powershell', 'sql', 'ini', 'yaml', 'docker', 'json', 'nginx']},
  },
};
