import {spawn} from 'node:child_process';
import {readFile} from 'node:fs/promises';
import path from 'node:path';

const registry = 'https://registry.npmjs.org/';
const versionPattern = /^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?(?:\+[0-9A-Za-z.-]+)?$/;

export type PackageManifest = {
  name?: string;
  version?: string;
  bin?: string | Record<string, string>;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
  optionalDependencies?: Record<string, string>;
};
export type PackageManager = {name: 'npm' | 'pnpm'; command: string; argsPrefix: string[]};
export type CommandOptions = {cwd?: string; capture?: boolean; env?: NodeJS.ProcessEnv};
export type CommandOutput = {stdout: string; stderr: string};
export type CommandRunner = (command: string, args: string[], options?: CommandOptions) => Promise<CommandOutput | void>;
export type JsonReader = (filename: string) => Promise<PackageManifest>;
export type RegistryRequest = {headers: Record<string, string>; signal: AbortSignal};
export type RegistryFetch = (url: URL, options: RegistryRequest) => Promise<{
  ok: boolean; status?: number; json?: () => Promise<unknown>;
}>;
export type RefreshOptions = {
  read?: JsonReader;
  fetchImpl?: RegistryFetch;
  run?: CommandRunner;
  log?: (message: string) => void;
  manager?: PackageManager;
};

export function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

/** Follow the script launcher; direct Node execution uses pnpm. */
export function resolvePackageManager({env = process.env, platform = process.platform, node = process.execPath}: {
  env?: NodeJS.ProcessEnv; platform?: NodeJS.Platform; node?: string;
} = {}): PackageManager {
  const executable = env.npm_execpath;
  const basename = executable ? (platform === 'win32' ? path.win32 : path).basename(executable) : '';
  const executableManager = basename.match(/^(pnpm|npm)(?:-cli)?(?:\.[cm]?js|\.exe|\.cmd)?$/i)?.[1].toLowerCase();
  const agentManager = env.npm_config_user_agent?.trim().split(/\s+/)[0].split('/')[0];
  const name = agentManager || executableManager || 'pnpm';
  if (name !== 'npm' && name !== 'pnpm') {
    throw new Error(`Unsupported package manager: ${name}. Use pnpm or npm to start or build the site.`);
  }
  if (executableManager && executableManager !== name) {
    throw new Error('The package manager user agent and executable disagree. Run the site through pnpm or npm.');
  }
  if (executable && executableManager === name) {
    if (/\.[cm]?js$/i.test(executable)) return {name, command: node, argsPrefix: [executable]};
    if (/\.cmd$/i.test(executable)) {
      throw new Error(`Cannot execute ${executable} without a shell. Use a JavaScript launcher or the native pnpm executable.`);
    }
    return {name, command: executable, argsPrefix: []};
  }
  return {name, command: platform === 'win32' && name === 'pnpm' ? 'pnpm.exe' : name, argsPrefix: []};
}

export async function readJson(filename: string): Promise<PackageManifest> {
  return JSON.parse(await readFile(filename, 'utf8')) as PackageManifest;
}

/** Use the manifest as the complete inventory, including newly added plugins. */
export function dependencyNames(manifest: PackageManifest) {
  const names = [...new Set([
    ...Object.keys(manifest.dependencies ?? {}),
    ...Object.keys(manifest.devDependencies ?? {}),
    ...Object.keys(manifest.optionalDependencies ?? {}),
  ])].sort();
  if (!names.length) throw new Error('The site manifest declares no dependencies.');
  return names;
}

export function assertDocusaurusVersions(versions: Record<string, string>) {
  const official = Object.entries(versions).filter(([name]) => name.startsWith('@docusaurus/'));
  if (new Set(official.map(([, version]) => version)).size > 1) {
    throw new Error(`Latest official Docusaurus releases do not match: ${official.map(([name, version]) => `${name}@${version}`).join(', ')}. Retry after the upstream release completes.`);
  }
}

