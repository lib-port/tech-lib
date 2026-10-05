import assert from 'node:assert/strict';
import {mkdtemp, mkdir, copyFile, writeFile, rm} from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';
import {
  dependencyNames,
  refreshDependencies,
  resolvePackageManager,
  resolveLatestVersions,
  runCommand,
  runTypecheck,
  verifyInstalledVersions,
} from '../scripts/dependencies.ts';
import type {CommandOptions, RefreshOptions, RegistryFetch, RegistryRequest} from '../scripts/dependencies.ts';

type RegistryCall = {name: string; options: RegistryRequest};

function registryResponse(versions: Record<string, string>, calls: RegistryCall[] = []): RegistryFetch {
  return async (url, options) => {
    const name = decodeURIComponent(url.pathname.slice(1, -'/latest'.length));
    calls.push({name, options});
    return {ok: true, json: async () => ({name, version: versions[name]})};
  };
}

test('dependency inventory automatically includes new plugins in every manifest section', () => {
  assert.deepEqual(dependencyNames({
    dependencies: {'@docusaurus/core': 'latest', 'new-site-plugin': 'latest'},
    devDependencies: {'remark-plugin': 'latest', 'new-site-plugin': 'latest'},
    optionalDependencies: {'optional-plugin': 'latest'},
  }), ['@docusaurus/core', 'new-site-plugin', 'optional-plugin', 'remark-plugin']);
  assert.throws(() => dependencyNames({}), /no dependencies/);
});

test('each dependency resolves its current latest tag once, with cache bypass and timeout', async () => {
  const versions = {'@docusaurus/core': '4.0.0', '@docusaurus/theme-mermaid': '4.0.0', 'new-plugin': '2.0.1'};
  const calls: RegistryCall[] = [];
  assert.deepEqual(await resolveLatestVersions(Object.keys(versions), {fetchImpl: registryResponse(versions, calls)}), versions);
  assert.deepEqual(calls.map(({name}) => name), Object.keys(versions));
  for (const {options} of calls) {
    assert.equal(options.headers['cache-control'], 'no-cache');
    assert.ok(options.signal instanceof AbortSignal);
  }
});

test('inconsistent official latest releases fail before installation', async () => {
  const versions = {'@docusaurus/core': '4.0.0', '@docusaurus/theme-mermaid': '3.99.0'};
  await assert.rejects(resolveLatestVersions(Object.keys(versions), {fetchImpl: registryResponse(versions)}), /official Docusaurus releases do not match/);
});

test('a growing plugin inventory limits concurrent registry lookups while resolving every dependency once', async () => {
  const versions = Object.fromEntries(Array.from({length: 11}, (_, index) => [`plugin-${index}`, '1.0.0']));
  const calls: RegistryCall[] = [];
  let active = 0;
  let maximum = 0;
  const respond = registryResponse(versions, calls);
  const fetched = await resolveLatestVersions(Object.keys(versions), {
    fetchImpl: async (...args) => {
      active += 1;
      maximum = Math.max(maximum, active);
      await new Promise(resolve => setImmediate(resolve));
      active -= 1;
      return respond(...args);
    },
  });
  assert.deepEqual(fetched, versions);
  assert.deepEqual(calls.map(({name}) => name), Object.keys(versions));
  assert.ok(maximum <= 4, `Too many simultaneous registry connections: ${maximum}`);
});

test('network errors, HTTP errors, and invalid metadata never fall back to installed versions', async (t) => {
  for (const [name, fetchImpl, expected] of [
    ['network error', async () => { throw new Error('offline'); }, /Cannot resolve plugin@latest: offline/],
    ['HTTP error', async () => ({ok: false, status: 503}), /HTTP 503/],
    ['invalid metadata', registryResponse({plugin: 'latest'}), /invalid package metadata/],
  ] as const) {
    await t.test(name, async () => {
      let commands = 0;
      await assert.rejects(refreshDependencies('/site', {
        read: async () => ({dependencies: {plugin: 'latest'}}), fetchImpl,
        run: async () => { commands += 1; }, log: () => {},
      }), expected);
      assert.equal(commands, 0);
    });
  }
});

