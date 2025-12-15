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
import { allowedTestnetChainIds } from '../../components/UI/Swaps/utils';
import { NETWORKS_CHAIN_ID } from '../../constants/network';
import { selectSelectedInternalAccountAddress } from '../../selectors/accountsController';
import { CHAIN_ID_TO_NAME_MAP } from '@metamask/swaps-controller/dist/constants';
import { invert, omit } from 'lodash';
import { createDeepEqualSelector } from '../../selectors/util';
import { toHex } from '@metamask/controller-utils';
import { SolScope } from '@metamask/keyring-api';
import { RootState } from '..';
import { SwapsState, SwapsFeatureFlags, SwapsChainState } from '../types';

declare const __DEV__: boolean | undefined;

interface Token {
  address: string;
  decimals: number | string;
  symbol?: string;
  name?: string;
  hasBalanceError?: boolean;
  image?: string;
  occurrences?: number;
}

interface ProcessedToken {
  address: string;
  decimals: number;
  symbol?: string;
  name?: string;
  occurrences: number;
}

interface TokenList {
  [address: string]: {
    name?: string;
    symbol?: string;
    decimals?: number;
  };
}

interface TopAsset {
  address: string;
}

interface SwapsControllerState {
  tokens?: Token[];
  approvalTransaction?: unknown;
  quoteValues?: unknown;
  quotes?: unknown;
  aggregatorMetadata?: unknown;
  error?: unknown;
  quoteRefreshSeconds?: number;
  usedGasEstimate?: unknown;
  usedCustomGas?: unknown;
  topAggId?: string;
  pollingCyclesLeft?: number;
  quotesLastFetched?: number;
  isInPolling?: boolean;
  topAssets?: TopAsset[];
  chainCache?: unknown;
}

interface AllTokens {
  [chainId: string]: {
    [address: string]: Token[];
  };
}

interface SwapsAction {
  type: string;
  payload?: {
    chainId?: string;
    featureFlags?: SwapsFeatureFlags & {
      [chainName: string]: SwapsFeatureFlags | unknown;
    };
  } | boolean;
}

// If we are in dev and on a testnet, just use mainnet feature flags,
// since we don't have feature flags for testnets in the API
export const getFeatureFlagChainId = (chainId: string): string =>
  typeof __DEV__ !== 'undefined' &&
  __DEV__ &&
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  allowedTestnetChainIds.includes(chainId as any)
    ? NETWORKS_CHAIN_ID.MAINNET
    : chainId;

// * Constants
export const SWAPS_SET_LIVENESS = 'SWAPS_SET_LIVENESS';
export const SWAPS_SET_HAS_ONBOARDED = 'SWAPS_SET_HAS_ONBOARDED';
const MAX_TOKENS_WITH_BALANCE = 5;

// * Action Creator
export const setSwapsLiveness = (
  chainId: string,
  featureFlags: SwapsFeatureFlags,
) => ({
  type: SWAPS_SET_LIVENESS,
  payload: { chainId, featureFlags },
});

export const setSwapsHasOnboarded = (hasOnboarded: boolean) => ({
  type: SWAPS_SET_HAS_ONBOARDED,
  payload: hasOnboarded,
});

// * Functions

/**
 * Processes and normalizes a token by removing unwanted properties
 * and ensuring consistent data types
 */
function processToken(token: Token | null): ProcessedToken | null {
  if (!token) return null;
  const { hasBalanceError, image, ...tokenData } = token;
  return {
    occurrences: 0,
    ...tokenData,
    decimals: Number(tokenData.decimals),
    address: tokenData.address.toLowerCase(),
  };
}

/**
 * Combines tokens from multiple sources with deduplication
 * Maintains first-occurrence-wins behavior
 */
