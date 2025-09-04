/**
 * Extracts all URL parameters from a given URL string and returns them as an object.
 *
 * @param url - The URL string to parse for parameters
 * @returns An object containing all URL parameters as key-value pairs
 *
 * @example
 * ```typescript
 * const params = getAllUrlParams('https://example.com?foo=bar&baz=qux');
 * // Returns: { foo: 'bar', baz: 'qux' }
 * ```
 */
export const getAllUrlParams = (url: string) => {
  const queryString = url.split('?')?.[1];
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const obj: any = {};
  if (queryString) {
    queryString.split('&').forEach((param: string) => {
      const [key, value] = param.split('=');
      obj[key] = value;
    });
  }
  return obj;
};

export default getAllUrlParams;
