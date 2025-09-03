import Routes from '../../../../constants/navigation/Routes';
import Engine from '../../../../core/Engine';
import { NavigationRoute } from '../../../UI/Carousel/types';
import { TokenI } from '../../../UI/Tokens/types';

/**
 * Extracts the host from a URL string
 * Used in confirmation views to display the origin of transaction requests
 * @param {string} url - The URL to extract the host from
 * @returns {string | undefined} The host portion of the URL, or undefined if invalid
 */
export const getHostFromUrl = (url: string) => {
  if (!url) {
    return;
  }
  try {
    return new URL(url).host;
  } catch (error) {
    console.error(error as Error);
  }
  return;
};

/**
 * Determines if a token is a native blockchain token (ETH, MATIC, etc.)
 * Used in confirmation views to handle native token transactions differently
 * @param {TokenI} selectedAsset - The token asset to check
 * @returns {boolean} True if the token is native or ETH, false otherwise
 */
export const isNativeToken = (selectedAsset: TokenI) =>
  selectedAsset.isNative || selectedAsset.isETH;

/**
 * Creates navigation route details for smart account flows
 * Determines the appropriate route based on user's smart account opt-in status
 * @returns {NavigationRoute} Navigation route array for smart account confirmation or opt-in
 */
export function createSmartAccountNavigationDetails(): NavigationRoute {
  if (Engine.context.PreferencesController.state.smartAccountOptIn === true) {
    return [Routes.CONFIRMATION_SWITCH_ACCOUNT_TYPE];
  }
  return [Routes.SMART_ACCOUNT_OPT_IN];
}
