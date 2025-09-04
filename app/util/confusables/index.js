import { confusables } from 'unicode-confusables';
import { strings } from '../../../locales/i18n';
import confusablesMap from 'unicode-confusables/data/confusables.json';

/**
 * Collects confusable characters for a given ENS name.
 *
 * @param ensName - The ENS name to analyze for confusable characters
 * @returns Array of confusable character points found in the ENS name
 */
export const collectConfusables = (ensName) => {
  const key = 'similarTo';
  const collection = confusables(ensName).reduce(
    (total, current) => (key in current ? [...total, current.point] : total),
    [],
  );
  return collection;
};

/**
 * Set of zero-width Unicode characters that can be used maliciously in domain names.
 */
const zeroWidthPoints = new Set([
  '\u200b', // zero width space
  '\u200c', // zero width non-joiner
  '\u200d', // zero width joiner
  '\ufeff', // zero width no-break space
  '\u2028', // line separator
  '\u2029', // paragraph separator,
]);

/**
 * Checks if a character is a zero-width Unicode character.
 *
 * @param char - The character to check
 * @returns True if the character is a zero-width point, false otherwise
 */
export const hasZeroWidthPoints = (char) => zeroWidthPoints.has(char);

/**
 * Generates human-readable explanations for confusable characters.
 *
 * @param confusableCollection - Array of confusable character points
 * @returns Array of localized explanation strings for each confusable character
 */
export const getConfusablesExplanations = (confusableCollection) => [
  ...new Set(
    confusableCollection.map((key) => {
      const value = confusablesMap[key];
      return hasZeroWidthPoints(key)
        ? strings('transaction.contains_zero_width')
        : `'${key}' ${strings('transaction.similar_to')} '${value}'`;
    }),
  ),
];