function installationHarness({name = 'npm', installFails = false, peersFail = false, staleAfterInstall = false} = {}) {
  const siteDir = path.resolve('/site');
  const versions = {'@docusaurus/core': '4.0.0', plugin: '2.0.0', devtool: '1.0.0', optionalPlugin: '1.0.0'};
  const installed = Object.fromEntries(Object.keys(versions).map(name => [name, '0.0.1']));
  const commands: {command: string; args: string[]; options: CommandOptions}[] = [];
  return {
    siteDir, versions, commands, installed,
    options: {
      manager: resolvePackageManager({env: {npm_config_user_agent: `${name}/12.0.0`}}),
      fetchImpl: registryResponse(versions), log: () => {},
      read: async (filename) => {
        if (filename === path.join(siteDir, 'package.json')) {
          return {
            name: 'tech-lib-site',
            dependencies: {'@docusaurus/core': 'latest', plugin: 'latest'},
            devDependencies: {devtool: 'latest'}, optionalDependencies: {optionalPlugin: 'latest'},
          };
        }
        const name = Object.keys(installed).find((dependency) => filename === path.join(siteDir, 'node_modules', dependency, 'package.json'));
        assert.ok(name, `Unexpected read: ${filename}`);
        return {version: installed[name]};
      },
      run: async (command, args, options = {}) => {
        commands.push({command, args, options});
        if (['install', 'update'].includes(args[0])) {
          if (installFails) throw new Error('install failed');
          if (name === 'pnpm' && peersFail) throw new Error('invalid peer dependency');
          if (!staleAfterInstall) Object.assign(installed, versions);
        }
        if (args[0] === 'ls' && peersFail) throw new Error('invalid peer dependency');
      },
    } satisfies RefreshOptions,
  };
}

test('every build refreshes an old installation using exact versions and no lockfile', async () => {
  const harness = installationHarness();
  assert.deepEqual(await refreshDependencies(harness.siteDir, harness.options), harness.versions);
  assert.deepEqual(harness.installed, harness.versions);
  assert.deepEqual(harness.commands.map(({args}) => args[0]), ['--version', 'install', 'ls']);
  const install = harness.commands[1];
  for (const argument of [
    '@docusaurus/core@4.0.0', 'plugin@2.0.0', '--no-save', '--package-lock=false',
    '--strict-peer-deps', '--legacy-peer-deps=false', '--engine-strict', '--include=dev',
  ]) assert.ok(install.args.includes(argument), `Missing ${argument}`);
  assert.deepEqual(harness.commands[2].args, ['ls', '--all']);
  assert.equal(harness.commands[2].options.capture, true);
  await refreshDependencies(harness.siteDir, harness.options);
  assert.equal(harness.commands.filter(({args}) => args[0] === 'install').length, 2);
});

test('installation failures stop before dependency verification', async () => {
  for (const name of ['npm', 'pnpm']) {
    const harness = installationHarness({name, installFails: true});
    await assert.rejects(refreshDependencies(harness.siteDir, harness.options), /install failed/);
    assert.deepEqual(harness.commands.map(({args}) => args[0]), ['--version', name === 'npm' ? 'install' : 'update']);
  }
});

test('stale installed versions and invalid peer trees stop the build', async () => {
  for (const name of ['npm', 'pnpm']) {
    const stale = installationHarness({name, staleAfterInstall: true});
    await assert.rejects(refreshDependencies(stale.siteDir, stale.options), /Expected @docusaurus\/core@4.0.0, but installed 0.0.1/);
    assert.equal(stale.commands.some(({args}) => args[0] === 'ls'), false);
    const peers = installationHarness({name, peersFail: true});
    await assert.rejects(refreshDependencies(peers.siteDir, peers.options), /invalid peer dependency/);
  }
});

test('a missing installed package is a hard failure', async () => {
  await assert.rejects(verifyInstalledVersions('/site', {plugin: '1.0.0'}, {
    read: async () => { throw new Error('ENOENT'); },
  }), /ENOENT/);
});

