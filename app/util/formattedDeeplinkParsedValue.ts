/**
 * Formats a deeplink parsed value by converting it to a number and formatting it as a locale string without grouping.
 *
 * @param value - The string value to be formatted
 * @returns The formatted value as a string without grouping separators
 */
const formattedDeeplinkParsedValue = (value: string) => {
  const resolvedValue = Number(value).toLocaleString(undefined, {
    useGrouping: false,
  });
  return resolvedValue;
};

export default formattedDeeplinkParsedValue;
