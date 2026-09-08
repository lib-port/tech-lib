import assert from 'node:assert/strict';
import path from 'node:path';
import test from 'node:test';
import {
  dependencyNames,
  refreshDependencies,
  resolveLatestVersions,
  verifyInstalledVersions,
} from '../scripts/dependencies.mjs';

function registryResponse(versions, calls = []) {
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
  const calls = [];
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

test('network errors, HTTP errors, and invalid metadata never fall back to installed versions', async (t) => {
  for (const [name, fetchImpl, expected] of [
    ['network error', async () => { throw new Error('offline'); }, /Cannot resolve plugin@latest: offline/],
    ['HTTP error', async () => ({ok: false, status: 503}), /HTTP 503/],
    ['invalid metadata', registryResponse({plugin: 'latest'}), /invalid package metadata/],
  ]) {
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

function installationHarness({installFails = false, peersFail = false, staleAfterInstall = false} = {}) {
  const siteDir = path.resolve('/site');
  const versions = {'@docusaurus/core': '4.0.0', plugin: '2.0.0'};
  const installed = {'@docusaurus/core': '3.0.0', plugin: '1.0.0'};
  const commands = [];
  return {
    siteDir, versions, commands, installed,
    options: {
      fetchImpl: registryResponse(versions), log: () => {},
      read: async (filename) => {
        if (filename === path.join(siteDir, 'package.json')) {
          return {dependencies: Object.fromEntries(Object.keys(versions).map((name) => [name, 'latest']))};
        }
        const name = Object.keys(installed).find((dependency) => filename === path.join(siteDir, 'node_modules', dependency, 'package.json'));
        assert.ok(name, `Unexpected read: ${filename}`);
        return {version: installed[name]};
      },
      run: async (command, args, options) => {
        commands.push({command, args, options});
        if (args[0] === 'install') {
          if (installFails) throw new Error('install failed');
          if (!staleAfterInstall) Object.assign(installed, versions);
        }
        if (args[0] === 'ls' && peersFail) throw new Error('invalid peer dependency');
      },
    },
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
  const harness = installationHarness({installFails: true});
  await assert.rejects(refreshDependencies(harness.siteDir, harness.options), /install failed/);
  assert.deepEqual(harness.commands.map(({args}) => args[0]), ['--version', 'install']);
});

test('stale installed versions and invalid peer trees stop the build', async () => {
  const stale = installationHarness({staleAfterInstall: true});
  await assert.rejects(refreshDependencies(stale.siteDir, stale.options), /Expected @docusaurus\/core@4.0.0, but installed 3.0.0/);
  assert.equal(stale.commands.some(({args}) => args[0] === 'ls'), false);
  const peers = installationHarness({peersFail: true});
  await assert.rejects(refreshDependencies(peers.siteDir, peers.options), /invalid peer dependency/);
});

test('a missing installed package is a hard failure', async () => {
  await assert.rejects(verifyInstalledVersions('/site', {plugin: '1.0.0'}, {
    read: async () => { throw new Error('ENOENT'); },
  }), /ENOENT/);
});
