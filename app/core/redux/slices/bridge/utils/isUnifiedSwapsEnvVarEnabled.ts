/**
 * Checks if the unified swaps feature is enabled via environment variable
 * Used to control the availability of unified swaps functionality in MetaMask Mobile
 * @returns {boolean} True if MM_UNIFIED_SWAPS_ENABLED environment variable is set to 'true'
 */
export const isUnifiedSwapsEnvVarEnabled = () =>
  process.env.MM_UNIFIED_SWAPS_ENABLED === 'true';
