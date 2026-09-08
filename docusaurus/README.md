# Docusaurus site

The library is published at <https://lib-port.github.io/tech-lib/>. Its Markdown
sources remain in the repository root and existing course/project directories.
The site reads them directly; there is no duplicated documentation tree.

## Requirements and commands

Use Git, the latest Node.js LTS, and npm. With nvm, run `nvm install` and `nvm use`
in this directory. Node.js 24 or newer is required.

Run these commands from `docusaurus/`:

```sh
npm start          # Refresh dependencies and start the development server
npm run build     # Refresh dependencies and build the production site
npm test          # Run dependency and content tests against the installed packages
npm run check     # Verify the generated production pages and assets
npm run serve     # Serve the existing production build locally
```

`start` and `build` install dependencies themselves. A separate `npm install` or
`npm ci` step is not required. `serve` reuses the built site without installing or
rebuilding it. The local site uses the same `/tech-lib/` base path as GitHub Pages.

## Dependency updates

Every build and development startup queries npm for each declared dependency's
current `latest` release, including new major versions. The bootstrap installs
those exact versions, checks official Docusaurus packages are aligned, verifies
peer dependencies and Node engine requirements, and logs installed versions.
Declare new plugins explicitly in `package.json` using `latest`; they automatically
join the update process. Official plugins included by the classic preset follow
the preset's release.

Project lockfiles are disabled. Registry failures or incompatible releases stop
the build; the bootstrap does not fall back to older versions. Rebuilding the same
commit later may use different dependencies. The workflow preserves the existing
published site when a build fails. Logs record the current build's versions, but
the repository's existing cleanup workflow removes older workflow runs.

If Node registry connections time out on a network where IPv4 requests work,
this invocation avoids Node's rapid IPv4/IPv6 connection switching:

```sh
NODE_OPTIONS='--dns-result-order=ipv4first --no-network-family-autoselection' npm run build
```

This is a local networking workaround; the workflow uses Node's default networking settings.

## Content and navigation

- Add or edit Markdown in the existing repository directories. Git-aware
  discovery includes tracked and new, non-ignored documents at startup/build.
  Restart the development server after adding or removing files.
- The root `README.md` becomes the homepage through configuration; its source
  needs no Docusaurus frontmatter. Nested READMEs introduce sidebar categories.
- The sidebar follows local Markdown link order in the nearest course README.
  Documents not listed there follow natural numeric order.
- Folder labels preserve directory names. Document titles inherited from the
  leading H1 retain inline Markdown formatting in navigation, with plain text
  used for browser titles and metadata. Explicit title and navigation labels
  keep their normal Docusaurus precedence.
- Existing relative Markdown and download links are resolved from the source
  file. Keep assets beside the documents that reference them.
- `.md` uses CommonMark with GitHub-style Markdown features; `.mdx` uses MDX.
  Mermaid, HTML details, tables, and emoji are enabled. Search and blog are disabled.
- Site setup documentation, hidden directories, ignored files, dependency trees,
  and generated content are excluded. Source notes are not copied or rewritten.

## Deployment

The only site file outside this directory is
`../.github/workflows/deploy-pages.yml`, because GitHub requires that location.
GitHub Pages must use **GitHub Actions** as its publishing source.

Pull requests build and validate the site. Pushes to `main`, or a manual run on
`main`, build, test, check, and deploy the same `build/` artifact. Manual runs from
other branches validate without deploying. The build job has read permissions;
only the deployment job receives Pages and identity-token write permissions.
GitHub Actions use verified commit SHAs. npm downloads may be cached; installed
dependencies and site output are not reused across CI builds.

The workflow uses `lts/*` for Node.js. Existing GitLab mirroring and workflow
cleanup remain independent of deployment.
