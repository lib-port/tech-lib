/** Match the homepage pathname using the configured, slash-terminated base URL. */
export function homepageActiveRegex(baseUrl: string) {
  return '^' + baseUrl.replace(/[.*+?$^{}()|[\]\\]/g, '\\$&') + '$';
}
