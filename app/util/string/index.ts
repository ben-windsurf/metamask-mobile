import { isString } from '../lodash';

/**
 * The method escapes left-to-right (LTR) and right-to-left (RTL) unicode characters in the string
 *
 * @param {string} str
 * @returns {(string|*)} escaped string or original param value
 */
export const escapeSpecialUnicode = (str: string): string => {
  if (!str) {
    return str;
  }
  if (!isString(str)) {
    return str;
  }

  // Ref: https://stackoverflow.com/questions/69297024/why-is-string-replaceall-not-a-function-on-android-react-native
  return str.split('\u202D').join('\\u202D').split('\u202E').join('\\u202E');
};

/**
 * Removes multiple consecutive newlines from a string, replacing them with single newlines.
 *
 * @param str - The string to process, or any other value
 * @returns The processed string with single newlines, or the original value if not a string
 */
export const stripMultipleNewlines = (
  str: string | unknown,
): string | unknown => {
  if (!str || typeof str !== 'string') {
    return str;
  }
  return str.replace(/\n+/g, '\n');
};

/**
 * Generates a comprehensive list of all valid Solidity data types.
 * Includes basic types, sized integers, bytes, and fixed-point numbers.
 *
 * @returns Array of all valid Solidity type strings
 */
const solidityTypes = () => {
  const types = [
    'bool',
    'address',
    'string',
    'bytes',
    'int',
    'uint',
    'fixed',
    'ufixed',
  ];

  const ints = Array.from(new Array(32)).map(
    (_, index) => `int${(index + 1) * 8}`,
  );
  const uints = Array.from(new Array(32)).map(
    (_, index) => `uint${(index + 1) * 8}`,
  );
  const bytes = Array.from(new Array(32)).map(
    (_, index) => `bytes${index + 1}`,
  );

  const fixedM = Array.from(new Array(32)).map(
    (_, index) => `fixed${(index + 1) * 8}`,
  );
  const ufixedM = Array.from(new Array(32)).map(
    (_, index) => `ufixed${(index + 1) * 8}`,
  );
  const fixed = Array.from(new Array(80)).map((_, index) =>
    fixedM.map((aFixedM) => `${aFixedM}x${index + 1}`),
  );
  const ufixed = Array.from(new Array(80)).map((_, index) =>
    ufixedM.map((auFixedM) => `${auFixedM}x${index + 1}`),
  );

  return [
    ...types,
    ...ints,
    ...uints,
    ...bytes,
    ...fixed.flat(),
    ...ufixed.flat(),
  ];
};

/**
 * Cached array of all valid Solidity data types for efficient type checking.
 */
const SOLIDITY_TYPES = solidityTypes();

/**
 * Removes array notation from a Solidity type string.
 *
 * @param potentialArrayType - The type string that may contain array notation
 * @returns The base type without array brackets
 * @example
 * stripArrayType('uint256[]') // returns 'uint256'
 * stripArrayType('bytes32[5]') // returns 'bytes32'
 */
export const stripArrayType = (potentialArrayType: string) =>
  potentialArrayType.replace(/\[[[0-9]*\]*/gu, '');

/**
 * Removes one layer of array nesting from a Solidity type string.
 *
 * @param potentialArrayType - The type string that may contain nested array notation
 * @returns The type with one layer of array brackets removed
 * @example
 * stripOneLayerofNesting('uint256[][]') // returns 'uint256[]'
 * stripOneLayerofNesting('bytes32[5]') // returns 'bytes32'
 */
export const stripOneLayerofNesting = (potentialArrayType: string) =>
  potentialArrayType.replace(/\[(\d*)\]/u, '');

/**
 * Checks if a Solidity type string represents an array type.
 *
 * @param potentialArrayType - The type string to check
 * @returns True if the type contains array notation, false otherwise
 * @example
 * isArrayType('uint256[]') // returns true
 * isArrayType('bytes32[5]') // returns true
 * isArrayType('address') // returns false
 */
export const isArrayType = (potentialArrayType: string) =>
  potentialArrayType.match(/\[[[0-9]*\]*/u) !== null;

/**
 * Checks if a given string is a valid Solidity data type.
 *
 * @param type - The type string to validate
 * @returns True if the type is a valid Solidity type, false otherwise
 * @example
 * isSolidityType('uint256') // returns true
 * isSolidityType('address') // returns true
 * isSolidityType('invalidType') // returns false
 */
export const isSolidityType = (type: string) => SOLIDITY_TYPES.includes(type);

export const formatSeedPhraseToSingleLine = (seedPhrase: string) =>
  seedPhrase
    .split('\n')
    .map((item) => item)
    .join(' ');
