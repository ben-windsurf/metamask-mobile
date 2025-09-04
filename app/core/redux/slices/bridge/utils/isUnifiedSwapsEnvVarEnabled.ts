/**
 * Checks if the unified swaps feature is enabled via environment variable.
 *
 * @returns True if the MM_UNIFIED_SWAPS_ENABLED environment variable is set to 'true', false otherwise
 */
export const isUnifiedSwapsEnvVarEnabled = () =>
  process.env.MM_UNIFIED_SWAPS_ENABLED === 'true';
