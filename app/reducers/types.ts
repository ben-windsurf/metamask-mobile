/**
 * TypeScript interfaces for Redux reducer states
 * This file contains type definitions for all reducers that need proper typing
 */

import { SecurityAlertResponse } from '../components/Views/confirmations/legacy/components/BlockaidBanner/BlockaidBanner.types';

/**
 * Transaction-related types
 */
export interface TransactionData {
  data?: string;
  from?: string;
  gas?: string;
  gasPrice?: string;
  to?: string;
  value?: string;
  maxFeePerGas?: string;
  maxPriorityFeePerGas?: string;
}

export interface SelectedAsset {
  tokenId?: string;
  isETH?: boolean;
  symbol?: string;
  address?: string;
  decimals?: number;
  name?: string;
  image?: string;
  balance?: string;
  balanceFiat?: string;
}

export type AssetType = 'ETH' | 'ERC20' | 'ERC721' | undefined;

export interface TransactionState {
  ensRecipient?: string;
  assetType?: AssetType;
  selectedAsset: SelectedAsset;
  transaction: TransactionData;
  warningGasPriceHigh?: string;
  transactionTo?: string;
  transactionToName?: string;
  transactionFromName?: string;
  transactionValue?: string;
  symbol?: string;
  paymentRequest?: string;
  readableValue?: string;
  id?: string;
  type?: string;
  proposedNonce?: string;
  nonce?: string;
  securityAlertResponses: Record<string, SecurityAlertResponse>;
  useMax?: boolean;
  maxValueMode?: boolean;
}

/**
 * Swaps-related types
 */
export interface SwapsFeatureFlags {
  smart_transactions?: {
    mobileActive?: boolean;
  };
  smartTransactions?: {
    mobileActive?: boolean;
  };
}

export interface SwapsChainState {
  isLive: boolean;
  featureFlags?: SwapsFeatureFlags;
}

export interface SwapsState {
  isLive: boolean;
  hasOnboarded: boolean;
  featureFlags?: SwapsFeatureFlags;
  [chainId: string]: SwapsChainState | boolean | SwapsFeatureFlags | undefined;
}

/**
 * Notification-related types
 */
export type NotificationType = 'transaction' | 'simple';

export interface BaseNotification {
  id: string;
  isVisible: boolean;
  autodismiss?: number;
  status?: string;
  type: NotificationType;
}

export interface TransactionNotification extends BaseNotification {
  type: 'transaction';
  transaction: {
    id: string;
    [key: string]: unknown;
  };
}

export interface SimpleNotification extends BaseNotification {
  type: 'simple';
  title?: string;
  description?: string;
}

export type Notification = TransactionNotification | SimpleNotification;

export interface NotificationState {
  notifications: Notification[];
}

/**
 * Collectibles-related types
 */
export interface CollectibleFavorite {
  tokenId: string;
  address: string;
}

export interface CollectiblesState {
  favorites: Record<string, Record<string, CollectibleFavorite[]>>;
  isNftFetchingProgress: boolean;
}

/**
 * Privacy-related types
 */
export interface PrivacyState {
  approvedHosts: Record<string, boolean>;
  revealSRPTimestamps: number[];
}

/**
 * Bookmark-related types
 */
export interface Bookmark {
  url: string;
  name?: string;
}

export type BookmarksState = Bookmark[];

/**
 * Browser-related types
 */
export interface BrowserHistoryEntry {
  url: string;
  name?: string;
}

export interface BrowserTab {
  url: string;
  id: string;
  linkType?: string;
}

export interface BrowserFavicon {
  origin: string;
  url: string;
}

export interface BrowserState {
  history: BrowserHistoryEntry[];
  whitelist: string[];
  tabs: BrowserTab[];
  favicons: BrowserFavicon[];
  activeTab: string | null;
  visitedDappsByHostname: Record<string, boolean>;
}

/**
 * Modals-related types
 */
export interface ModalsState {
  networkModalVisible: boolean;
  shouldNetworkSwitchPopToWallet: boolean;
  collectibleContractModalVisible: boolean;
  dappTransactionModalVisible: boolean;
  signMessageModalVisible: boolean;
  infoNetworkModalVisible?: boolean;
}

/**
 * Settings-related types
 */
export interface SettingsState {
  searchEngine: string;
  primaryCurrency: string;
  lockTime: number;
  useBlockieIcon: boolean;
  hideZeroBalanceTokens: boolean;
  basicFunctionalityEnabled: boolean;
  deepLinkModalDisabled: boolean;
  showHexData?: boolean;
  showCustomNonce?: boolean;
  showFiatOnTestnets?: boolean;
  deviceNotificationEnabled?: boolean;
}

/**
 * Alert-related types
 */
export interface AlertState {
  isVisible: boolean;
  autodismiss: number | null;
  content: string | null;
  data: unknown;
}

/**
 * Wizard-related types
 */
export interface WizardState {
  step: number;
}

/**
 * Infura availability types
 */
export interface InfuraAvailabilityState {
  isBlocked: boolean;
}

/**
 * Network onboarded types
 */
export interface NetworkState {
  showNetworkOnboarding: boolean;
  nativeToken: string;
  networkType: string;
  networkUrl: string;
}

export interface SwitchedNetwork {
  networkUrl: string;
  networkStatus: boolean;
}

export interface NetworkOnboardedState {
  networkOnboardedState: Record<string, boolean>;
  networkState: NetworkState;
  switchedNetwork: SwitchedNetwork;
}

/**
 * Experimental settings types
 */
export interface ExperimentalSettingsState {
  securityAlertsEnabled: boolean;
}

/**
 * Legal notices types
 */
export interface LegalNoticesState {
  newPrivacyPolicyToastClickedOrClosed: boolean;
  newPrivacyPolicyToastShownDate: number | null;
}

/**
 * Signature request types (re-exported from signatureRequest reducer)
 */
export interface SignatureRequestState {
  securityAlertResponse?: SecurityAlertResponse;
}
