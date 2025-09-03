import WC2Manager from '../../WalletConnect/WalletConnectV2';
import extractURLParams from './extractURLParams';

/**
 * Establishes a WalletConnect v2 connection using the provided WC URI and parameters
 * Handles the connection process through the WC2Manager instance and manages redirects
 * @param {Object} params - Connection parameters
 * @param {Function} params.handled - Callback function to mark the deeplink as handled
 * @param {string} params.wcURL - WalletConnect URI for establishing the connection
 * @param {string} params.origin - Origin of the connection request for security validation
 * @param {ReturnType<typeof extractURLParams>['params']} params.params - Extracted URL parameters including redirect information
 */
export function connectWithWC({
  handled,
  wcURL,
  origin,
  params,
}: {
  handled: () => void;
  wcURL: string;
  origin: string;
  params: ReturnType<typeof extractURLParams>['params'];
}) {
  handled();

  WC2Manager.getInstance()
    .then((instance) =>
      instance.connect({
        wcUri: wcURL,
        origin,
        redirectUrl: params?.redirect,
      }),
    )
    .catch((err) => {
      console.warn(`DeepLinkManager failed to connect`, err);
    });
}

export default connectWithWC;
