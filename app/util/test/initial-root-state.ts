import type { RootState } from '../../reducers';
import type { EngineState } from '../../core/Engine';
import { initialState as initialFiatOrdersState } from '../../reducers/fiatOrders';
import { initialState as initialSecurityState } from '../../reducers/security';
import { initialState as initialInpageProvider } from '../../core/redux/slices/inpageProvider';
import { initialState as confirmationMetrics } from '../../core/redux/slices/confirmationMetrics';
import { initialState as originThrottling } from '../../core/redux/slices/originThrottling';
import { initialState as initialBridgeState } from '../../core/redux/slices/bridge';
import initialBackgroundState from './initial-background-state.json';
import { userInitialState } from '../../reducers/user';
import { initialNavigationState } from '../../reducers/navigation';
import { initialOnboardingState } from '../../reducers/onboarding';
import { initialState as initialPerformanceState } from '../../core/redux/slices/performance';
import { isTest } from './utils';
import { CollectiblesState } from '../../reducers/collectibles/types';
import { PrivacyState } from '../../reducers/privacy/types';
import { BookmarksState } from '../../reducers/bookmarks/types';
import { BrowserState } from '../../reducers/browser/types';
import { ModalsState } from '../../reducers/modals/types';
import { SettingsState } from '../../reducers/settings/types';
import { TransactionState } from '../../reducers/transaction/types';
// A cast is needed here because we use enums in some controllers, and TypeScript doesn't consider
// the string value of an enum as satisfying an enum type.
export const backgroundState: EngineState =
  initialBackgroundState as unknown as EngineState;

const initialRootState: RootState = {
  legalNotices: undefined,
  collectibles: {
    favorites: {},
    isNftFetchingProgress: false,
  } as CollectiblesState,
  engine: { backgroundState },
  privacy: {
    approvedHosts: {},
    revealSRPTimestamps: [],
  } as PrivacyState,
  bookmarks: [] as BookmarksState,
  browser: {
    history: [],
    whitelist: [],
    tabs: [],
    favicons: [],
    activeTab: null,
    visitedDappsByHostname: {},
  } as BrowserState,
  modals: {
    networkModalVisible: false,
    shouldNetworkSwitchPopToWallet: true,
    collectibleContractModalVisible: false,
    dappTransactionModalVisible: false,
    signMessageModalVisible: true,
  } as ModalsState,
  settings: {
    searchEngine: 'DuckDuckGo',
    primaryCurrency: 'ETH',
    lockTime: -1,
    useBlockieIcon: true,
    hideZeroBalanceTokens: false,
    basicFunctionalityEnabled: true,
    deepLinkModalDisabled: false,
  } as SettingsState,
  alert: undefined,
  transaction: {
    ensRecipient: undefined,
    assetType: undefined,
    selectedAsset: {},
    transaction: {
      data: undefined,
      from: undefined,
      gas: undefined,
      gasPrice: undefined,
      to: undefined,
      value: undefined,
      maxFeePerGas: undefined,
      maxPriorityFeePerGas: undefined,
    },
    warningGasPriceHigh: undefined,
    transactionTo: undefined,
    transactionToName: undefined,
    transactionFromName: undefined,
    transactionValue: undefined,
    symbol: undefined,
    paymentRequest: undefined,
    readableValue: undefined,
    id: undefined,
    type: undefined,
    proposedNonce: undefined,
    nonce: undefined,
    securityAlertResponses: {},
    useMax: false,
  } as TransactionState,
  user: userInitialState,
  wizard: undefined,
  onboarding: initialOnboardingState,
  notification: undefined,
  swaps: undefined,
  fiatOrders: initialFiatOrdersState,
  infuraAvailability: undefined,
  navigation: initialNavigationState,
  networkOnboarded: undefined,
  security: initialSecurityState,
  signatureRequest: undefined,
  sdk: {
    connections: {},
    approvedHosts: {},
    dappConnections: {},
  },
  experimentalSettings: undefined,
  rpcEvents: undefined,
  accounts: undefined,
  inpageProvider: initialInpageProvider,
  confirmationMetrics,
  originThrottling,
  notifications: {},
  bridge: initialBridgeState,
  banners: {
    dismissedBanners: [],
  },
};

if (isTest) {
  initialRootState.performance = initialPerformanceState;
}

export default initialRootState;
