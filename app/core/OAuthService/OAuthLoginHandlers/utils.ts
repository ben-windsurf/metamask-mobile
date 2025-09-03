/**
 * Converts a standard base64 string to URL-safe base64 format
 * Replaces URL-unsafe characters (+, /, =) with URL-safe alternatives (-, _, removed)
 * Used in OAuth flows where base64 data needs to be transmitted in URLs
 * @param {string} base64String - The standard base64 string to convert
 * @returns {string} The URL-safe base64 string
 */
export function toBase64UrlSafe(base64String: string): string {
  return base64String
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/[=]/g, '');
}

/**
 * Converts a URL-safe base64 string back to standard base64 format
 * Replaces URL-safe characters (-, _) with standard base64 characters (+, /)
 * and adds proper padding with '=' characters as needed
 * Used in OAuth flows to decode URL-safe base64 data received from external services
 * @param {string} base64String - The URL-safe base64 string to convert
 * @returns {string} The standard base64 string with proper padding
 */
export function fromBase64UrlSafe(base64String: string): string {
  return base64String
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(base64String.length + ((4 - (base64String.length % 4)) % 4), '=');
}
