import { ethers } from 'ethers';
import { Encryptor, LEGACY_DERIVATION_OPTIONS } from '../../core/Encryptor';
import { regex } from '../regex';

/**
 * Validates if a seed phrase meets the required format requirements
 * @param {string} seed - The seed phrase to validate
 * @returns {boolean} True if the seed phrase fails requirements, false if it passes
 */
export const failedSeedPhraseRequirements = (seed: string): boolean => {
  const wordCount = seed.split(/\s/u).length;
  return wordCount % 3 !== 0 || wordCount > 24 || wordCount < 12;
};

/**
 * This method validates and decrypts a raw vault. Only works with iOS/Android vaults!
 * The extension uses different cryptography for the vault.
 * @param {string} password - users password related to vault
 * @param {string} vault - exported from ios/android filesystem
 * @returns seed phrase from vault
 */
export const parseVaultValue = async (
  password: string,
  vault: string,
): Promise<string | undefined> => {
  let vaultSeed: string | undefined;

  if (vault[0] === '{' && vault[vault.length - 1] === '}')
    try {
      const seedObject = JSON.parse(vault);
      if (
        seedObject?.cipher &&
        seedObject?.salt &&
        seedObject?.iv &&
        seedObject?.lib
      ) {
        const encryptor = new Encryptor({
          keyDerivationOptions: LEGACY_DERIVATION_OPTIONS,
        });
        const result = (await encryptor.decrypt(password, vault)) as {
          data?: { mnemonic?: string };
        }[];
        vaultSeed = result[0]?.data?.mnemonic;
      }
    } catch (error) {
      //No-op
    }
  return vaultSeed;
};

/**
 * Parses and normalizes a seed phrase by trimming, lowercasing, and validating format
 * @param {string} seedPhrase - The raw seed phrase to parse
 * @returns {string} The normalized seed phrase or empty string if invalid
 */
export const parseSeedPhrase = (seedPhrase: string): string =>
  (seedPhrase || '').trim().toLowerCase().match(regex.seedPhrase)?.join(' ') ||
  '';

/**
 * Validates if a mnemonic phrase is valid according to BIP39 standards
 * Re-exported from ethers.utils for convenience
 */
export const { isValidMnemonic } = ethers.utils;