test('pnpm refreshes exact versions in all manifest sections without npm, including in production', async () => {
  const harness = installationHarness({name: 'pnpm'});
  const originalEnvironment = process.env.NODE_ENV;
  process.env.NODE_ENV = 'production';
  try {
    await refreshDependencies(harness.siteDir, harness.options);
    assert.equal(process.env.NODE_ENV, 'production');
    assert.deepEqual(harness.commands.map(({args}) => args[0]), ['--version', 'update']);
    assert.ok(harness.commands.every(({command}) => command === 'pnpm'));
    const update = harness.commands[1];
    const entries = Object.entries(harness.versions).sort(([a], [b]) => a.localeCompare(b));
    assert.deepEqual(update.args.slice(0, -1), ['update', ...entries.map(([name, version]) => `${name}@${version}`), '--no-save']);
    const overrideArgument = update.args.at(-1);
    assert.ok(overrideArgument);
    assert.ok(overrideArgument.startsWith('--config.overrides='));
    assert.deepEqual(JSON.parse(overrideArgument.slice('--config.overrides='.length)),
      Object.fromEntries(entries.map(([name, version]) => [`tech-lib-site>${name}`, version])));
    assert.ok(update.options.env);
    assert.equal(update.options.env.NODE_ENV, 'development');
    assert.deepEqual(harness.installed, harness.versions);
    await refreshDependencies(harness.siteDir, harness.options);
    assert.equal(harness.commands.filter(({args}) => args[0] === 'update').length, 2);
  } finally {
    if (originalEnvironment === undefined) delete process.env.NODE_ENV;
    else process.env.NODE_ENV = originalEnvironment;
  }
});

test('manager selection follows the leading user-agent token, with executable metadata and pnpm defaults', () => {
  assert.deepEqual(resolvePackageManager({env: {}, platform: 'linux'}), {name: 'pnpm', command: 'pnpm', argsPrefix: []});
  assert.equal(resolvePackageManager({env: {npm_config_user_agent: 'pnpm/12.9.1 npm/? node/? linux x64'}}).name, 'pnpm');
  assert.equal(resolvePackageManager({env: {npm_config_user_agent: 'npm/11.0.0 node/v24.0.0'}}).name, 'npm');
  assert.deepEqual(resolvePackageManager({env: {npm_execpath: '/opt/pnpm'}, platform: 'linux'}), {name: 'pnpm', command: '/opt/pnpm', argsPrefix: []});
  assert.deepEqual(resolvePackageManager({env: {npm_execpath: '/opt/npm/bin/npm-cli.js'}, node: '/opt/node'}), {
    name: 'npm', command: '/opt/node', argsPrefix: ['/opt/npm/bin/npm-cli.js'],
  });
  assert.deepEqual(resolvePackageManager({env: {npm_execpath: '/opt/corepack/pnpm.cjs'}, node: '/opt/node'}), {
    name: 'pnpm', command: '/opt/node', argsPrefix: ['/opt/corepack/pnpm.cjs'],
  });
  assert.deepEqual(resolvePackageManager({env: {npm_execpath: 'C:\\Program Files\\pnpm\\pnpm.exe'}, platform: 'win32'}), {
    name: 'pnpm', command: 'C:\\Program Files\\pnpm\\pnpm.exe', argsPrefix: [],
  });
  assert.equal(resolvePackageManager({env: {}, platform: 'win32'}).command, 'pnpm.exe');
  assert.throws(() => resolvePackageManager({env: {npm_config_user_agent: 'yarn/4.0.0'}}), /Unsupported package manager: yarn/);
  assert.throws(() => resolvePackageManager({env: {npm_execpath: '/bin/npm.cmd'}}), /without a shell/);
  assert.throws(() => resolvePackageManager({env: {npm_config_user_agent: 'npm/11', npm_execpath: '/bin/pnpm'}}), /disagree/);
});

test('an unavailable selected executable fails clearly without trying another manager', async () => {
  const siteDir = os.tmpdir();
  await assert.rejects(refreshDependencies(siteDir, {
    manager: {name: 'pnpm', command: path.join(os.tmpdir(), `missing-pnpm-${process.pid}`), argsPrefix: []},
    read: async filename => {
      assert.equal(filename, path.join(siteDir, 'package.json'));
      return {dependencies: {plugin: 'latest'}};
    },
    fetchImpl: registryResponse({plugin: '2.0.0'}), log: () => {},
  }), /Cannot run pnpm: the executable is unavailable/);
});

