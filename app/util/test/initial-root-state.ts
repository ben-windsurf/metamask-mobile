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

import type { LegalNoticesState } from '../../reducers/legalNotices';
import type { CollectiblesState } from '../../reducers/collectibles';
import type { PrivacyState } from '../../reducers/privacy';
import type { BookmarksState } from '../../reducers/bookmarks';
import type { BrowserState } from '../../reducers/browser';
import type { ModalsState } from '../../reducers/modals';
import type { SettingsState } from '../../reducers/settings';
import type { AlertState } from '../../reducers/alert';
import type { TransactionState } from '../../reducers/transaction';
import type { WizardState } from '../../reducers/wizard';
import type { NotificationState } from '../../reducers/notification';
import type { SwapsState } from '../../reducers/swaps';
import type { InfuraAvailabilityState } from '../../reducers/infuraAvailability';
import type { NetworkOnboardedState } from '../../reducers/networkSelector';
import type { ExperimentalSettingsState } from '../../reducers/experimentalSettings';
import type { SignatureRequestState } from '../../reducers/signatureRequest';
import type { RpcEventsState } from '../../reducers/rpcEvents';
import type { AccountsState } from '../../reducers/accounts';
// A cast is needed here because we use enums in some controllers, and TypeScript doesn't consider
// the string value of an enum as satisfying an enum type.
export const backgroundState: EngineState =
  initialBackgroundState as unknown as EngineState;

const initialRootState: RootState = {
  legalNotices: {
    newPrivacyPolicyToastClickedOrClosed: false,
    newPrivacyPolicyToastShownDate: null,
  } as LegalNoticesState,
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
    activeTab: null,
    favicons: [],
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
  alert: {
    isVisible: false,
    autodismiss: null,
    content: null,
    data: null,
  } as AlertState,
  transaction: {
    selectedAsset: {},
    transaction: {},
  } as TransactionState,
  user: userInitialState,
  wizard: {
    step: 0,
  } as WizardState,
  onboarding: initialOnboardingState,
  notification: {
    notifications: [],
  } as NotificationState,
  swaps: {
    featureFlags: {},
    isLive: false,
    hasOnboarded: false,
  } as SwapsState,
  fiatOrders: initialFiatOrdersState,
  infuraAvailability: {
    isBlocked: false,
  } as InfuraAvailabilityState,
  navigation: initialNavigationState,
  networkOnboarded: {
    networkOnboardedState: {},
    networkState: {
      showNetworkOnboarding: false,
      nativeToken: '',
      networkType: '',
      networkUrl: '',
    },
    switchedNetwork: {
      networkUrl: '',
      networkStatus: false,
    },
  } as NetworkOnboardedState,
  security: initialSecurityState,
  signatureRequest: {
    signatureRequest: {},
  } as SignatureRequestState,
  sdk: {
    connections: {},
    approvedHosts: {},
    dappConnections: {},
  },
  experimentalSettings: {
    securityAlertsEnabled: false,
  } as ExperimentalSettingsState,
  rpcEvents: {
    signingEvent: {
      eventStage: 'idle',
      rpcName: '',
    },
  } as RpcEventsState,
  accounts: {
    reloadAccounts: false,
  } as AccountsState,
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
