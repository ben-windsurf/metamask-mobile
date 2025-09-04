/**
 * Hides sensitive key information from URLs by removing the last path segment.
 * Useful for sanitizing URLs that may contain API keys or sensitive parameters.
 *
 * @param url - The URL string to sanitize, or undefined
 * @returns The sanitized URL with the last path segment removed, or the original value if undefined
 *
 * @example
 * ```typescript
 * hideKeyFromUrl('https://api.example.com/v1/secret-key') // 'https://api.example.com/v1'
 * hideKeyFromUrl('https://example.com') // 'https://example.com'
 * hideKeyFromUrl(undefined) // undefined
 * ```
 */
const hideKeyFromUrl = (url: string | undefined) => {
  if (!url) return url;

  // If the URL is just a hostname without a path, return it as is
  if (!url.includes('/')) return url;

  const regex = /^(https?:\/\/)(.*)$/;
  const match = url.match(regex);

  if (match) {
    const protocol = match[1];
    let restOfUrl = match[2];

    // Special case: handle URLs like 'test.test.com'
    if (!restOfUrl.includes('/')) {
      return protocol + restOfUrl;
    }

    // eslint-disable-next-line no-useless-escape
    restOfUrl = restOfUrl.replace(/\/[^\/]*$/, '');
    return protocol + restOfUrl;
  }

  return url?.substring(0, url.lastIndexOf('/'));
};

export default hideKeyFromUrl;
