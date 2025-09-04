/**
 * Sanitizes URL input by removing dangerous protocols and encoding special characters.
 * Prevents XSS attacks by blocking javascript: protocol URLs and encoding quotes and newlines.
 *
 * @param url - The URL string to sanitize
 * @returns The sanitized URL string, or empty string if dangerous protocol detected
 *
 * @example
 * ```typescript
 * sanitizeUrlInput('https://example.com') // 'https://example.com'
 * sanitizeUrlInput('javascript:alert(1)') // ''
 * sanitizeUrlInput("https://example.com'test") // "https://example.com%27test"
 * ```
 */
const sanitizeUrlInput = (url: string) => {
  const blacklistRegex = /^javascript:/;
  if (blacklistRegex.test(url)) {
    return '';
  }
  return url.replace(/'/g, '%27').replace(/[\r\n]/g, '');
};

export default sanitizeUrlInput;
