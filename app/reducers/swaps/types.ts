export interface SwapsFeatureFlags {
  smartTransactions?: {
    mobileActive?: boolean;
    [key: string]: unknown;
  };
  [key: string]: unknown;
}

export interface SwapsChainFeatureFlags {
  smartTransactions?: {
    mobileActive?: boolean;
    extensionActive?: boolean;
  };
  [key: string]: unknown;
}

export interface SwapsChainState {
  isLive: boolean;
  featureFlags?: SwapsChainFeatureFlags;
}

export interface FeatureFlags extends SwapsFeatureFlags {
  [key: string]: unknown;
}

export interface SwapsState {
  isLive: boolean;
  hasOnboarded: boolean;
  featureFlags?: SwapsFeatureFlags;
  [chainId: string]: SwapsChainState | boolean | SwapsFeatureFlags | undefined;
}

export enum SwapsActionType {
  SWAPS_SET_LIVENESS = 'SWAPS_SET_LIVENESS',
  SWAPS_SET_HAS_ONBOARDED = 'SWAPS_SET_HAS_ONBOARDED',
}

export interface SetSwapsLivenessAction {
  type: SwapsActionType.SWAPS_SET_LIVENESS;
  payload: {
    chainId: string;
    featureFlags: SwapsFeatureFlags | null;
  };
}

export interface SetSwapsHasOnboardedAction {
  type: SwapsActionType.SWAPS_SET_HAS_ONBOARDED;
  payload: boolean;
}

export type SwapsAction = SetSwapsLivenessAction | SetSwapsHasOnboardedAction;
