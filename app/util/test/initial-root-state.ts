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
import { CollectiblesState } from '../../reducers/collectibles/types';
import { PrivacyState } from '../../reducers/privacy/types';
import { BookmarksState } from '../../reducers/bookmarks/types';
import { BrowserState } from '../../reducers/browser/types';
import { ModalsState } from '../../reducers/modals/types';
import { SettingsState } from '../../reducers/settings/types';
import { TransactionState } from '../../reducers/transaction/types';
import { SwapsState } from '../../reducers/swaps/types';
import { isTest } from './utils';
// A cast is needed here because we use enums in some controllers, and TypeScript doesn't consider
// the string value of an enum as satisfying an enum type.
export const backgroundState: EngineState =
  initialBackgroundState as unknown as EngineState;

const initialCollectiblesState: CollectiblesState = {
  favorites: {},
  isNftFetchingProgress: false,
};

const initialPrivacyState: PrivacyState = {
  approvedHosts: {},
  revealSRPTimestamps: [],
};

const initialBookmarksState: BookmarksState = [];

const initialBrowserState: BrowserState = {
  activeTab: null,
  tabs: [],
  favicons: [],
  history: [],
  whitelist: [],
  visitedDappsByHostname: {},
};

const initialModalsState: ModalsState = {
  networkModalVisible: false,
  shouldNetworkSwitchPopToWallet: false,
  collectibleContractModalVisible: false,
  dappTransactionModalVisible: false,
  signMessageModalVisible: false,
};

const initialSettingsState: SettingsState = {
  searchEngine: 'DuckDuckGo',
  primaryCurrency: 'ETH',
  lockTime: 30000,
  useBlockieIcon: true,
  hideZeroBalanceTokens: false,
  basicFunctionalityEnabled: true,
  deepLinkModalDisabled: false,
};

const initialTransactionState: TransactionState = {
  selectedAsset: {},
  transaction: {},
  securityAlertResponses: {},
  useMax: false,
};

const initialSwapsState: SwapsState = {
  isLive: false,
  hasOnboarded: false,
};

const initialRootState: RootState = {
  legalNotices: undefined,
  collectibles: initialCollectiblesState,
  engine: { backgroundState },
  privacy: initialPrivacyState,
  bookmarks: initialBookmarksState,
  browser: initialBrowserState,
  modals: initialModalsState,
  settings: initialSettingsState,
  alert: undefined,
  transaction: initialTransactionState,
  user: userInitialState,
  wizard: undefined,
  onboarding: initialOnboardingState,
  notification: undefined,
  swaps: initialSwapsState,
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
