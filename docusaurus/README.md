# Docusaurus site

The library is published at <https://lib-port.github.io/tech-lib/>. Its Markdown
sources remain in the repository root and existing course/project directories.
The site reads them directly; there is no duplicated documentation tree.

## Requirements and commands

Use Git, the latest official Node.js LTS, and pnpm 12 (initially verified with 12.9.1) for
local development. With nvm, run `nvm install` and `nvm use` in this directory.
Node.js 24 or newer with native TypeScript support is required. Some distribution
builds disable TypeScript; use an official Node release, such as one installed
through nvm. Check support with `node -p 'process.features.typescript'`: it should
print `strip` or `transform`. GitHub Actions continues to use npm.

For a quick live preview using already installed dependencies, run `./preview.sh`
from the repository root. It opens <http://localhost:3000/tech-lib/> in your browser
and reflects edits while the server runs. Press Ctrl+C to stop it. Pass Docusaurus
start options through the script, for example `./preview.sh --port 3001` or
`./preview.sh --poll` if file changes are not detected. The script does not
install or update dependencies. On a fresh checkout, run `pnpm start` below once
to install them, then stop that server before using `./preview.sh`.

Run these commands from `docusaurus/`:

```sh
pnpm start         # Refresh dependencies and start the development server
pnpm run build     # Refresh dependencies and build the production site
pnpm test          # Run dependency and content tests against the installed packages
pnpm run typecheck # Strictly check all site code, scripts, and tests
pnpm run check     # Verify the generated production pages and assets
pnpm run serve     # Serve the existing production build locally
```

`start` and `build` install dependencies themselves. A separate installation step
is not required. `serve` reuses the built site without installing or
rebuilding it. The local site uses the same `/tech-lib/` base path as GitHub Pages.

The installer follows the package manager launching the script: `pnpm start`
and `pnpm run build` use pnpm; `npm start` and `npm run build` use npm. Direct
execution with Node defaults to pnpm. Unsupported managers and missing
executables stop the build with a setup message.

When switching an existing npm installation to pnpm, remove its generated
dependency directory once, then start the site. From `docusaurus/`:

```sh
rm -rf node_modules
pnpm start
```

Recreate this directory when switching back to npm too. Each manager uses its
own dependency layout; local and CI checkouts install independently.

## TypeScript

The configuration and sidebars use `.ts`, React components use `.tsx`, and the
plugins, helpers, scripts, and tests use `.ts`. Docusaurus compiles the site;
Node runs scripts and tests directly with native type stripping. Use `import type`
for type-only imports and explicit `.ts` extensions for relative imports shared
with Node. Node tooling must use erasable TypeScript syntax and relative imports;
it cannot execute runtime enums, parameter properties, JSX, or Docusaurus path aliases.

`tsconfig.json` extends `@docusaurus/tsconfig` with strict checking and no output.
It checks configuration, components, plugins, helpers, scripts, and tests while
excluding generated directories. The inherited `baseUrl` compiler option is
cleared for TypeScript 7; `@site/*` maps directly from this directory. Docusaurus
module aliases, classic theme declarations, and Node/React types are loaded
explicitly. This compiler option is separate from the site's deployment `baseUrl`.

Every production build installs dependencies, runs the installed TypeScript
compiler, and stops on type errors before invoking Docusaurus. The standalone
`typecheck` command uses installed dependencies without refreshing them.

The generated-module compatibility plugin lets the bundler handle Docusaurus's
generated JavaScript as mixed CommonJS/ESM while this package uses ESM for native
TypeScript. Server chunks use `.cjs` so Node loads their CommonJS exports correctly.
Review these rules when upgrading Docusaurus.

## Dependency updates

Every `start` and `build` queries the npm registry for each declared dependency's
current `latest` release, including new major versions. The bootstrap installs
those exact versions, checks official Docusaurus packages are aligned, verifies
peer dependencies and Node engine requirements, and logs installed versions.
Registry lookups run in batches of four to limit concurrent connections.
Declare new plugins explicitly in `package.json` using `latest`; they automatically
join the update process. Official plugins included by the classic preset follow
the preset's release.

