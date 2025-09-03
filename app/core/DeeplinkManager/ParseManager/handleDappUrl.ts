import DeeplinkManager from '../DeeplinkManager';
import extractURLParams from './extractURLParams';

/**
 * Handles dApp URL processing by enforcing HTTPS protocol and routing to browser
 * This function processes incoming dApp URLs from deeplinks, ensures they use HTTPS
 * for security, and delegates the actual URL handling to the DeeplinkManager's browser handler
 * @param {Object} params - The parameters object
 * @param {DeeplinkManager} params.instance - DeeplinkManager instance to handle the URL
 * @param {Function} params.handled - Callback function to mark the deeplink as handled
 * @param {URL} params.urlObj - URL object extracted from the deeplink parameters
 * @param {Function} [params.browserCallBack] - Optional callback for browser URL handling
 */
export function handleDappUrl({
  instance,
  handled,
  urlObj,
  browserCallBack,
}: {
  instance: DeeplinkManager;
  handled: () => void;
  urlObj: ReturnType<typeof extractURLParams>['urlObj'];
  browserCallBack?: (url: string) => void;
}) {
  // Enforce https
  handled();
  urlObj.set('protocol', 'https:');
  instance._handleBrowserUrl(urlObj.href, browserCallBack);
}

export default handleDappUrl;
