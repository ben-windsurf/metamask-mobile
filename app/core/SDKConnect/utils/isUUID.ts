/**
 * Validates whether a string is a valid UUID (Universally Unique Identifier)
 * Used in SDKConnect to validate session IDs and connection identifiers
 * @param {string} str - The string to validate as a UUID
 * @returns {boolean} True if the string matches UUID format, false otherwise
 */
export const isUUID = (str: string) => {
  const uuidRegex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(str);
};