The npm path installs the resolved versions without saving the manifest and
checks the complete dependency tree. The pnpm path uses `pnpm update` with exact
version selectors, temporary overrides scoped to the site's direct dependencies,
and `--no-save`; the overrides keep pnpm from following `latest` again during
installation. It enforces peer and engine compatibility during installation.
Both install development dependencies and verify the
installed versions afterwards; dependency refreshes preserve `package.json`.

The pnpm settings live in `pnpm-workspace.yaml`; `.npmrc` remains for npm.
Automatic pnpm pre-run installation is disabled so the wrapper owns refreshes.
The release-age setting permits immediate latest releases, matching the existing
npm policy. SWC's installation script is allowed; core-js's informational script
is disabled. Unreviewed dependency build scripts fail installation; review them
and record the decision in `allowBuilds` when dependency updates introduce one.

Project lockfiles are disabled. Registry failures or incompatible releases stop
the build; the bootstrap does not fall back to older versions. Rebuilding the same
commit later may use different dependencies. The workflow preserves the existing
published site when a build fails. Logs record the current build's versions, but
the repository's existing cleanup workflow removes older workflow runs.

If Node registry connections time out on a network where IPv4 requests work,
this invocation avoids Node's rapid IPv4/IPv6 connection switching:

```sh
NODE_OPTIONS='--dns-result-order=ipv4first --no-network-family-autoselection' pnpm run build
```

This is a local networking workaround; the workflow uses Node's default networking settings.

If SWC reports `ERR_SWC_NATIVE_CACHE` because the default cache directory's
permissions are too broad, give it a private cache directory:

```sh
mkdir -m 700 "$HOME/.tech-lib-swc-cache"
SWC_NATIVE_BINDING_CACHE="$HOME/.tech-lib-swc-cache" pnpm run build
```

## Build performance

