/** Match the homepage pathname using the configured, slash-terminated base URL. */
export function homepageActiveRegex(baseUrl) {
  return '^' + baseUrl.replace(/[.*+?$^{}()|[\]\\]/g, '\\$&') + '$';
}
