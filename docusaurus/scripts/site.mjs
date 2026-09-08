import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {readJson, refreshDependencies, runCommand} from './dependencies.mjs';

const siteDir = fileURLToPath(new URL('..', import.meta.url));

try {
  if (Number(process.versions.node.split('.')[0]) < 24) {
    throw new Error('Use the latest Node.js LTS release (Node.js 24 or newer).');
  }
  const [command, ...args] = process.argv.slice(2);
  if (!['build', 'start', 'serve'].includes(command)) {
    throw new Error('Usage: node scripts/site.mjs <build|start|serve> [Docusaurus arguments]');
  }
  if (command !== 'serve') await refreshDependencies(siteDir);

  const packageDir = path.join(siteDir, 'node_modules', '@docusaurus', 'core');
  let manifest;
  try {
    manifest = await readJson(path.join(packageDir, 'package.json'));
  } catch (error) {
    throw new Error('Docusaurus is not installed. Run npm run build first.', {cause: error});
  }
  const executable = typeof manifest.bin === 'string' ? manifest.bin : manifest.bin?.docusaurus;
  if (!executable) throw new Error('The installed Docusaurus package has no CLI executable.');
  await runCommand(process.execPath, [path.resolve(packageDir, executable), command, ...args], {cwd: siteDir});
} catch (error) {
  console.error(`Site command failed: ${error.message}`);
  process.exitCode = error.exitCode || 1;
}