function combineTokens(
  tokenSources: (Token[] | undefined)[],
): ProcessedToken[] {
  const tokenMap = new Map<string, ProcessedToken>();

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
  tokens: ProcessedToken[],
  tokenList: TokenList,
): ProcessedToken[] {
  if (!isMainnetByChainId(chainId)) {
    return tokens;
  }
  return tokens.map((token) => {
    const checksumAddress = safeToChecksumAddress(token.address);
    const tokenMetadata = checksumAddress ? tokenList[checksumAddress] : undefined;
    if (tokenMetadata) {
      return { ...token, name: tokenMetadata.name };
    }

    return token;
  });
}

// * Selectors
const chainIdSelector = selectEvmChainId;
const swapsStateSelector = (state: RootState): SwapsState => state.swaps;

/**
 * Returns the swaps liveness state
 */
export const swapsLivenessSelector = createSelector(
  swapsStateSelector,
  chainIdSelector,
  (swapsState, chainId) => {
    const chainState = swapsState[chainId] as SwapsChainState | undefined;
    return chainState?.isLive || false;
  },
);

export const swapsLivenessMultichainSelector = createSelector(
  [
    swapsStateSelector,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (state: RootState, chainId?: string): string | undefined =>
      chainId !== undefined ? chainId : selectChainId(state) as string | undefined,
  ],
  (swapsState, chainId) => {
    ///: BEGIN:ONLY_INCLUDE_IF(keyring-snaps)
    if (chainId === SolScope.Mainnet) {
      return true;
    }
    ///: END:ONLY_INCLUDE_IF(keyring-snaps)

    if (!chainId) return false;
    const chainState = swapsState?.[chainId] as
      | SwapsChainState
      | undefined;
    return chainState?.isLive || false;
  },
);

/**
 * Returns if smart transactions are enabled in feature flags
 */
export const swapsSmartTxFlagEnabled = createSelector(
  swapsStateSelector,
  (swapsState) => {
    const globalFlags = swapsState.featureFlags;
    const isEnabled = Boolean(globalFlags?.smartTransactions?.mobileActive);
    return isEnabled;
  },
);

/**
 * Returns the swaps feature flags
 */
export const selectSwapsChainFeatureFlags = createSelector(
  swapsStateSelector,
  (_state: RootState, transactionChainId?: string) =>
    transactionChainId || selectEvmChainId(_state),
  (swapsState, chainId) => {
    const chainState = swapsState[chainId] as SwapsChainState | undefined;
    return {
      ...(chainState?.featureFlags || {}),
      smartTransactions: {
        ...(chainState?.featureFlags?.smartTransactions || {}),
        ...(swapsState.featureFlags?.smartTransactions || {}),
      },
    };
  },
);

/**
 * Returns the swaps onboarded state
 */
export const swapsHasOnboardedSelector = createSelector(
  swapsStateSelector,
  (swapsState) => swapsState.hasOnboarded,
);

const selectSwapsControllerState = (state: RootState): SwapsControllerState =>
  state.engine.backgroundState.SwapsController as SwapsControllerState;

/**
 * Returns the swaps tokens from the state
 */
export const swapsControllerTokens = (state: RootState): Token[] | undefined =>
  (state.engine.backgroundState.SwapsController as SwapsControllerState)
    .tokens;

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
  (swapsTokens, tokens) =>
    combineTokens([swapsTokens as Token[], tokens as Token[]]),
);