[Docusaurus Faster](https://docusaurus.io/docs/api/docusaurus-config#future) is
enabled for development and production through `future.v4.fasterByDefault` and
the `@docusaurus/faster` dependency. It uses Rspack, SWC, and Lightning CSS, and
runs static generation in worker threads. The two enabled v4 flags select Faster
defaults and allow worker generation by removing the legacy `postBuild.head`
interface; custom plugins must not depend on that interface.

`mdxCrossCompilerCache` is explicitly disabled: warm rebuilds of this site stalled
with shared MDX compilation enabled in Docusaurus 3.10.2. Browser and server builds
compile MDX independently while retaining Rspack's persistent cache and the other
Faster optimizations. Recheck this exception when upgrading Docusaurus.

Repeated local builds reuse Rspack's persistent cache in `node_modules/.cache`.
GitHub Actions caches npm downloads only, so each CI run starts with a cold
compiler cache. Dependency resolution, installation, and verification still run
on every `start` and `build`; their time is separate from compilation.
`@docusaurus/faster` follows the same latest-release and version-alignment checks
as the other official Docusaurus packages.

The production checker uses `parse5` to normalize minified HTML in memory before
checking URLs, assets, and navigation, including attributes with optional quotes.

## Content and navigation

- Add or edit Markdown in the existing repository directories. Git-aware
  discovery includes tracked and new, non-ignored documents at startup/build.
  Restart the development server after adding or removing files.
- The root `README.md` becomes the homepage through configuration; its source
  needs no Docusaurus frontmatter. Nested READMEs introduce sidebar categories.
- Document URLs derive their last segment from the filename without its `.md`
  or `.mdx` extension: surrounding whitespace is trimmed, letters are lowercased,
  and each run of whitespace becomes `-`. For example,
  `pluralsight/ansible/Getting Started with Ansible.md` publishes at
  `/tech-lib/pluralsight/ansible/getting-started-with-ansible/`.
  Directory spelling, punctuation, document IDs, source filenames, and displayed
  titles remain unchanged. Existing Markdown links resolve to the new URLs.
- Nested `README`, `index`, and folder-matching filenames keep their directory
  URLs (matching is case-insensitive). Explicit `slug` frontmatter keeps its usual
  Docusaurus behavior, except the root `README.md` always remains the homepage.
  Duplicate routes fail the build. Old filename URLs are removed without
  redirects; update external links and bookmarks to the normalized URLs.
- The sidebar follows local Markdown link order in the nearest course README.
  Documents not listed there follow natural numeric order.
- Folder labels preserve directory names. Document titles inherited from the
  leading H1 retain inline Markdown formatting in navigation, with plain text
  used for browser titles and metadata. Explicit title and navigation labels
  keep their normal Docusaurus precedence.
- Relative links are resolved from the source file. Markdown links navigate
  within the site, and embedded images keep displaying in the document.
- Links to existing repository files other than `.md` and `.mdx` point directly
  to the raw file content on GitHub using `/raw/main/`. For example,
  `[Spreadsheet](report.xlsx)` downloads the workbook. Browser-supported formats
  such as images and PDFs may display directly, and `![Diagram](diagram.png)`
  still embeds the image. Linked attachments are not bundled into the site.
  Inline and reference-style links are supported, and query strings and fragments
  are preserved. Keep source links relative and assets beside the documents that
  reference them; the build rewrites links
  without modifying Markdown sources. GitHub links follow the current contents
  of `main`, rather than a snapshot of the deployed site.
- `.md` uses CommonMark with GitHub-style Markdown features; `.mdx` uses MDX.
  Mermaid, HTML details, tables, and emoji are enabled. Search and blog are disabled.
- GitHub-style alerts render as Docusaurus admonitions through
  `remark-github-admonitions-to-directives`, preserving the source Markdown.
  The default mapping is `NOTE` → `note`, `TIP` → `tip`, `IMPORTANT` → `info`,
  `WARNING` → `warning`, and `CAUTION` → `danger`.
- Site setup documentation, hidden directories, ignored files, dependency trees,
  and generated content are excluded. Source notes are not copied or rewritten.

## Theme customizations and upgrades

The navigation customizations were reviewed against Docusaurus **3.10.2**.
`DocBreadcrumbs` and `DocSidebarItem/Link` retain small copies of the classic
theme components because their label-rendering code has no rich-text extension
point. `PaginatorNavLink` wraps the original component and formats its React
title prop; document metadata and `DocPaginator` navigation titles remain plain
strings. The component comments link to the reviewed upstream source and explain
each customization.

Docusaurus classifies these theme components as unsafe to swizzle, so review
them whenever dependency updates change Docusaurus. Follow the official
[swizzling maintenance guidance](https://docusaurus.io/docs/swizzling#ejecting):

1. Compare the installed theme implementations and prop types with the upstream
   version recorded in the component comments. Reapply relevant upstream changes
   and update the recorded version after reviewing the customizations.
2. Run `pnpm test`, `pnpm run build`, and `pnpm run check`. Confirm the version logged
   by the build is the version reviewed, since builds refresh dependencies.
3. Check formatted sidebar labels, breadcrumbs, and both paginator directions
   after a page reload and client-side navigation. Check explicit labels, home
   links, long labels in desktop and mobile menus, and both color themes.

Global styles prefer documented theme classes. The navbar uses Docusaurus's
`src` and `srcDark` logo variants to show the same mark in light and dark modes;
the favicon follows the active site theme using the same variants. Check the
logo's alignment in desktop and mobile navigation when reviewing theme
upgrades. The home breadcrumb relies on the root README being the homepage,
which the production checker verifies.

The deployment `baseUrl` is defined once in `docusaurus.config.ts`. The Content
link's exact homepage matcher and the production checker's URL expectations
derive from this configuration.

## Deployment

The only site file outside this directory is
`../.github/workflows/deploy-pages.yml`, because GitHub requires that location.
GitHub Pages must use **GitHub Actions** as its publishing source.

Pull requests build and validate the site. Pushes to `main`, or a manual run on
`main`, build, test, check, and deploy the same `build/` artifact. Manual runs from
other branches validate without deploying. The build job has read permissions;
only the deployment job receives Pages and identity-token write permissions.
GitHub Actions runs `npm run build` (including strict type checking), `npm test`,
and `npm run check`, using the
same shared installer with npm selected by the launcher. Actions use verified
commit SHAs. npm downloads may be cached; installed
dependencies and site output are not reused across CI builds.

The workflow uses `lts/*` for Node.js. Existing GitLab mirroring and workflow
cleanup remain independent of deployment.
