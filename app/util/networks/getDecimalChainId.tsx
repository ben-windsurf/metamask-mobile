/**
 * Converts a hexadecimal chain ID to its decimal string representation.
 * If the input is not a valid hex string (doesn't start with '0x'), returns the input unchanged.
 *
 * @param id - The chain ID to convert, expected to be a hex string starting with '0x'
 * @returns The decimal string representation of the chain ID, or the original input if not a valid hex string
 *
 * @example
 * ```typescript
 * getDecimalChainId('0x1') // Returns '1'
 * getDecimalChainId('0xa') // Returns '10'
 * getDecimalChainId('invalid') // Returns 'invalid'
 * ```
 */
const getDecimalChainId = (id: string) => {
  if (!id || typeof id !== 'string' || !id.startsWith('0x')) {
    return id;
  }
  return parseInt(id, 16).toString(10);
};

export default getDecimalChainId;
