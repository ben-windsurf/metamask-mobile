export interface SwapsFeatureFlags {
  smartTransactions?: {
    mobileActive?: boolean;
  };
  [key: string]: unknown;
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

export enum SwapsActionType {
  SWAPS_SET_LIVENESS = 'SWAPS_SET_LIVENESS',
  SWAPS_SET_HAS_ONBOARDED = 'SWAPS_SET_HAS_ONBOARDED',
}

export interface SwapsAction {
  type: SwapsActionType;
  payload?:
    | {
        chainId?: string;
        featureFlags?: SwapsFeatureFlags | null;
      }
    | boolean;
}
