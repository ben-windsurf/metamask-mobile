const dummyProtocol = 'dummy:';

/**
 * Parses a ramp path string to extract pathname segments and URL parameters
 * Used for processing deeplink URLs in the ramp aggregator flow
 * @param {string} rampPath - The ramp path string to parse
 * @returns {readonly [string[], object | undefined]} Tuple containing array of path segments and parsed URL parameters
 */
export default function getRedirectPathsAndParams(rampPath: string) {
  let pathnames: string[] = [];
  let params;
  try {
    const urlObject = new URL(`${dummyProtocol}${rampPath}`);
    pathnames = `${urlObject.hostname}${urlObject.pathname}`
      .split('/')
      .filter(Boolean);
    if (urlObject.search) {
      params = Object.fromEntries(urlObject.searchParams);
    }

    return [pathnames, params] as const;
  } catch (error) {
    return [pathnames, params] as const;
  }
}
