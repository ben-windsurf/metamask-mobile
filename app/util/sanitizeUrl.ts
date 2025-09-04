/**
 * Removes trailing slash from a URL string.
 *
 * @param url - The URL string to sanitize, can be undefined
 * @returns The sanitized URL without trailing slash, or undefined if input is undefined
 */
const sanitizeUrl = (url: string | undefined) => url?.replace(/\/$/, '');

export default sanitizeUrl;

/**
 * Compares two URLs after sanitizing them by removing trailing slashes.
 *
 * @param urlOne - First URL to compare
 * @param urlTwo - Second URL to compare
 * @returns True if the sanitized URLs are equal, false otherwise
 */
export const compareSanitizedUrl = (urlOne: string, urlTwo: string) =>
  sanitizeUrl(urlOne) === sanitizeUrl(urlTwo);
