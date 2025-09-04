import DeeplinkManager from '../DeeplinkManager';
import extractURLParams from './extractURLParams';

/**
 * Handles dApp URL processing by enforcing HTTPS protocol and delegating to browser URL handler.
 *
 * @param params - Configuration object for handling the dApp URL
 * @param params.instance - DeeplinkManager instance to handle the URL
 * @param params.handled - Callback function to mark the URL as handled
 * @param params.urlObj - Parsed URL object from extractURLParams
 * @param params.browserCallBack - Optional callback for browser URL handling
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
