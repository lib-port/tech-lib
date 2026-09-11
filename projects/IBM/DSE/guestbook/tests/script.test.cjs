const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const { test } = require('node:test');
const { runInNewContext } = require('node:vm');

const script = readFileSync(join(__dirname, '../public/script.js'), 'utf8');
const html = readFileSync(join(__dirname, '../public/index.html'), 'utf8');
const settle = () => new Promise((resolve) => setImmediate(resolve));
const saveError = 'Could not confirm whether your message was saved. Refresh the list before trying again.';

function createElement() {
  const classes = new Set();
  let textContent = '';
  return {
    value: '', disabled: false, hidden: false, children: [], listeners: {},
    get textContent() { return textContent; },
    set textContent(value) { textContent = String(value); },
    classList: {
      toggle(name, enabled) { enabled ? classes.add(name) : classes.delete(name); },
      contains(name) { return classes.has(name); },
    },
    addEventListener(event, handler) { this.listeners[event] = handler; },
    append(...children) { this.children.push(...children); },
    replaceChildren(...children) { this.children = children; },
    focus() {},
  };
}

function createUI() {
  const elements = Object.fromEntries(
    Array.from(html.matchAll(/\bid="([^"]+)"/g), (match) => ['#' + match[1], createElement()]),
  );
  const requests = [];
  runInNewContext(script, {
    document: {
      querySelector: (selector) => elements[selector] || null,
      createElement,
    },
    fetch: (url, options) => new Promise((resolve, reject) => {
      requests.push({ url, options, resolve, reject });
    }),
  });
  return {
    elements,
    requests,
    reply(index, body, status = 200) {
      requests[index].resolve({ ok: status >= 200 && status < 300, json: async () => body });
    },
    submit(message) {
      elements['#message'].value = message;
      return elements['#guestbook-form'].listeners.submit({ preventDefault() {} });
    },
    refresh() { return elements['#refresh-button'].listeners.click(); },
  };
}

async function loadedUI() {
  const ui = createUI();
  ui.reply(0, []);
  await settle();
  return ui;
}

for (const failure of ['network', 'unreadable JSON']) {
  test('an unconfirmed save preserves the draft and explains recovery: ' + failure, async () => {
    const ui = await loadedUI();
    const saving = ui.submit('Hello');
    if (failure === 'network') {
      ui.requests[1].reject(new TypeError('Failed to fetch'));
    } else {
      ui.requests[1].resolve({
        ok: true,
        json: async () => { throw new SyntaxError('Unexpected end of JSON input'); },
      });
    }
    await saving;

    assert.equal(ui.elements['#status'].textContent, saveError);
    assert.equal(ui.elements['#status'].classList.contains('error'), true);
    assert.equal(ui.elements['#message'].value, 'Hello');
    assert.equal(ui.elements['#submit-button'].disabled, false);
    assert.equal(ui.requests.filter((request) => request.options?.method === 'POST').length, 1);
  });
}

test('a server validation error remains specific', async () => {
  const ui = await loadedUI();
  const saving = ui.submit('Hello');
  ui.reply(1, { error: 'Enter a message between 1 and 280 characters.' }, 400);
  await saving;
  assert.equal(ui.elements['#status'].textContent, 'Enter a message between 1 and 280 characters.');
  assert.equal(ui.elements['#message'].value, 'Hello');
});

test('an error response without an explanation still warns about an uncertain save', async () => {
  const ui = await loadedUI();
  const saving = ui.submit('Hello');
  ui.reply(1, null, 500);
  await saving;
  assert.equal(ui.elements['#status'].textContent, saveError);
  assert.equal(ui.elements['#message'].value, 'Hello');
});

