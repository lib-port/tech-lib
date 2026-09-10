import assert from 'node:assert/strict';
import test from 'node:test';
import {homepageActiveRegex} from '../lib/site-urls.mjs';

for (const baseUrl of ['/tech-lib/', '/', '/preview.v2+docs(1)[test]/']) {
  test('homepage active matching is exact for ' + baseUrl, () => {
    const matches = new RegExp(homepageActiveRegex(baseUrl));
    assert.equal(matches.test(baseUrl), true);
    assert.equal(matches.test(baseUrl + 'notes/'), false);
    assert.equal(matches.test('/elsewhere' + baseUrl), false);
    assert.equal(matches.test(baseUrl.slice(0, -1)), false);
  });
}

test('regex punctuation in the base URL is literal', () => {
  const matches = new RegExp(homepageActiveRegex('/preview.v2/'));
  assert.equal(matches.test('/preview.v2/'), true);
  assert.equal(matches.test('/preview-v2/'), false);
});
