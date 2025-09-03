/**
 * Removes trailing slash from a URL string
 * @param {string | undefined} url - The URL to sanitize
 * @returns {string | undefined} The URL without trailing slash, or undefined if input is undefined
 */
const sanitizeUrl = (url: string | undefined) => url?.replace(/\/$/, '');

export default sanitizeUrl;

/**
 * Compares two URLs after sanitizing them (removing trailing slashes)
 * @param {string} urlOne - The first URL to compare
 * @param {string} urlTwo - The second URL to compare
 * @returns {boolean} True if the sanitized URLs are equal, false otherwise
 */
export const compareSanitizedUrl = (urlOne: string, urlTwo: string) =>
  sanitizeUrl(urlOne) === sanitizeUrl(urlTwo);
