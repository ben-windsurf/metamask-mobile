/**
 * Validates whether a string is a valid UUID (Universally Unique Identifier).
 * Checks against the standard UUID format: 8-4-4-4-12 hexadecimal digits.
 *
 * @param str - The string to validate as a UUID
 * @returns True if the string matches UUID format, false otherwise
 *
 * @example
 * ```typescript
 * isUUID('550e8400-e29b-41d4-a716-446655440000'); // true
 * isUUID('invalid-uuid'); // false
 * ```
 */
export const isUUID = (str: string) => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};