for (const order of ['refresh first', 'save first']) {
  for (const refreshFails of [false, true]) {
    test('an overlapping refresh preserves a save error: ' + order + ', refresh fails=' + refreshFails, async () => {
      const ui = await loadedUI();
      let refreshing;
      if (order === 'refresh first') refreshing = ui.refresh();
      const saving = ui.submit('Hello');
      if (order === 'save first') refreshing = ui.refresh();
      const postIndex = ui.requests.findIndex((request) => request.options?.method === 'POST');
      const refreshIndex = postIndex === 1 ? 2 : 1;
      ui.reply(postIndex, { error: saveError }, 500);
      await saving;
      assert.equal(ui.elements['#status'].textContent, saveError);

      if (refreshFails) {
        ui.reply(refreshIndex, { error: 'Store unavailable' }, 503);
      } else {
        ui.reply(refreshIndex, []);
      }
      await refreshing;
      assert.equal(ui.elements['#status'].textContent, saveError);
      assert.equal(ui.elements['#status'].classList.contains('error'), true);
      assert.equal(ui.elements['#load-status'].textContent, refreshFails
        ? 'Could not load messages. Please try Refresh.'
        : 'Messages refreshed.');
      assert.equal(ui.elements['#load-status'].classList.contains('error'), refreshFails);
      assert.equal(ui.elements['#refresh-button'].disabled, false);
    });
  }
}

test('an initial load failure cannot replace a save error', async () => {
  const ui = createUI();
  const saving = ui.submit('Hello');
  ui.reply(1, { error: saveError }, 500);
  await saving;
  ui.requests[0].reject(new TypeError('Failed to fetch'));
  await settle();
  assert.equal(ui.elements['#status'].textContent, saveError);
  assert.equal(ui.elements['#load-status'].classList.contains('error'), true);
  assert.equal(ui.elements['#empty-state'].textContent, 'Messages are unavailable right now.');
});

test('a saved message stays confirmed when the following list refresh fails', async () => {
  const ui = await loadedUI();
  const saving = ui.submit('Hello');
  ui.reply(1, { message: 'Hello' }, 201);
  await settle();
  ui.reply(2, { error: 'Store unavailable' }, 503);
  await saving;
  assert.equal(ui.elements['#status'].textContent, 'Thanks! Your message has been saved.');
  assert.equal(ui.elements['#status'].classList.contains('error'), false);
  assert.equal(ui.elements['#load-status'].textContent, 'Your message was saved, but the list could not refresh. Try Refresh.');
  assert.equal(ui.elements['#message'].value, '');
  assert.equal(ui.elements['#submit-button'].disabled, false);
});

test('saving preserves edits and a successful reload clears an earlier list error', async () => {
  const ui = createUI();
  ui.reply(0, {}, 503);
  await settle();
  const saving = ui.submit('First draft');
  ui.elements['#message'].value = 'Next draft';
  ui.reply(1, { message: 'First draft' }, 201);
  await settle();
  ui.reply(2, [{ message: 'First draft', created_at: '2026-09-11T00:00:00Z' }]);
  await saving;
  assert.equal(ui.elements['#message'].value, 'Next draft');
  assert.equal(ui.elements['#count'].textContent, '1');
  assert.equal(ui.elements['#load-status'].textContent, '');
  assert.equal(ui.elements['#load-status'].classList.contains('error'), false);
});

for (const oldRequestFails of [false, true]) {
  test('an old load cannot replace a newer list or status: fails=' + oldRequestFails, async () => {
    const ui = createUI();
    const refreshing = ui.refresh();
    const message = '<script>alert(1)</script>';
    ui.reply(1, [{ message, created_at: '2026-09-11T00:00:00Z' }]);
    await refreshing;
    if (oldRequestFails) {
      ui.requests[0].reject(new TypeError('Failed to fetch'));
    } else {
      ui.reply(0, []);
    }
    await settle();
    assert.equal(ui.elements['#count'].textContent, '1');
    assert.equal(ui.elements['#entries'].children[0].children[0].textContent, message);
    assert.equal(ui.elements['#load-status'].textContent, 'Messages refreshed.');
    assert.equal(ui.elements['#load-status'].classList.contains('error'), false);
  });
}
