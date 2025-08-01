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

interface ChainState {
  isLive: boolean;
  featureFlags?: Record<string, unknown>;
}

export interface SwapsState {
  isLive: boolean;
  hasOnboarded: boolean;
  featureFlags?: {
    smartTransactions?: {
      mobileActive?: boolean;
    };
    smart_transactions?: Record<string, unknown>;
  };
  [chainId: string]: unknown | ChainState;
}

interface SwapsLivenessAction {
  type: 'SWAPS_SET_LIVENESS';
  payload: {
    chainId: string;
    featureFlags: Record<string, unknown> | null;
  };
}

interface SwapsOnboardedAction {
  type: 'SWAPS_SET_HAS_ONBOARDED';
  payload: boolean;
}

type SwapsAction = SwapsLivenessAction | SwapsOnboardedAction;

export const getFeatureFlagChainId = (chainId: string): string =>
  typeof __DEV__ !== 'undefined' &&
  __DEV__ &&
  allowedTestnetChainIds.includes(chainId as `0x${string}`)
    ? NETWORKS_CHAIN_ID.MAINNET
    : chainId;

export const SWAPS_SET_LIVENESS = 'SWAPS_SET_LIVENESS';
export const SWAPS_SET_HAS_ONBOARDED = 'SWAPS_SET_HAS_ONBOARDED';
const MAX_TOKENS_WITH_BALANCE = 5;

export const setSwapsLiveness = (
  chainId: string,
  featureFlags: Record<string, unknown> | null,
) => ({
  type: SWAPS_SET_LIVENESS,
  payload: { chainId, featureFlags },
});
export const setSwapsHasOnboarded = (hasOnboarded: boolean) => ({
  type: SWAPS_SET_HAS_ONBOARDED,
  payload: hasOnboarded,
});

function processToken(token: {
  address?: string;
  decimals?: string | number;
  hasBalanceError?: boolean;
  image?: string;
  [key: string]: unknown;
}) {
  if (!token) return null;
  const { hasBalanceError, image, ...tokenData } = token;
  return {
    occurrences: 0,
    ...tokenData,
    decimals: Number(tokenData.decimals),
    address: (tokenData.address as string)?.toLowerCase(),
  };
}

function combineTokens(
  tokenSources: (Record<string, unknown>[] | null | undefined)[],
) {
  const tokenMap = new Map();

  for (const tokens of tokenSources) {
    if (!tokens) continue;

    for (const token of tokens as Record<string, unknown>[]) {
      const processedToken = processToken(token as Record<string, unknown>);
      if (processedToken && !tokenMap.has(processedToken.address)) {
        tokenMap.set(processedToken.address, processedToken);
      }
    }
  }

  return Array.from(tokenMap.values());
}

function addMetadata(chainId: string, tokens: unknown[], tokenList: unknown) {
  if (!isMainnetByChainId(chainId)) {
    return tokens;
  }
  return tokens.map((token) => {
    const tokenMetadata =
      tokenList && (token as Record<string, unknown>).address
        ? (tokenList as Record<string, unknown>)[
            safeToChecksumAddress(
              (token as Record<string, unknown>).address as string,
            )
          ]
        : undefined;
    if (tokenMetadata) {
      return {
        ...token,
        name: (tokenMetadata as Record<string, unknown>).name,
      };
    }

    return token;
  });
}

const chainIdSelector = selectEvmChainId;
const swapsStateSelector = (state: Record<string, unknown>) =>
  (state as Record<string, unknown>).swaps;

export const swapsLivenessSelector = createSelector(
  swapsStateSelector,
  chainIdSelector,
  (swapsState, chainId) => swapsState[chainId]?.isLive || false,
);

export const swapsLivenessMultichainSelector = createSelector(
  [
    swapsStateSelector,
    (state: Record<string, unknown>, chainId?: string) =>
      chainId !== undefined ? chainId : selectChainId(state),
  ],
  (swapsState, chainId) => {
    if (chainId === SolScope.Mainnet) {
      return true;
    }

    return swapsState?.[chainId]?.isLive || false;
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
  (_state: Record<string, unknown>, transactionChainId?: string) =>
    transactionChainId || selectEvmChainId(_state),
  (swapsState, chainId) => ({
    ...(swapsState[chainId]?.featureFlags || {}),
    smartTransactions: {
      ...(swapsState[chainId]?.featureFlags?.smartTransactions || {}),
      ...(swapsState.featureFlags?.smartTransactions || {}),
    },
  }),
);

export const swapsHasOnboardedSelector = createSelector(
  swapsStateSelector,
  (swapsState) => swapsState.hasOnboarded,
);

const selectSwapsControllerState = (state: Record<string, unknown>) =>
  (state as Record<string, unknown>).engine.backgroundState.SwapsController;

export const swapsControllerTokens = (state: Record<string, unknown>) =>
  (state as Record<string, unknown>).engine.backgroundState.SwapsController
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
  (swapsTokens, tokens) => combineTokens([swapsTokens, tokens]),
);

const swapsControllerAndUserTokensMultichain = createDeepEqualSelector(
  swapsControllerTokens,
  selectAllTokens,
  selectSelectedInternalAccountAddress,
  (swapsTokens, allTokens, currentUserAddress) => {
    const userTokensFlat: unknown[] = [];
    if (allTokens && currentUserAddress) {
      for (const chainId in allTokens) {
        const chainTokens = (allTokens as Record<string, unknown>)[chainId];
        if (!chainTokens?.[currentUserAddress]) continue;

        const userTokensForChain = (chainTokens as Record<string, unknown>)[
          currentUserAddress
        ];
        if (Array.isArray(userTokensForChain)) {
          userTokensFlat.push(...(userTokensForChain as unknown[]));
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
    const tokensWithBalance: unknown[] = [];
    const originalTokens: unknown[] = [];

    for (const [, token] of baseTokens.entries()) {
      if (
        tokensAddressesWithBalance.includes(
          (token as Record<string, unknown>).address as string,
        )
      ) {
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
    const result = (topAssetsData as Record<string, unknown>[])
      .map(({ address }: Record<string, unknown>) =>
        tokens?.find((token: Record<string, unknown>) =>
          areAddressesEqual(
            (token as Record<string, unknown>).address as string,
            address as string,
          ),
        ),
      )
      .filter(Boolean);
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

function swapsReducer(
  action: SwapsAction,
  state: SwapsState = initialState,
): SwapsState {
  switch (action.type) {
    case SWAPS_SET_LIVENESS: {
      const { chainId: rawChainId, featureFlags } = (
        action as SwapsLivenessAction
      ).payload;
      const chainId = getFeatureFlagChainId(rawChainId);

      const data = state[chainId] as ChainState | undefined;

      const chainNoFlags: ChainState = {
        ...(data || {}),
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

      const typedFeatureFlags = featureFlags as Record<string, unknown> & {
        smart_transactions?: Record<string, unknown>;
        smartTransactions?: { mobileActive?: boolean };
      };

      const newState: SwapsState = {
        ...state,
        featureFlags: {
          smart_transactions: typedFeatureFlags.smart_transactions,
          smartTransactions: typedFeatureFlags.smartTransactions,
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
          featureFlags[chainName] &&
          typeof featureFlags[chainName] === 'object'
        ) {
          const chainFeatureFlags = featureFlags[chainName];
          const chainLiveness = getSwapsLiveness(
            typedFeatureFlags as Record<string, unknown>,
            chainIdForName as string,
          );

          newState[chainIdForName] = {
            ...((state[chainIdForName] as ChainState) || {}),
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
