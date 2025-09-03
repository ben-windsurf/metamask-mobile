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
 * Removes multiple consecutive newlines from a string, replacing them with single newlines
 * @param {string | unknown} str - The string to process
 * @returns {string | unknown} The string with multiple newlines stripped, or original value if not a string
 */
export const stripMultipleNewlines = (
  str: string | unknown,
): string | unknown => {
  if (!str || typeof str !== 'string') {
    return str;
  }
  return str.replace(/\n+/g, '\n');
};

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

const SOLIDITY_TYPES = solidityTypes();

/**
 * Removes array type notation from a Solidity type string
 * @param {string} potentialArrayType - The type string that may contain array notation
 * @returns {string} The type string with array notation removed
 */
export const stripArrayType = (potentialArrayType: string) =>
  potentialArrayType.replace(/\[[[0-9]*\]*/gu, '');

/**
 * Removes one layer of array nesting from a Solidity type string
 * @param {string} potentialArrayType - The type string that may contain array notation
 * @returns {string} The type string with one layer of array nesting removed
 */
export const stripOneLayerofNesting = (potentialArrayType: string) =>
  potentialArrayType.replace(/\[(\d*)\]/u, '');

/**
 * Checks if a type string represents an array type in Solidity
 * @param {string} potentialArrayType - The type string to check
 * @returns {boolean} True if the type string contains array notation, false otherwise
 */
export const isArrayType = (potentialArrayType: string) =>
  potentialArrayType.match(/\[[[0-9]*\]*/u) !== null;

/**
 * Checks if a given type string is a valid Solidity type
 * @param {string} type - The type string to validate
 * @returns {boolean} True if the type is a valid Solidity type, false otherwise
 */
export const isSolidityType = (type: string) => SOLIDITY_TYPES.includes(type);

/**
 * Formats a multi-line seed phrase into a single line with space-separated words
 * @param {string} seedPhrase - The seed phrase that may contain newlines
 * @returns {string} The seed phrase formatted as a single line with spaces
 */
export const formatSeedPhraseToSingleLine = (seedPhrase: string) =>
  seedPhrase
    .split('\n')
    .map((item) => item)
    .join(' ');
