/**
 * Storage key for the main vault backup in secure storage
 */
export const VAULT_BACKUP_KEY = 'VAULT_BACKUP';

/**
 * Storage key for temporary vault backup during backup operations
 */
export const VAULT_BACKUP_TEMP_KEY = 'VAULT_BACKUP_TEMP';

/**
 * Error message when temporary vault backup operation fails
 */
export const TEMP_VAULT_BACKUP_FAILED = 'Failed to backup temporary vault';

/**
 * Error message when vault backup operation fails
 */
export const VAULT_BACKUP_FAILED = 'Vault backup failed';

/**
 * Error message when vault retrieval from backup fails
 */
export const VAULT_FAILED_TO_GET_VAULT_FROM_BACKUP =
  'getVaultFromBackup failed to retrieve vault';
