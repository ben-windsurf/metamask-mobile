import { isValidMnemonic } from 'ethers/lib/utils';
import { wordlist } from '@metamask/scure-bip39/dist/wordlists/english';
import { strings } from '../../../../locales/i18n';

const hasUpperCase = (draftSrp: string) => draftSrp !== draftSrp.toLowerCase();

/**
 * Validates a Secret Recovery Phrase by checking if words exist in the BIP39 wordlist
 * Returns validation state with error message and array indicating invalid word positions
 * @param {string[]} phrase - Array of words from the Secret Recovery Phrase
 * @param {boolean[]} words - Array indicating which words are currently invalid
 * @returns {Object} Validation state with error string and words boolean array
 */
export const validateSRP = (phrase: string[], words: boolean[]) => {
  if (!phrase.some((word) => word !== '')) {
    return { error: '', words };
  }

  const state = {
    error: '',
    words: phrase.map((word) => !wordlist.includes(word)),
  };

  return state;
};

/**
 * Validates that all words in the Secret Recovery Phrase are filled in
 * Checks for empty strings in the phrase array and returns appropriate error
 * @param {Object} state - Current validation state with error and words array
 * @param {string[]} phrase - Array of words from the Secret Recovery Phrase
 * @returns {Object} Updated validation state with completeness error if applicable
 */
export const validateCompleteness = (
  state: { error: string; words: boolean[] },
  phrase: string[],
) => {
  if (state.error) {
    return state;
  }
  if (phrase.some((word) => word === '')) {
    return {
      ...state,
      error: strings(
        'import_new_secret_recovery_phrase.error_number_of_words_error_message',
      ),
    };
  }
  return state;
};

/**
 * Validates that the Secret Recovery Phrase contains only lowercase letters
 * BIP39 mnemonics are case-sensitive and should be lowercase only
 * @param {Object} state - Current validation state with error and words array
 * @param {string} phrase - The complete Secret Recovery Phrase as a string
 * @returns {Object} Updated validation state with case sensitivity error if applicable
 */
export const validateCase = (
  state: { error: string; words: boolean[] },
  phrase: string,
) => {
  if (state.error) {
    return state;
  }
  if (hasUpperCase(phrase)) {
    return {
      ...state,
      error: strings(
        'import_new_secret_recovery_phrase.error_srp_is_case_sensitive',
      ),
    };
  }
  return state;
};

/**
 * Validates individual words against the BIP39 wordlist and generates error messages
 * Creates user-friendly error messages indicating which word positions are invalid
 * @param {Object} state - Current validation state with error and words boolean array
 * @returns {Object} Updated validation state with specific word validation errors
 */
export const validateWords = (state: { error: string; words: boolean[] }) => {
  if (state.error) {
    return state;
  }

  const invalidWordIndices = state.words
    .map((invalid, index) => (invalid ? index + 1 : 0))
    .filter((index) => index !== 0);

  if (invalidWordIndices.length === 0) {
    return state;
  }
  if (invalidWordIndices.length === 1) {
    return {
      ...state,
      error: `${strings(
        'import_new_secret_recovery_phrase.error_srp_word_error_1',
      )}${invalidWordIndices[0]}${strings(
        'import_new_secret_recovery_phrase.error_srp_word_error_2',
      )}`,
    };
  }

  const lastIndex = invalidWordIndices.pop();
  const firstPart = invalidWordIndices.join(', ');
  return {
    ...state,
    error: `${strings(
      'import_new_secret_recovery_phrase.error_multiple_srp_word_error_1',
    )}${firstPart}${strings(
      'import_new_secret_recovery_phrase.error_multiple_srp_word_error_2',
    )}${lastIndex}${strings(
      'import_new_secret_recovery_phrase.error_multiple_srp_word_error_3',
    )}`,
  };
};

/**
 * Validates the complete Secret Recovery Phrase using BIP39 mnemonic validation
 * Performs final cryptographic validation to ensure the phrase is a valid mnemonic
 * @param {Object} state - Current validation state with error and words array
 * @param {string} phrase - The complete Secret Recovery Phrase as a string
 * @returns {Object} Updated validation state with mnemonic validity error if applicable
 */
export const validateMnemonic = (
  state: { error: string; words: boolean[] },
  phrase: string,
) => {
  if (state.error) {
    return state;
  }
  if (!isValidMnemonic(phrase)) {
    return {
      ...state,
      error: strings('import_new_secret_recovery_phrase.error_invalid_srp'),
    };
  }
  return state;
};
