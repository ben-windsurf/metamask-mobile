import WC2Manager from '../../WalletConnect/WalletConnectV2';
import extractURLParams from './extractURLParams';

/**
 * Connects to a WalletConnect session using the provided WalletConnect URI.
 * Handles the connection process and manages redirects after successful connection.
 *
 * @param params - Connection parameters
 * @param params.handled - Callback function to mark the deeplink as handled
 * @param params.wcURL - WalletConnect URI string for establishing connection
 * @param params.origin - Origin URL of the requesting application
 * @param params.params - Additional URL parameters extracted from the deeplink
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
