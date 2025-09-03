import { confusables } from 'unicode-confusables';
import { strings } from '../../../locales/i18n';
import confusablesMap from 'unicode-confusables/data/confusables.json';

/**
 * Collects confusable characters from an ENS name
 * @param {string} ensName - The ENS name to analyze for confusable characters
 * @returns {Array} Array of confusable character points found in the ENS name
 */
export const collectConfusables = (ensName) => {
  const key = 'similarTo';
  const collection = confusables(ensName).reduce(
    (total, current) => (key in current ? [...total, current.point] : total),
    [],
  );
  return collection;
};

const zeroWidthPoints = new Set([
  '\u200b', // zero width space
  '\u200c', // zero width non-joiner
  '\u200d', // zero width joiner
  '\ufeff', // zero width no-break space
  '\u2028', // line separator
  '\u2029', // paragraph separator,
]);

/**
 * Checks if a character is a zero-width character
 * @param {string} char - The character to check
 * @returns {boolean} True if the character is a zero-width character, false otherwise
 */
export const hasZeroWidthPoints = (char) => zeroWidthPoints.has(char);

/**
 * Generates human-readable explanations for confusable characters
 * @param {Array} confusableCollection - Array of confusable character points
 * @returns {Array} Array of localized explanation strings for the confusable characters
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
