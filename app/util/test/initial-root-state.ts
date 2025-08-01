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
import { AlertState } from '../../reducers/alert/types';
import { TransactionState } from '../../reducers/transaction/types';
import { WizardState } from '../../reducers/wizard/types';
import { NotificationState } from '../../reducers/notification/types';
import { SwapsState } from '../../reducers/swaps/types';
import { InfuraAvailabilityState } from '../../reducers/infuraAvailability/types';
import { NetworkOnboardedState } from '../../reducers/networkSelector';
import { ExperimentalSettingsState } from '../../reducers/experimentalSettings';
import { SignatureRequestState } from '../../reducers/signatureRequest';
import { RpcEventsState } from '../../reducers/rpcEvents';
import { AccountsState } from '../../reducers/accounts';
// A cast is needed here because we use enums in some controllers, and TypeScript doesn't consider
// the string value of an enum as satisfying an enum type.
export const backgroundState: EngineState =
  initialBackgroundState as unknown as EngineState;

const initialLegalNoticesState = {
  newPrivacyPolicyToastClickedOrClosed: false,
  newPrivacyPolicyToastShownDate: null,
};

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
  history: [],
  whitelist: [],
  tabs: [],
  favicons: [],
  activeTab: null,
  visitedDappsByHostname: {},
};

const initialModalsState: ModalsState = {
  networkModalVisible: false,
  shouldNetworkSwitchPopToWallet: false,
  collectibleContractModalVisible: false,
  dappTransactionModalVisible: false,
  signMessageModalVisible: false,
  infoNetworkModalVisible: false,
  receiveAsset: null,
  receiveModalVisible: false,
};

const initialSettingsState: SettingsState = {
  searchEngine: 'DuckDuckGo',
  primaryCurrency: 'usd',
  lockTime: 30000,
  useBlockieIcon: true,
  hideZeroBalanceTokens: false,
  showFiatOnTestnets: false,
  basicFunctionalityEnabled: true,
  deepLinkModalDisabled: false,
};

const initialAlertState: AlertState = {
  isVisible: false,
  autodismiss: null,
  content: null,
  data: null,
};

const initialTransactionState: TransactionState = {
  selectedAsset: {},
  transaction: {},
  securityAlertResponses: {},
  useMax: false,
};

const initialWizardState: WizardState = {
  step: 0,
};

const initialNotificationState: NotificationState = {
  notifications: [],
};

const initialSwapsState: SwapsState = {
  isLive: true,
  hasOnboarded: false,
};

const initialInfuraAvailabilityState: InfuraAvailabilityState = {
  isBlocked: false,
};

const initialNetworkOnboardedState: NetworkOnboardedState = {
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
};

const initialExperimentalSettingsState: ExperimentalSettingsState = {
  securityAlertsEnabled: true,
};

const initialSignatureRequestState: SignatureRequestState = {};

const initialRpcEventsState: RpcEventsState = {
  signingEvent: {
    eventStage: '',
    rpcName: '',
  },
};

const initialAccountsState: AccountsState = {
  reloadAccounts: false,
};

const initialRootState: RootState = {
  legalNotices: initialLegalNoticesState,
  collectibles: initialCollectiblesState,
  engine: { backgroundState },
  privacy: initialPrivacyState,
  bookmarks: initialBookmarksState,
  browser: initialBrowserState,
  modals: initialModalsState,
  settings: initialSettingsState,
  alert: initialAlertState,
  transaction: initialTransactionState,
  user: userInitialState,
  wizard: initialWizardState,
  onboarding: initialOnboardingState,
  notification: initialNotificationState,
  swaps: initialSwapsState,
  fiatOrders: initialFiatOrdersState,
  infuraAvailability: initialInfuraAvailabilityState,
  navigation: initialNavigationState,
  networkOnboarded: initialNetworkOnboardedState,
  security: initialSecurityState,
  signatureRequest: initialSignatureRequestState,
  sdk: {
    connections: {},
    approvedHosts: {},
    dappConnections: {},
  },
  experimentalSettings: initialExperimentalSettingsState,
  rpcEvents: initialRpcEventsState,
  accounts: initialAccountsState,
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
