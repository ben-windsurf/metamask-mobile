/**
 * Extracts all URL query parameters from a given URL string and returns them as an object
 * Used by SDKConnect to parse connection parameters and configuration from deep links
 * @param {string} url - The URL string to parse for query parameters
 * @returns {Record<string, string>} Object containing all query parameters as key-value pairs
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