/** Resolve once per build, bypassing local npm metadata and installed versions. */
export async function resolveLatestVersions(names: readonly string[], {fetchImpl = fetch, timeoutMs = 30_000}: {
  fetchImpl?: RegistryFetch; timeoutMs?: number;
} = {}) {
  const resolve = async (name: string): Promise<[string, string]> => {
    try {
      const response = await fetchImpl(new URL(`${encodeURIComponent(name)}/latest`, registry), {
        headers: {accept: 'application/json', 'cache-control': 'no-cache'},
        signal: AbortSignal.timeout(timeoutMs),
      });
      if (!response.ok) throw new Error(`npm registry returned HTTP ${response.status}`);
      const metadata: unknown = await response.json?.();
      if (!metadata || typeof metadata !== 'object' || !('name' in metadata) || metadata.name !== name
        || !('version' in metadata) || typeof metadata.version !== 'string' || !versionPattern.test(metadata.version)) {
        throw new Error('npm registry returned invalid package metadata');
      }
      return [name, metadata.version];
    } catch (error) {
      throw new Error(`Cannot resolve ${name}@latest: ${errorMessage(error)}`, {cause: error});
    }
  };
  const entries: [string, string][] = [];
  // Bound registry connections as the inventory grows with new plugins.
  for (let offset = 0; offset < names.length; offset += 4) {
    entries.push(...await Promise.all(names.slice(offset, offset + 4).map(resolve)));
  }
  const versions = Object.fromEntries(entries);
  assertDocusaurusVersions(versions);
  return versions;
}

/** Pass arguments directly to the executable; never use a shell or npx. */
export async function runCommand(command: string, args: string[], {cwd, capture = false, env = process.env}: CommandOptions = {}) {
  return new Promise<CommandOutput>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      env,
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
      const error = Object.assign(new Error(`${command} ${args[0] ?? ''} failed (${signal ?? `exit ${code}`}).${stderr ? `\n${stderr.slice(-6000)}` : ''}`), {exitCode: code || 1});
      reject(error);
    });
  });
}

export async function verifyInstalledVersions(siteDir: string, versions: Record<string, string>, {read = readJson}: {read?: JsonReader} = {}) {
  for (const [name, expected] of Object.entries(versions)) {
    const installed = await read(path.join(siteDir, 'node_modules', name, 'package.json'));
    if (installed.version !== expected) {
      throw new Error(`Expected ${name}@${expected}, but installed ${installed.version ?? 'no version'}.`);
    }
  }
}

export async function refreshDependencies(siteDir: string, {
  read = readJson,
  fetchImpl = fetch,
  run = runCommand,
  log = console.log,
  manager = resolvePackageManager(),
}: RefreshOptions = {}) {
  const manifest = await read(path.join(siteDir, 'package.json'));
  const versions = await resolveLatestVersions(dependencyNames(manifest), {fetchImpl});
  log(`Node ${process.version}; using ${manager.name}; resolving npm registry latest releases:\n${Object.entries(versions).map(([name, version]) => `  ${name}@${version}`).join('\n')}`);
  const runManager = async (args: string[], options: CommandOptions = {}) => {
    try {
      return await run(manager.command, [...manager.argsPrefix, ...args], {cwd: siteDir, ...options});
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        throw new Error(`Cannot run ${manager.name}: the executable is unavailable (${manager.command}). Install ${manager.name} or launch the build with the other supported package manager.`, {cause: error});
      }
      throw error;
    }
  };
  const packages = Object.entries(versions).map(([name, version]) => `${name}@${version}`);
  await runManager(['--version']);
  if (manager.name === 'pnpm') {
    // Without an override, pnpm retains a latest tag even with an exact selector.
    // Scope each pin to this project so transitive dependency ranges stay intact.
    const overrides = Object.fromEntries(Object.entries(versions)
      .map(([name, version]) => [`${manifest.name}>${name}`, version]));
    await runManager(['update', ...packages, '--no-save', `--config.overrides=${JSON.stringify(overrides)}`], {
      env: {...process.env, NODE_ENV: 'development'},
    });
  } else {
    await runManager([
      'install', ...packages,
      '--no-save', '--package-lock=false', '--strict-peer-deps',
      '--legacy-peer-deps=false', '--engine-strict', '--include=dev',
      '--no-audit', '--no-fund',
    ]);
  }
  await verifyInstalledVersions(siteDir, versions, {read});
  if (manager.name === 'npm') await runManager(['ls', '--all'], {capture: true});
  log('Installed versions and dependency compatibility verified.');
  return versions;
}

/** Resolve the compiler's declared launcher, including the native TypeScript 7 CLI. */
export async function runTypecheck(siteDir: string, {read = readJson, run = runCommand}: {
  read?: JsonReader; run?: CommandRunner;
} = {}) {
  const packageDir = path.join(siteDir, 'node_modules', 'typescript');
  const manifest = await read(path.join(packageDir, 'package.json'));
  const executable = typeof manifest.bin === 'string' ? manifest.bin : manifest.bin?.tsc;
  if (!executable) throw new Error('The installed TypeScript package has no compiler executable.');
  await run(process.execPath, [path.resolve(packageDir, executable), '--noEmit'], {cwd: siteDir});
}
