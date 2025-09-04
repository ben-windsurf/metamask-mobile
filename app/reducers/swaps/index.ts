import { createSelector } from 'reselect';
import { isMainnetByChainId } from '../../util/networks';
import { safeToChecksumAddress, areAddressesEqual } from '../../util/address';
import { lte } from '../../util/lodash';
import {
  selectChainId,
  selectEvmChainId,
} from '../../selectors/networkController';
import {
  selectAllTokens,
  selectTokens,
} from '../../selectors/tokensController';
import { selectTokenList } from '../../selectors/tokenListController';
import { selectContractBalances } from '../../selectors/tokenBalancesController';
import { getSwapsLiveness } from './utils';
import type { FeatureFlags as SwapsControllerFeatureFlags } from '@metamask/swaps-controller/dist/types';
import { allowedTestnetChainIds } from '../../components/UI/Swaps/utils';
import { NETWORKS_CHAIN_ID } from '../../constants/network';
import { selectSelectedInternalAccountAddress } from '../../selectors/accountsController';
import { CHAIN_ID_TO_NAME_MAP } from '@metamask/swaps-controller/dist/constants';
import { invert, omit } from 'lodash';
import { createDeepEqualSelector } from '../../selectors/util';
import { toHex } from '@metamask/controller-utils';
import { SolScope } from '@metamask/keyring-api';
import {
  SwapsState,
  SwapsAction,
  SwapsActionType,
  SwapsFeatureFlags,
  SwapsChainFeatureFlags,
  SwapsChainState,
  SetSwapsLivenessAction,
  SetSwapsHasOnboardedAction,
} from './types';
import type { RootState as GlobalRootState } from '../index';

export const getFeatureFlagChainId = (chainId: string): string =>
  typeof __DEV__ !== 'undefined' &&
  __DEV__ &&
  allowedTestnetChainIds.includes(chainId as `0x${string}`)
    ? NETWORKS_CHAIN_ID.MAINNET
    : chainId;

export const SWAPS_SET_LIVENESS = SwapsActionType.SWAPS_SET_LIVENESS;
export const SWAPS_SET_HAS_ONBOARDED = SwapsActionType.SWAPS_SET_HAS_ONBOARDED;
const MAX_TOKENS_WITH_BALANCE = 5;

export const setSwapsLiveness = (
  chainId: string,
  featureFlags: SwapsFeatureFlags | null,
): SetSwapsLivenessAction => ({
  type: SwapsActionType.SWAPS_SET_LIVENESS,
  payload: { chainId, featureFlags },
});

export const setSwapsHasOnboarded = (
  hasOnboarded: boolean,
): SetSwapsHasOnboardedAction => ({
  type: SwapsActionType.SWAPS_SET_HAS_ONBOARDED,
  payload: hasOnboarded,
});

interface Token {
  address: string;
  decimals: number | string;
  hasBalanceError?: boolean;
  image?: string;
  occurrences?: number;
  name?: string;
  [key: string]: unknown;
}

function processToken(token: Token | null): Token | null {
  if (!token) return null;
  const { hasBalanceError, image, ...tokenData } = token;
  return {
    occurrences: 0,
    ...tokenData,
    decimals: Number(tokenData.decimals),
    address: tokenData.address.toLowerCase(),
  };
}

function combineTokens(tokenSources: (Token[] | null | undefined)[]): Token[] {
  const tokenMap = new Map<string, Token>();

  for (const tokens of tokenSources) {
    if (!tokens) continue;

    for (const token of tokens) {
      const processedToken = processToken(token);
      if (processedToken && !tokenMap.has(processedToken.address)) {
        tokenMap.set(processedToken.address, processedToken);
      }
    }
  }

  return Array.from(tokenMap.values());
}

function addMetadata(
  chainId: string,
  tokens: Token[],
  tokenList: Record<string, { name: string }>,
): Token[] {
  if (!isMainnetByChainId(chainId)) {
    return tokens;
  }
  return tokens.map((token) => {
    const checksumAddress = safeToChecksumAddress(token.address);
    const tokenMetadata = checksumAddress
      ? tokenList?.[checksumAddress]
      : undefined;
    if (tokenMetadata) {
      return { ...token, name: tokenMetadata.name };
    }

    return token;
  });
}

interface SwapsRootState {
  swaps: SwapsState;
  engine: {
    backgroundState: {
      SwapsController: {
        tokens: Token[];
        approvalTransaction: unknown;
        quoteValues: unknown;
        quotes: unknown;
        aggregatorMetadata: unknown;
        error: unknown;
        quoteRefreshSeconds: unknown;
        usedGasEstimate: unknown;
        usedCustomGas: unknown;
        topAggId: unknown;
        pollingCyclesLeft: unknown;
        quotesLastFetched: unknown;
        isInPolling: unknown;
        topAssets: { address: string }[];
        chainCache: unknown;
      };
    };
  };
}

