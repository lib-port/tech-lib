import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {errorMessage, readJson, refreshDependencies, runCommand, runTypecheck} from './dependencies.ts';

const siteDir = fileURLToPath(new URL('..', import.meta.url));

try {
  if (Number(process.versions.node.split('.')[0]) < 24 || !process.features.typescript) {
    throw new Error('Use the latest official Node.js LTS release (Node.js 24 or newer with native TypeScript support).');
  }
  const [command, ...args] = process.argv.slice(2);
  if (command !== 'build' && command !== 'start' && command !== 'serve') {
    throw new Error('Usage: node scripts/site.ts <build|start|serve> [Docusaurus arguments]');
  }
  if (command !== 'serve') await refreshDependencies(siteDir);
  if (command === 'build') await runTypecheck(siteDir);

  const packageDir = path.join(siteDir, 'node_modules', '@docusaurus', 'core');
  let manifest;
  try {
    manifest = await readJson(path.join(packageDir, 'package.json'));
  } catch (error) {
    throw new Error('Docusaurus is not installed. Run pnpm run build locally, or npm run build in CI, first.', {cause: error});
  }
  const executable = typeof manifest.bin === 'string' ? manifest.bin : manifest.bin?.docusaurus;
  if (!executable) throw new Error('The installed Docusaurus package has no CLI executable.');
  await runCommand(process.execPath, [path.resolve(packageDir, executable), command, ...args], {cwd: siteDir});
} catch (error) {
  console.error(`Site command failed: ${errorMessage(error)}`);
  process.exitCode = error instanceof Error && 'exitCode' in error && typeof error.exitCode === 'number' ? error.exitCode || 1 : 1;
}
