// The original Guestbook used jQuery. This version uses the browser's fetch API.
const form = document.querySelector('#guestbook-form');
const messageInput = document.querySelector('#message');
const submitButton = document.querySelector('#submit-button');
const refreshButton = document.querySelector('#refresh-button');
const entriesList = document.querySelector('#entries');
const status = document.querySelector('#status');
const emptyState = document.querySelector('#empty-state');
const count = document.querySelector('#count');
let latestLoadRequest = 0;

function showStatus(message, isError = false) {
  status.textContent = message;
  status.classList.toggle('error', isError);
}

async function loadEntries() {
  const request = ++latestLoadRequest;
  let entries;
  try {
    const response = await fetch('/api/entries');
    if (!response.ok) throw new Error('Could not load messages. Please try Refresh.');
    entries = await response.json();
  } catch (error) {
    if (request !== latestLoadRequest) return false;
    throw error;
  }
  // An older request must not replace a newer list or its status message.
  if (request !== latestLoadRequest) return false;
  entriesList.replaceChildren();
  count.textContent = entries.length;
  emptyState.hidden = entries.length > 0;
  emptyState.textContent = 'No messages yet. Be the first to sign the guestbook.';

  // Show the most recent entry first. textContent treats messages as text, not HTML.
  for (const entry of entries.slice().reverse()) {
    const item = document.createElement('li');
    const text = document.createElement('p');
    const time = document.createElement('time');
    text.textContent = entry.message;
    time.dateTime = entry.created_at;
    time.textContent = new Date(entry.created_at).toLocaleString();
    item.append(text, time);
    entriesList.append(item);
  }
  return true;
}

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const originalMessage = messageInput.value;
  const message = originalMessage.trim();
  if (!message || Array.from(message).length > 280) {
    showStatus('Enter a message between 1 and 280 characters.', true);
    return;
  }
  submitButton.disabled = true;
  showStatus('Saving your message...');
  try {
    const response = await fetch('/api/entries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message }),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Could not save your message.');
    // Keep any edits made while the message was being saved.
    if (messageInput.value === originalMessage) messageInput.value = '';
    showStatus('Thanks! Your message has been saved.');
    try {
      await loadEntries();
    } catch {
      showStatus('Your message was saved, but the list could not refresh. Try Refresh.', true);
    }
    messageInput.focus();
  } catch (error) {
    showStatus(error.message || 'Could not reach the guestbook. Please try again.', true);
  } finally {
    submitButton.disabled = false;
  }
});

refreshButton.addEventListener('click', async () => {
  refreshButton.disabled = true;
  try {
    if (await loadEntries()) showStatus('Messages refreshed.');
  } catch (error) {
    showStatus(error.message, true);
  } finally {
    refreshButton.disabled = false;
  }
});

loadEntries().catch((error) => {
  emptyState.textContent = 'Messages are unavailable right now.';
  showStatus(error.message, true);
});
