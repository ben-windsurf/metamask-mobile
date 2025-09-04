/**
 * Removes the protocol (http://, https://, etc.) from a URL string.
 *
 * @param url - The URL string to process, or undefined
 * @returns The URL without the protocol, or the original input if invalid or undefined
 *
 * @example
 * ```typescript
 * hideProtocolFromUrl('https://example.com/path') // Returns 'example.com/path'
 * hideProtocolFromUrl('http://localhost:3000') // Returns 'localhost:3000'
 * hideProtocolFromUrl(undefined) // Returns undefined
 * hideProtocolFromUrl('invalid-url') // Returns 'invalid-url'
 * ```
 */
const hideProtocolFromUrl = (url: string | undefined) => {
  if (!url) return url;

  try {
    // Use the URL constructor to parse the URL
    const parsedUrl = new URL(url);

    // If the pathname is just '/', exclude it from the result
    const pathname = parsedUrl.pathname === '/' ? '' : parsedUrl.pathname;

    // Return the URL without the protocol
    return parsedUrl.host + pathname + parsedUrl.search + parsedUrl.hash;
  } catch (error) {
    // If the URL constructor throws an error, return the original URL
    // This might happen if the input is not a valid URL
    return url;
  }
};

export default hideProtocolFromUrl;
