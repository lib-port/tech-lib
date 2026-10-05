import type {LoadContext, Plugin} from '@docusaurus/types';

export default function generatedModulesPlugin({generatedFilesDir}: LoadContext): Plugin {
  return {
    name: 'generated-module-compatibility',
    configureWebpack(_config, isServer) {
      return {
        // Node must recognize the server's CommonJS chunks within an ESM package.
        ...(isServer ? {output: {chunkFilename: '[name].[contenthash:8].cjs'}} : {}),
        module: {
          rules: [{
            test: /\.js$/,
            include: generatedFilesDir,
            // Generated routes mix imports with require.resolveWeak. Preserve the
            // bundler's mixed-module handling inside this native TypeScript ESM site.
            // https://github.com/facebook/docusaurus/discussions/11326
            type: 'javascript/auto',
          }],
        },
      };
    },
  };
}
