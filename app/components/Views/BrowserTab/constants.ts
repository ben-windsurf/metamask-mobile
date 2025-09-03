import AppConstants from '../../../core/AppConstants';

/**
 * Error message displayed when IPFS gateway is disabled in security settings
 * Used to inform users why IPFS content cannot be loaded in the browser
 */
export const IPFS_GATEWAY_DISABLED_ERROR =
  'IPFS gateway is disabled on security and privacy settings';

/**
 * Core application constants extracted from AppConstants
 * Includes homepage URL, notification names, and legacy homepage host
 */
export const { HOMEPAGE_URL, NOTIFICATION_NAMES, OLD_HOMEPAGE_URL_HOST } =
  AppConstants;

/**
 * Hostname extracted from the homepage URL for domain comparison
 * Used to identify when the browser is on the MetaMask homepage
 */
export const HOMEPAGE_HOST = new URL(HOMEPAGE_URL)?.hostname;

/**
 * Mixpanel analytics token from environment variables
 * Used for tracking user interactions and events in the browser tab
 */
export const MM_MIXPANEL_TOKEN = process.env.MM_MIXPANEL_TOKEN;
