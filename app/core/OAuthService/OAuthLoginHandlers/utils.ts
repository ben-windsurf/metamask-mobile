/**
 * Converts a standard base64 string to URL-safe base64 format.
 * Replaces '+' with '-', '/' with '_', and removes padding '=' characters.
 *
 * @param base64String - The standard base64 string to convert
 * @returns The URL-safe base64 string
 */
export function toBase64UrlSafe(base64String: string): string {
  return base64String
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/[=]/g, '');
}

/**
 * Converts a URL-safe base64 string back to standard base64 format.
 * Replaces '-' with '+', '_' with '/', and adds proper padding with '=' characters.
 *
 * @param base64String - The URL-safe base64 string to convert
 * @returns The standard base64 string with proper padding
 */
export function fromBase64UrlSafe(base64String: string): string {
  return base64String
    .replace(/-/g, '+')
    .replace(/_/g, '/')
    .padEnd(base64String.length + ((4 - (base64String.length % 4)) % 4), '=');
}
