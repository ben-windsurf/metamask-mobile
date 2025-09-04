/**
 * Removes the protocol from a URL and returns the host and pathname.
 * If the URL is invalid or undefined, returns the original input.
 *
 * @param url - The URL string to strip the protocol from
 * @returns The URL without protocol (host + pathname), or the original input if invalid
 *
 * @example
 * ```typescript
 * stripProtocol('https://example.com/path') // Returns 'example.com/path'
 * stripProtocol('http://test.com/') // Returns 'test.com'
 * stripProtocol('invalid-url') // Returns 'invalid-url'
 * stripProtocol(undefined) // Returns undefined
 * ```
 */
const stripProtocol = (url: string | undefined) => {
  if (!url) {
    return url;
  }

  try {
    const parsedUrl = new URL(url);
    return `${parsedUrl.host}${
      parsedUrl.pathname === '/' ? '' : parsedUrl.pathname
    }`;
  } catch (error) {
    return url;
  }
};

export default stripProtocol;