const swapsControllerAndUserTokensMultichain = createDeepEqualSelector(
  swapsControllerTokens,
  selectAllTokens,
  selectSelectedInternalAccountAddress,
  (swapsTokens, allTokens, currentUserAddress) => {
    // Flatten user tokens from all chains
    const userTokensFlat: Token[] = [];
    if (allTokens && currentUserAddress) {
      const typedAllTokens = allTokens as AllTokens;
      for (const chainId in typedAllTokens) {
        const chainTokens = typedAllTokens[chainId];
        if (!chainTokens || !chainTokens[currentUserAddress]) continue;

        const userTokensForChain = chainTokens[currentUserAddress];
        if (Array.isArray(userTokensForChain)) {
          userTokensFlat.push(...userTokensForChain);
        }
      }
    }

    return combineTokens([swapsTokens as Token[], userTokensFlat]);
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

    return addMetadata(chainId, tokens, tokenList as TokenList);
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

/**
 * Returns a memoized object that only has the addesses of the tokens as keys
 * and undefined as value. Useful to check if a token is supported by swaps.
 */
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

/**
 * Returns a memoized object that only has the addresses cross chains of the tokens as keys
 * and undefined as value. Useful to check if a token is supported by swaps.
 */
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

/**
 * Returns an array of tokens to display by default on the selector modal
 * based on the current account's balances.
 */
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const typedBalances = balances as unknown as Record<string, number>;
    const tokensAddressesWithBalance = Object.entries(typedBalances)
      .filter(([, balance]) => balance !== 0)
      .sort(([, balanceA], [, balanceB]) => (lte(balanceB, balanceA) ? -1 : 1))
      .map(([address]) => address.toLowerCase());
    const tokensWithBalance: ProcessedToken[] = [];
    const originalTokens: ProcessedToken[] = [];

    for (let i = 0; i < baseTokens.length; i++) {
      if (tokensAddressesWithBalance.includes(baseTokens[i].address)) {
        tokensWithBalance.push(baseTokens[i]);
      } else {
        originalTokens.push(baseTokens[i]);
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
    return addMetadata(chainId, result, tokenList as TokenList);
  },
);

/**
 * Returns an array of tokens to display by default on the selector modal
 * based on the current account's balances.
 */
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
      .filter((token): token is ProcessedToken => Boolean(token));
    return addMetadata(chainId, result, tokenList as TokenList);
  },
);

// * Reducer
export const initialState: SwapsState = {
  isLive: true,
  hasOnboarded: true,
  featureFlags: undefined,
  '0x1': {
    isLive: true,
    featureFlags: undefined,
  },
};

function swapsReducer(
  state: SwapsState = initialState,
  action: SwapsAction = { type: '' },
): SwapsState {
  switch (action.type) {
    case SWAPS_SET_LIVENESS: {
      const payload = action.payload as {
        chainId: string;
        featureFlags?: SwapsFeatureFlags & {
          [chainName: string]: SwapsFeatureFlags | unknown;
        };
      };
      const { chainId: rawChainId, featureFlags } = payload;
      const chainId = getFeatureFlagChainId(rawChainId);

      const data = state[chainId] as SwapsChainState | undefined;

      const chainNoFlags: SwapsChainState = {
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
          smart_transactions: featureFlags.smart_transactions,
          smartTransactions: featureFlags.smartTransactions,
        },
      };

      // Testnet has the same name as mainnet, but occurs later in the map,
      // so we need to omit it from the mapping, otherwise it will override 0x1
      const noTestnetChainIdToNameMap = omit(
        CHAIN_ID_TO_NAME_MAP,
        toHex('1337'),
      );
      // Invert CHAIN_ID_TO_NAME_MAP to get chain name to ID mapping
      // It will be e.g. { 'ethereum': '0x1', 'bsc': '0x38' }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const chainNameToIdMap = invert(noTestnetChainIdToNameMap as any) as Record<
        string,
        string
      >;

      // Save chain-specific feature flags for each chain
      Object.keys(featureFlags).forEach((chainName) => {
        const chainIdForName = chainNameToIdMap[chainName];

        if (
          chainIdForName &&
          featureFlags[chainName] &&
          typeof featureFlags[chainName] === 'object'
        ) {
          const chainFeatureFlags = featureFlags[chainName] as SwapsFeatureFlags;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const chainLiveness = getSwapsLiveness(featureFlags as any, chainIdForName as `0x${string}`);

          const existingChainState = state[chainIdForName] as
            | SwapsChainState
            | undefined;
          newState[chainIdForName] = {
            ...existingChainState,
            featureFlags: chainFeatureFlags,
            isLive: chainLiveness,
          };

          if (chainIdForName === chainId && rawChainId !== chainId) {
            newState[rawChainId] = newState[chainIdForName];
          }
        }
      });

      return newState;
    }
    case SWAPS_SET_HAS_ONBOARDED: {
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
