/**
 * Interface defining the input field selectors for the AES crypto form.
 * Contains test selectors for all input elements used in AES encryption/decryption testing.
 */
export interface AesCryptoFormInputs {
  /** Selector for salt bytes count input field */
  saltBytesCountInput: string;
  /** Selector for password input field */
  passwordInput: string;
  /** Selector for salt input field used in encryption key generation */
  saltInputForEncryptionKey: string;
  /** Selector for data input field used in encryption */
  dataInputForEncryption: string;
  /** Selector for password input field used in encryption */
  passwordInputForEncryption: string;
  /** Selector for password input field used in decryption */
  passwordInputForDecryption: string;
  /** Selector for encryption key input field used in key-based encryption */
  encryptionKeyInputForEncryptionWithKey: string;
  /** Selector for data input field used in key-based encryption */
  dataInputForEncryptionWithKey: string;
  /** Selector for encryption key input field used in key-based decryption */
  encryptionKeyInputForDecryptionWithKey: string;
}

/**
 * Interface defining the response field selectors for the AES crypto form.
 * Contains test selectors for all response elements that display operation results.
 */
export interface AesCryptoFormResponses {
  /** Selector for salt generation response display */
  saltResponse: string;
  /** Selector for encryption key generation response display */
  generateEncryptionKeyResponse: string;
  /** Selector for encryption operation response display */
  encryptionResponse: string;
  /** Selector for decryption operation response display */
  decryptionResponse: string;
  /** Selector for key-based encryption operation response display */
  encryptionWithKeyResponse: string;
  /** Selector for key-based decryption operation response display */
  decryptionWithKeyResponse: string;
}

/**
 * Interface defining the button selectors for the AES crypto form.
 * Contains test selectors for all action buttons used in AES encryption/decryption operations.
 */
export interface AesCryptoFormButtons {
  /** Selector for salt generation button */
  generateSaltButton: string;
  /** Selector for encryption key generation button */
  generateEncryptionKeyButton: string;
  /** Selector for encryption operation button */
  encryptButton: string;
  /** Selector for decryption operation button */
  decryptButton: string;
  /** Selector for key-based encryption operation button */
  encryptWithKeyButton: string;
  /** Selector for key-based decryption operation button */
  decryptWithKeyButton: string;
}

/**
 * Test selectors for AES crypto form input fields.
 * Maps input field types to their corresponding test-id selectors for E2E testing.
 */
export const aesCryptoFormInputs: AesCryptoFormInputs = {
  saltBytesCountInput: 'salt-bytes-count-input',
  passwordInput: 'password-input',
  saltInputForEncryptionKey: 'salt-input-for-encryption-key',
  dataInputForEncryption: 'data-input-for-encryption',
  passwordInputForEncryption: 'password-input-for-encryption',
  passwordInputForDecryption: 'password-input-for-decryption',
  encryptionKeyInputForEncryptionWithKey:
    'encryption-key-input-for-encryption-with-key',
  dataInputForEncryptionWithKey: 'data-input-for-encryption-with-key',
  encryptionKeyInputForDecryptionWithKey:
    'encryption-key-input-for-decryption-with-key',
};

/**
 * Test selectors for AES crypto form response fields.
 * Maps response field types to their corresponding test-id selectors for E2E testing.
 */
export const aesCryptoFormResponses: AesCryptoFormResponses = {
  saltResponse: 'salt-response',
  generateEncryptionKeyResponse: 'generate-encryption-key-response',
  encryptionResponse: 'encryption-response',
  decryptionResponse: 'decryption-response',
  encryptionWithKeyResponse: 'encryption-with-key-response',
  decryptionWithKeyResponse: 'decryption-with-key-response',
};

export const aesCryptoFormButtons: AesCryptoFormButtons = {
  generateSaltButton: 'generate-salt-button',
  generateEncryptionKeyButton: 'generate-encryption-key-button',
  encryptButton: 'encrypt-button',
  decryptButton: 'decrypt-button',
  encryptWithKeyButton: 'encrypt-with-key-button',
  decryptWithKeyButton: 'decrypt-with-key-button',
};

export const aesCryptoFormScrollIdentifier: string = 'aes-crypto-form-scroll';
export const accountAddress: string = 'account-address';
export const responseText: string = 'response-text';