const chainIdSelector = selectEvmChainId;
const swapsStateSelector = (state: GlobalRootState) => state.swaps;

export const swapsLivenessSelector = createSelector(
  swapsStateSelector,
  chainIdSelector,
  (swapsState, chainId) =>
    (swapsState[chainId] as SwapsChainState)?.isLive || false,
);

export const swapsLivenessMultichainSelector = createSelector(
  [
    swapsStateSelector,
    (state: GlobalRootState, chainId?: string) =>
      chainId !== undefined ? chainId : selectChainId(state),
  ],
  (swapsState, chainId) => {
    ///: BEGIN:ONLY_INCLUDE_IF(keyring-snaps)
    if (chainId === SolScope.Mainnet) {
      return true;
    }
    ///: END:ONLY_INCLUDE_IF(keyring-snaps)

    return (swapsState?.[chainId] as SwapsChainState)?.isLive || false;
  },
);

export const swapsSmartTxFlagEnabled = createSelector(
  swapsStateSelector,
  (swapsState) => {
    const globalFlags = swapsState.featureFlags;
    const isEnabled = Boolean(globalFlags?.smartTransactions?.mobileActive);
    return isEnabled;
  },
);

export const selectSwapsChainFeatureFlags = createSelector(
  swapsStateSelector,
  (_state: GlobalRootState, transactionChainId?: string) =>
    transactionChainId || selectEvmChainId(_state),
  (swapsState, chainId) => ({
    ...((swapsState[chainId] as SwapsChainState)?.featureFlags || {}),
    smartTransactions: {
      ...((swapsState[chainId] as SwapsChainState)?.featureFlags
        ?.smartTransactions || {}),
      ...(swapsState.featureFlags?.smartTransactions || {}),
    },
  }),
);

export const swapsHasOnboardedSelector = createSelector(
  swapsStateSelector,
  (swapsState) => swapsState.hasOnboarded,
);

const selectSwapsControllerState = (state: SwapsRootState) =>
  state.engine.backgroundState.SwapsController;

export const swapsControllerTokens = (state: SwapsRootState): Token[] =>
  state.engine.backgroundState.SwapsController.tokens;

export const selectSwapsApprovalTransaction = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.approvalTransaction,
);
export const selectSwapsQuoteValues = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.quoteValues,
);
export const selectSwapsQuotes = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.quotes,
);
export const selectSwapsAggregatorMetadata = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.aggregatorMetadata,
);
export const selectSwapsError = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.error,
);
export const selectSwapsQuoteRefreshSeconds = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.quoteRefreshSeconds,
);
export const selectSwapsUsedGasEstimate = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.usedGasEstimate,
);
export const selectSwapsUsedCustomGas = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.usedCustomGas,
);
export const selectSwapsTopAggId = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.topAggId,
);
export const selectSwapsPollingCyclesLeft = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.pollingCyclesLeft,
);
export const selectSwapsQuotesLastFetched = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.quotesLastFetched,
);
export const selectSwapsIsInPolling = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.isInPolling,
);

const swapsControllerAndUserTokens = createSelector(
  swapsControllerTokens,
  selectTokens,
  (swapsTokens, tokens) => combineTokens([swapsTokens, tokens]),
);

const swapsControllerAndUserTokensMultichain = createDeepEqualSelector(
  swapsControllerTokens,
  selectAllTokens,
  selectSelectedInternalAccountAddress,
  (swapsTokens, allTokens, currentUserAddress) => {
    const userTokensFlat: Token[] = [];
    if (allTokens && currentUserAddress) {
      for (const chainId in allTokens) {
        const chainTokens = allTokens[chainId as `0x${string}`];
        if (!chainTokens?.[currentUserAddress]) continue;

        const userTokensForChain = chainTokens[currentUserAddress];
        if (Array.isArray(userTokensForChain)) {
          userTokensFlat.push(...userTokensForChain);
        }
      }
    }

    return combineTokens([swapsTokens, userTokensFlat]);
  },
);

export const swapsTokensSelector = createSelector(
  chainIdSelector,
  swapsControllerAndUserTokens,
  selectTokenList,
  (chainId, tokens, tokenList) => {
    if (!tokens) {
      return [];
    }

    return addMetadata(chainId, tokens, tokenList);
  },
);

export const topAssets = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.topAssets,
);

export const selectChainCache = createSelector(
  selectSwapsControllerState,
  (swapsControllerState) => swapsControllerState.chainCache,
);

export const swapsTokensObjectSelector = createSelector(
  swapsControllerAndUserTokens,
  (tokens) => {
    if (!tokens || tokens.length === 0) {
      return {};
    }

    const result: Record<string, undefined> = {};
    for (const token of tokens) {
      result[token.address] = undefined;
    }
    return result;
  },
);