test('JavaScript launchers preserve literal arguments and child environment through paths with spaces', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'tech-lib launcher '));
  try {
    const executable = path.join(directory, 'pnpm.cjs');
    await writeFile(executable, 'console.log(JSON.stringify({args:process.argv.slice(2),env:process.env.NODE_ENV}))');
    const manager = resolvePackageManager({env: {npm_config_user_agent: 'pnpm/12', npm_execpath: executable}});
    const args = ['update', 'package name', '$(literal)', '--no-save'];
    const result = await runCommand(manager.command, [...manager.argsPrefix, ...args], {
      cwd: directory, capture: true, env: {...process.env, NODE_ENV: 'development'},
    });
    assert.deepEqual(JSON.parse(result.stdout), {args, env: 'development'});
  } finally {
    await rm(directory, {recursive: true, force: true});
  }
});

test('serve and preview forward arguments without invoking a dependency installer', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'tech-lib serve '));
  try {
    const scripts = path.join(directory, 'docusaurus', 'scripts');
    const core = path.join(directory, 'docusaurus', 'node_modules', '@docusaurus', 'core');
    const bins = path.join(directory, 'docusaurus', 'node_modules', '.bin');
    await Promise.all([mkdir(scripts, {recursive: true}), mkdir(core, {recursive: true}), mkdir(bins, {recursive: true})]);
    await Promise.all(['site.ts', 'dependencies.ts'].map(name =>
      copyFile(new URL(`../scripts/${name}`, import.meta.url), path.join(scripts, name))));
    await copyFile(new URL('../../preview.sh', import.meta.url), path.join(directory, 'preview.sh'));
    await writeFile(path.join(directory, 'docusaurus', 'package.json'), JSON.stringify({type: 'module'}));
    await writeFile(path.join(core, 'package.json'), JSON.stringify({bin: 'cli.mjs'}));
    const stub = 'console.log(JSON.stringify(process.argv.slice(2)))';
    await writeFile(path.join(core, 'cli.mjs'), stub);
    await writeFile(path.join(bins, 'docusaurus'), `#!/usr/bin/env node\n${stub}`, {mode: 0o755});
    const options = {cwd: directory, capture: true, env: {...process.env, npm_config_user_agent: 'unsupported/1'}};
    const served = await runCommand(process.execPath, [path.join(scripts, 'site.ts'), 'serve', '--port', '4174'], options);
    assert.deepEqual(JSON.parse(served.stdout), ['serve', '--port', '4174']);
    const previewed = await runCommand('bash', [path.join(directory, 'preview.sh'), '--port', '4175'], options);
    assert.deepEqual(JSON.parse(previewed.stdout), ['start', '--port', '4175']);
  } finally {
    await rm(directory, {recursive: true, force: true});
  }
});

test('typecheck resolves the installed compiler launcher and propagates compiler errors', async () => {
  const siteDir = path.resolve('/site');
  const compilerDir = path.join(siteDir, 'node_modules', 'typescript');
  const commands: {command: string; args: string[]; options?: CommandOptions}[] = [];
  for (const bin of [{tsc: 'bin/tsc'}, 'bin/tsc']) {
    await runTypecheck(siteDir, {
      read: async filename => {
        assert.equal(filename, path.join(compilerDir, 'package.json'));
        return {bin};
      },
      run: async (command, args, options) => { commands.push({command, args, options}); },
    });
  }
  assert.deepEqual(commands, Array.from({length: 2}, () => ({
    command: process.execPath, args: [path.join(compilerDir, 'bin/tsc'), '--noEmit'], options: {cwd: siteDir},
  })));
  const error = Object.assign(new Error('type error'), {exitCode: 2});
  await assert.rejects(runTypecheck(siteDir, {
    read: async () => ({bin: {tsc: 'bin/tsc'}}),
    run: async () => { throw error; },
  }), failure => failure === error);
  await assert.rejects(runTypecheck(siteDir, {read: async () => ({})}), /no compiler executable/);
});
