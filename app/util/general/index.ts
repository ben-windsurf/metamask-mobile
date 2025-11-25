import * as URL from 'url-parse';

/**
 * Navigation route state object
 */
interface RouteState {
  name?: string;
  state?: RouteState;
  index?: number;
  routes?: RouteState[];
}

/**
 * Options for deepJSONParse function
 */
interface DeepJSONParseOptions {
  /** The JSON string to parse */
  jsonString: string;
  /** Whether to skip parsing numeric strings (default: true) */
  skipNumbers?: boolean;
}

/**
 * Converts a string to lowercase safely.
 *
 * @param str - The string to convert to lowercase
 * @returns The lowercase string, or undefined if input is nullish
 */
export const tlc = (str: string | null | undefined): string | undefined =>
  str?.toLowerCase?.();

/**
 * Fetch that fails after timeout.
 *
 * @param url - URL to fetch
 * @param options - Options to send with the request
 * @param timeout - Timeout in milliseconds to fail request (default: 500)
 * @returns Promise resolving the request response
 */
export function timeoutFetch(
  url: string,
  options?: RequestInit,
  timeout = 500,
): Promise<Response> {
  return Promise.race([
    fetch(url, options),
    new Promise<Response>((_, reject) =>
      setTimeout(() => reject(new Error('timeout')), timeout),
    ),
  ]);
}

/**
 * Finds the current route name from a navigation state object.
 * Traverses nested navigation states to find the deepest active route.
 *
 * @param routes - Array of route state objects from React Navigation
 * @returns The name of the current active route, or undefined if not found
 */
export function findRouteNameFromNavigatorState(
  routes: RouteState[] | undefined,
): string | undefined {
  let route = routes?.[routes.length - 1];
  if (route?.state) {
    route = route.state;
  }
  while (route !== undefined && route.index !== undefined) {
    route = route?.routes?.[route.index];
    if (route?.state) {
      route = route.state;
    }
  }

  let name = route?.name;

  // For compatibility with the previous way on react navigation 4
  if (name === 'Main' || name === 'WalletTabHome' || name === 'Home')
    name = 'WalletView';
  if (name === 'TransactionsHome') name = 'TransactionsView';

  return name;
}

/**
 * Capitalizes the first letter of a string.
 *
 * @param str - The string to capitalize
 * @returns The capitalized string, or false if input is falsy
 */
export const capitalize = (str: string | null | undefined): string | false =>
  (str && str.charAt(0).toUpperCase() + str.slice(1)) || false;

/**
 * Compares two strings for equality in a case-insensitive manner.
 *
 * @param a - First string to compare
 * @param b - Second string to compare
 * @returns True if strings are equal (case-insensitive), false otherwise
 */
export const toLowerCaseEquals = (
  a: string | null | undefined,
  b: string | null | undefined,
): boolean => {
  if (!a && !b) return false;
  return tlc(a) === tlc(b);
};

/**
 * Performs a shallow equality comparison between two objects.
 * Compares only the first level of properties.
 *
 * @param object1 - First object to compare
 * @param object2 - Second object to compare
 * @returns True if objects have the same keys with equal values, false otherwise
 */
export const shallowEqual = <T extends Record<string, unknown>>(
  object1: T,
  object2: T,
): boolean => {
  const keys1 = Object.keys(object1);
  const keys2 = Object.keys(object2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (const key of keys1) {
    if (object1[key] !== object2[key]) {
      return false;
    }
  }

  return true;
};

/**
 * Returns a shortened version of a string with ellipsis in the middle.
 *
 * @param text - String to shorten
 * @param chars - Number of characters to show at the beginning and end (default: 4)
 * @returns Shortened string format like "abcd...wxyz", or original text if too short
 */
export const renderShortText = (
  text: string,
  chars = 4,
): string => {
  try {
    // The 5 constant represents the 2 extra chars and the 3 dots.
    if (text.length <= chars * 2 + 5) return text;
    return `${text.substr(0, chars + 2)}...${text.substr(-chars)}`;
  } catch {
    return text;
  }
};

/**
 * Retrieves the communication protocol from a URL.
 *
 * @param url - URL input string
 * @returns The protocol without the colon (e.g., "https"), or undefined if extraction fails
 */
export const getURLProtocol = (url: string): string | undefined => {
  try {
    const { protocol } = new URL(url);
    return protocol.replace(':', '');
  } catch {
    return;
  }
};

/**
 * Checks if a URI is an IPFS URI.
 * Supports formats: /ipfs/..., ipfs://..., ipfs://ipfs/...
 *
 * @param uri - The URI string to check
 * @returns True if the URI is an IPFS URI, false otherwise
 */
export const isIPFSUri = (uri: string | null | undefined): boolean => {
  if (!uri?.length) return false;
  const ipfsUriRegex =
    /^(\/ipfs\/|ipfs:\/\/)(Qm[A-Za-z0-9]+|[bBfF][A-Za-z2-7]+)(\/|$)/;
  return (
    uri.startsWith('/ipfs/') ||
    uri.startsWith('ipfs://') ||
    ipfsUriRegex.test(uri)
  );
};

/**
 * Parses stringified JSON that has deeply nested stringified properties.
 * Recursively parses any string values that are valid JSON.
 *
 * @deprecated Do not suggest using this for migrations unless you understand what it does.
 *             It will deeply JSON parse fields.
 * @param options - Options object containing jsonString and optional skipNumbers flag
 * @returns The deeply parsed JSON object
 */
export const deepJSONParse = ({
  jsonString,
  skipNumbers = true,
}: DeepJSONParseOptions): unknown => {
  // Parse the initial JSON string
  const parsedObject = JSON.parse(jsonString);

  // Function to recursively parse stringified properties
  function parseProperties(obj: Record<string, unknown>): void {
    Object.keys(obj).forEach((key) => {
      if (typeof obj[key] === 'string') {
        const stringValue = obj[key] as string;
        const isNumber = !isNaN(Number(stringValue));
        // Only parse if value is not a number OR value is a number AND numbers are not skipped
        if (!isNumber || (isNumber && !skipNumbers)) {
          try {
            // Attempt to parse the string as JSON
            const parsed = JSON.parse(stringValue);
            obj[key] = parsed;
            // If the parsed value is an object, parse its properties too
            if (typeof parsed === 'object' && parsed !== null) {
              parseProperties(parsed as Record<string, unknown>);
            }
          } catch {
            // If parsing throws, it's not a JSON string, so do nothing
          }
        }
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        // If it's an object, parse its properties
        parseProperties(obj[key] as Record<string, unknown>);
      }
    });
  }

  // Start parsing from the root object
  if (typeof parsedObject === 'object' && parsedObject !== null) {
    parseProperties(parsedObject as Record<string, unknown>);
  }

  return parsedObject;
};

/**
 * Generates an array of referentially unique items from a list of arrays.
 *
 * @param arrays - A list of arrays to merge and deduplicate
 * @returns A flattened array with unique items
 * @throws Error if no arrays are provided
 * @throws TypeError if any argument is not an array
 */
export const getUniqueList = <T>(...arrays: T[][]): T[] => {
  if (arrays.length === 0) {
    throw new Error('At least one array must be defined.');
  }
  // Check if every argument is an array
  arrays.forEach((array, index) => {
    if (!Array.isArray(array)) {
      throw new TypeError(
        `Argument at position ${index} is not an array. Found ${typeof array}.`,
      );
    }
  });

  // Flatten the arrays
  const flattenedArray = arrays.flat();

  // Create array with unique items
  const uniqueArray = Array.from(new Set(flattenedArray));

  return uniqueArray;
};