export const swapsTokensMultiChainObjectSelector = createSelector(
  swapsControllerAndUserTokensMultichain,
  (tokens) => {
    if (!tokens || tokens.length === 0) {
      return {};
    }

    const result: Record<string, undefined> = {};
    for (const token of tokens) {
      result[token.address] = undefined;
    }
    return result;
  },
);

export const swapsTokensWithBalanceSelector = createSelector(
  chainIdSelector,
  swapsControllerAndUserTokens,
  selectTokenList,
  selectContractBalances,
  (chainId, tokens, tokenList, balances) => {
    if (!tokens) {
      return [];
    }
    const baseTokens = tokens;
    const tokensAddressesWithBalance = Object.entries(balances)
      .filter(([, balance]) => Number(balance) !== 0)
      .sort(([, balanceA], [, balanceB]) =>
        lte(Number(balanceB), Number(balanceA)) ? -1 : 1,
      )
      .map(([address]) => address.toLowerCase());
    const tokensWithBalance: Token[] = [];
    const originalTokens: Token[] = [];

    for (const token of baseTokens) {
      if (tokensAddressesWithBalance.includes(token.address)) {
        tokensWithBalance.push(token);
      } else {
        originalTokens.push(token);
      }

      if (
        tokensWithBalance.length === tokensAddressesWithBalance.length &&
        tokensWithBalance.length + originalTokens.length >=
          MAX_TOKENS_WITH_BALANCE
      ) {
        break;
      }
    }

    const result = [...tokensWithBalance, ...originalTokens].slice(
      0,
      Math.max(tokensWithBalance.length, MAX_TOKENS_WITH_BALANCE),
    );
    return addMetadata(chainId, result, tokenList);
  },
);

export const swapsTopAssetsSelector = createSelector(
  chainIdSelector,
  swapsControllerAndUserTokens,
  selectTokenList,
  topAssets,
  (chainId, tokens, tokenList, topAssetsData) => {
    if (!topAssetsData || !tokens) {
      return [];
    }
    const result = topAssetsData
      .map(({ address }) =>
        tokens?.find((token) => areAddressesEqual(token.address, address)),
      )
      .filter((token): token is Token => Boolean(token));
    return addMetadata(chainId, result, tokenList);
  },
);

export const initialState: SwapsState = {
  isLive: true,
  hasOnboarded: true,
  featureFlags: undefined,
  '0x1': {
    isLive: true,
    featureFlags: undefined,
  },
};

/* eslint-disable @typescript-eslint/default-param-last */
function swapsReducer(
  state: SwapsState = initialState,
  action: SwapsAction,
): SwapsState {
  switch (action.type) {
    case SwapsActionType.SWAPS_SET_LIVENESS: {
      const { chainId: rawChainId, featureFlags } = action.payload;
      const chainId = getFeatureFlagChainId(rawChainId);

      const data = state[chainId] as SwapsChainState;

      const chainNoFlags = {
        ...data,
        featureFlags: undefined,
        isLive: false,
      };

      if (!featureFlags) {
        return {
          ...state,
          [chainId]: chainNoFlags,
          [rawChainId]: chainNoFlags,
          featureFlags: undefined,
        };
      }

      const newState: SwapsState = {
        ...state,
        featureFlags: {
          smart_transactions: (
            featureFlags as SwapsFeatureFlags & { smart_transactions?: unknown }
          ).smart_transactions,
          smartTransactions: featureFlags.smartTransactions,
        },
      };

      const noTestnetChainIdToNameMap = omit(
        CHAIN_ID_TO_NAME_MAP,
        toHex('1337'),
      );
      const chainNameToIdMap = invert(noTestnetChainIdToNameMap);

      Object.keys(featureFlags).forEach((chainName) => {
        const chainIdForName = chainNameToIdMap[chainName];

        if (
          chainIdForName &&
          (featureFlags as Record<string, unknown>)[chainName] &&
          typeof (featureFlags as Record<string, unknown>)[chainName] ===
            'object'
        ) {
          const chainFeatureFlags = (
            featureFlags as Record<string, SwapsChainFeatureFlags>
          )[chainName];
          const chainLiveness = getSwapsLiveness(
            featureFlags as SwapsControllerFeatureFlags,
            chainIdForName as `0x${string}`,
          );

          (newState as Record<string, SwapsChainState>)[chainIdForName] = {
            ...(state as Record<string, SwapsChainState>)[chainIdForName],
            featureFlags: chainFeatureFlags,
            isLive: chainLiveness,
          };

          if (chainIdForName === chainId && rawChainId !== chainId) {
            (newState as Record<string, SwapsChainState>)[rawChainId] = (
              newState as Record<string, SwapsChainState>
            )[chainIdForName];
          }
        }
      });

      return newState;
    }
    case SwapsActionType.SWAPS_SET_HAS_ONBOARDED: {
      return {
        ...state,
        hasOnboarded: Boolean(action.payload),
      };
    }
    default: {
      return state;
    }
  }
}

export default swapsReducer;
export * from './types';
