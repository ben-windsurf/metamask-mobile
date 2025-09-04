import { ImageSourcePropType } from 'react-native';
import AppConstants from '../../AppConstants';
import getRpcMethodMiddleware from '../../RPCMethods/RPCMethodMiddleware';
import { DappClient } from './dapp-sdk-types';

/**
 * Creates default bridge parameters for SDK connection with dApp clients.
 * Configures RPC middleware, host approval, and connection metadata for secure
 * communication between MetaMask Mobile and external dApps via the SDK.
 *
 * @param clientInfo - The dApp client information containing originator details
 * @returns Bridge configuration object with RPC middleware and connection settings
 */
const getDefaultBridgeParams = (clientInfo: DappClient) => ({
  getApprovedHosts: (host: string) => ({
    [host]: true,
  }),
  remoteConnHost:
    clientInfo.originatorInfo.url ?? clientInfo.originatorInfo.title,
  getRpcMethodMiddleware: ({
    getProviderState,
  }: {
    hostname: string;
    // TODO: Replace "any" with type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    getProviderState: any;
  }) =>
    getRpcMethodMiddleware({
      hostname:
        clientInfo.originatorInfo.url ?? clientInfo.originatorInfo.title,
      channelId: clientInfo.clientId,
      getProviderState,
      isMMSDK: true,
      navigation: null, //props.navigation,
      // Website info
      url: {
        current: clientInfo.originatorInfo?.url,
      },
      title: {
        current: clientInfo.originatorInfo?.title,
      },
      icon: {
        current: clientInfo.originatorInfo?.icon as ImageSourcePropType, // TODO: Need to change the type at the @metamask/sdk-communication-layer from string to ImageSourcePropType
      },
      // Bookmarks
      isHomepage: () => false,
      // Show autocomplete
      fromHomepage: { current: false },
      // Wizard
      wizardScrollAdjusted: { current: false },
      tabId: '',
      isWalletConnect: false,
      analytics: {
        isRemoteConn: true,
        platform:
          clientInfo.originatorInfo.platform ??
          AppConstants.MM_SDK.UNKNOWN_PARAM,
      },
      toggleUrlModal: () => null,
      injectHomePageScripts: () => null,
    }),
  isMainFrame: true,
  isWalletConnect: false,
  wcRequestActions: undefined,
});

export default getDefaultBridgeParams;
