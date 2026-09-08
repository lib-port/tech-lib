import {spawn} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import path from 'node:path';

const registry = 'https://registry.npmjs.org/';
const versionPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;
export const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';

export async function readJson(filename) {
  return JSON.parse(await readFile(filename, 'utf8'));
}

/** Use the manifest as the complete inventory, including newly added plugins. */
export function dependencyNames(manifest) {
  const names = [...new Set([
    ...Object.keys(manifest.dependencies ?? {}),
    ...Object.keys(manifest.devDependencies ?? {}),
    ...Object.keys(manifest.optionalDependencies ?? {}),
  ])].sort();
  if (!names.length) throw new Error('The site manifest declares no dependencies.');
  return names;
}

export function assertDocusaurusVersions(versions) {
  const official = Object.entries(versions).filter(([name]) => name.startsWith('@docusaurus/'));
  if (new Set(official.map(([, version]) => version)).size > 1) {
    throw new Error(`Latest official Docusaurus releases do not match: ${official.map(([name, version]) => `${name}@${version}`).join(', ')}. Retry after the upstream release completes.`);
  }
}

/** Resolve once per build, bypassing local npm metadata and installed versions. */
export async function resolveLatestVersions(names, {fetchImpl = fetch, timeoutMs = 30_000} = {}) {
  const entries = await Promise.all(names.map(async (name) => {
    try {
      const response = await fetchImpl(new URL(`${encodeURIComponent(name)}/latest`, registry), {
        headers: {accept: 'application/json', 'cache-control': 'no-cache'},
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (!response.ok) throw new Error(`npm registry returned HTTP ${response.status}`);
      const metadata = await response.json();
      if (metadata.name !== name || !versionPattern.test(metadata.version ?? '')) {
        throw new Error('npm registry returned invalid package metadata');
      }
      return [name, metadata.version];
    } catch (error) {
      throw new Error(`Cannot resolve ${name}@latest: ${error.message}`, {cause: error});
    }
  }));
  const versions = Object.fromEntries(entries);
  assertDocusaurusVersions(versions);
  return versions;
}

/** Pass arguments directly to the executable; never use a shell or npx. */
export async function runCommand(command, args, {cwd, capture = false} = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: capture ? ['ignore', 'pipe', 'pipe'] : 'inherit',
      shell: false,
    });
    let stdout = '';
    let stderr = '';
    child.stdout?.setEncoding('utf8').on('data', (data) => { stdout += data; });
    child.stderr?.setEncoding('utf8').on('data', (data) => { stderr += data; });
    child.once('error', reject);
    child.once('close', (code, signal) => {
      if (code === 0) return resolve({stdout, stderr});
      const error = new Error(`${command} ${args[0] ?? ''} failed (${signal ?? `exit ${code}`}).${stderr ? `\n${stderr.slice(-6000)}` : ''}`);
      error.exitCode = code || 1;
      reject(error);
    });
  });
}

export async function verifyInstalledVersions(siteDir, versions, {read = readJson} = {}) {
  for (const [name, expected] of Object.entries(versions)) {
    const installed = await read(path.join(siteDir, 'node_modules', name, 'package.json'));
    if (installed.version !== expected) {
      throw new Error(`Expected ${name}@${expected}, but installed ${installed.version ?? 'no version'}.`);
    }
  }
}

export async function refreshDependencies(siteDir, {
  read = readJson,
  fetchImpl = fetch,
  run = runCommand,
  log = console.log,
} = {}) {
  const manifest = await read(path.join(siteDir, 'package.json'));
  const versions = await resolveLatestVersions(dependencyNames(manifest), {fetchImpl});
  log(`Node ${process.version}; resolving npm latest releases:\n${Object.entries(versions).map(([name, version]) => `  ${name}@${version}`).join('\n')}`);
  await run(npmCommand, ['--version'], {cwd: siteDir});
  await run(npmCommand, [
    'install', ...Object.entries(versions).map(([name, version]) => `${name}@${version}`),
    '--no-save', '--package-lock=false', '--strict-peer-deps',
    '--legacy-peer-deps=false', '--engine-strict', '--include=dev',
    '--no-audit', '--no-fund',
  ], {cwd: siteDir});
  await verifyInstalledVersions(siteDir, versions, {read});
  await run(npmCommand, ['ls', '--all'], {cwd: siteDir, capture: true});
  log('Installed versions and dependency compatibility verified.');
  return versions;
}
