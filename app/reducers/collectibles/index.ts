import { createSelector } from 'reselect';
import { selectChainId } from '../../selectors/networkController';
import {
  selectAllNftContracts,
  selectAllNfts,
} from '../../selectors/nftController';
import { selectSelectedInternalAccountAddress } from '../../selectors/accountsController';
import { compareTokenIds } from '../../util/tokens';
import { createDeepEqualSelector } from '../../selectors/util';

export interface CollectiblesState {
  favorites: Record<
    string,
    Record<
      string,
      {
        tokenId: string;
        address: string;
      }[]
    >
  >;
  isNftFetchingProgress: boolean;
}

export enum CollectiblesActionType {
  ADD_FAVORITE_COLLECTIBLE = 'ADD_FAVORITE_COLLECTIBLE',
  REMOVE_FAVORITE_COLLECTIBLE = 'REMOVE_FAVORITE_COLLECTIBLE',
  SHOW_NFT_FETCHING_LOADER = 'SHOW_NFT_FETCHING_LOADER',
  HIDE_NFT_FETCHING_LOADER = 'HIDE_NFT_FETCHING_LOADER',
}

interface CollectibleItem {
  tokenId: string;
  address: string;
}

interface CollectiblesAction {
  type: string;
  selectedAddress?: string;
  chainId?: string;
  collectible?: CollectibleItem;
}

const favoritesSelector = (state: { collectibles: CollectiblesState }) =>
  state.collectibles.favorites;

export const isNftFetchingProgressSelector = (state: {
  collectibles: CollectiblesState;
}) => state.collectibles.isNftFetchingProgress;

export const collectibleContractsSelector = createSelector(
  selectSelectedInternalAccountAddress,
  selectChainId,
  selectAllNftContracts,
  (address, chainId, allNftContracts) =>
    (address &&
      chainId &&
      allNftContracts[address]?.[chainId as `0x${string}`]) ||
    [],
);

export const multichainCollectibleContractsSelector = createSelector(
  selectSelectedInternalAccountAddress,
  selectAllNftContracts,
  (address, allNftContracts) => (address && allNftContracts[address]) || {},
);

export const collectiblesSelector = createDeepEqualSelector(
  selectSelectedInternalAccountAddress,
  selectChainId,
  selectAllNfts,
  (address, chainId, allNfts) =>
    (address && chainId && allNfts[address]?.[chainId as `0x${string}`]) || [],
);

export const multichainCollectiblesSelector = createDeepEqualSelector(
  selectSelectedInternalAccountAddress,
  selectAllNfts,
  (address, allNfts) => (address && allNfts[address]) || {},
);

export const favoritesCollectiblesSelector = createSelector(
  selectSelectedInternalAccountAddress,
  selectChainId,
  favoritesSelector,
  (address, chainId, favorites) =>
    (address && chainId && favorites[address]?.[chainId]) || [],
);

export const isCollectibleInFavoritesSelector = createSelector(
  favoritesCollectiblesSelector,
  (_state: { collectibles: CollectiblesState }, collectible: CollectibleItem) =>
    collectible,
  (favoriteCollectibles, collectible) =>
    Boolean(
      favoriteCollectibles.find(
        ({ tokenId, address }: CollectibleItem) =>
          compareTokenIds(tokenId, collectible.tokenId) &&
          address === collectible.address,
      ),
    ),
);

const getFavoritesCollectibles = (
  favoriteCollectibles: Record<string, Record<string, CollectibleItem[]>>,
  selectedAddress: string,
  chainId: string,
): CollectibleItem[] => favoriteCollectibles[selectedAddress]?.[chainId] || [];

const initialState: CollectiblesState = {
  favorites: {},
  isNftFetchingProgress: false,
};

const collectiblesFavoritesReducer = (
  state: CollectiblesState,
  action: CollectiblesAction = { type: '' },
): CollectiblesState => {
  if (!state) state = initialState;
  switch (action.type) {
    case CollectiblesActionType.ADD_FAVORITE_COLLECTIBLE: {
      const { selectedAddress, chainId, collectible } = action;
      if (!selectedAddress || !chainId || !collectible) return state;

      const collectibles = getFavoritesCollectibles(
        state.favorites,
        selectedAddress,
        chainId,
      );
      collectibles.push({
        tokenId: collectible.tokenId,
        address: collectible.address,
      });
      const selectedAddressCollectibles =
        state.favorites[selectedAddress] || {};
      return {
        ...state,
        favorites: {
          ...state.favorites,
          [selectedAddress]: {
            ...selectedAddressCollectibles,
            [chainId]: collectibles.slice(),
          },
        },
      };
    }
    case CollectiblesActionType.REMOVE_FAVORITE_COLLECTIBLE: {
      const { selectedAddress, chainId, collectible } = action;
      if (!selectedAddress || !chainId || !collectible) return state;

      const collectibles = getFavoritesCollectibles(
        state.favorites,
        selectedAddress,
        chainId,
      );
      const indexToRemove = collectibles.findIndex(
        ({ tokenId, address }) =>
          compareTokenIds(tokenId, collectible.tokenId) &&
          address === collectible.address,
      );
      collectibles.splice(indexToRemove, 1);
      const selectedAddressCollectibles =
        state.favorites[selectedAddress] || {};
      return {
        ...state,
        favorites: {
          ...state.favorites,
          [selectedAddress]: {
            ...selectedAddressCollectibles,
            [chainId]: collectibles.slice(),
          },
        },
      };
    }
    case CollectiblesActionType.SHOW_NFT_FETCHING_LOADER: {
      return {
        ...state,
        isNftFetchingProgress: true,
      };
    }
    case CollectiblesActionType.HIDE_NFT_FETCHING_LOADER: {
      return {
        ...state,
        isNftFetchingProgress: false,
      };
    }
    default: {
      return state;
    }
  }
};

export const showNftFetchingLoadingIndicator = () => ({
  type: CollectiblesActionType.SHOW_NFT_FETCHING_LOADER,
});

export const hideNftFetchingLoadingIndicator = () => ({
  type: CollectiblesActionType.HIDE_NFT_FETCHING_LOADER,
});

export default collectiblesFavoritesReducer;
