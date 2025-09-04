import { createSelector } from 'reselect';
import { selectChainId } from '../../selectors/networkController';
import {
  selectAllNftContracts,
  selectAllNfts,
} from '../../selectors/nftController';
import { selectSelectedInternalAccountAddress } from '../../selectors/accountsController';
import { compareTokenIds } from '../../util/tokens';
import { createDeepEqualSelector } from '../../selectors/util';
import {
  CollectiblesState,
  CollectiblesAction,
  CollectiblesActionType,
  CollectibleItem,
  ShowNftFetchingLoaderAction,
  HideNftFetchingLoaderAction,
} from './types';

interface RootState {
  collectibles: CollectiblesState;
}

const favoritesSelector = (state: RootState) => state.collectibles.favorites;

export const isNftFetchingProgressSelector = (state: RootState): boolean =>
  state.collectibles.isNftFetchingProgress;

export const collectibleContractsSelector = createSelector(
  selectSelectedInternalAccountAddress,
  selectChainId,
  selectAllNftContracts,
  (address, chainId, allNftContracts) => {
    if (!address || !allNftContracts[address]) return [];
    const addressContracts = allNftContracts[address];
    return addressContracts[chainId as `0x${string}`] || [];
  },
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
  (address, chainId, allNfts) => {
    if (!address || !allNfts[address]) return [];
    const addressNfts = allNfts[address];
    return addressNfts[chainId as `0x${string}`] || [];
  },
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
  (address, chainId, favorites) => {
    if (!address || !favorites[address]) return [];
    const addressFavorites = favorites[address];
    return addressFavorites[chainId as `0x${string}`] || [];
  },
);

export const isCollectibleInFavoritesSelector = createSelector(
  favoritesCollectiblesSelector,
  (_state: RootState, collectible: CollectibleItem) => collectible,
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

export const ADD_FAVORITE_COLLECTIBLE =
  CollectiblesActionType.ADD_FAVORITE_COLLECTIBLE;
export const REMOVE_FAVORITE_COLLECTIBLE =
  CollectiblesActionType.REMOVE_FAVORITE_COLLECTIBLE;
export const SHOW_NFT_FETCHING_LOADER =
  CollectiblesActionType.SHOW_NFT_FETCHING_LOADER;
export const HIDE_NFT_FETCHING_LOADER =
  CollectiblesActionType.HIDE_NFT_FETCHING_LOADER;

const initialState: CollectiblesState = {
  favorites: {},
  isNftFetchingProgress: false,
};

/* eslint-disable @typescript-eslint/default-param-last */
const collectiblesFavoritesReducer = (
  state: CollectiblesState = initialState,
  action: CollectiblesAction,
): CollectiblesState => {
  switch (action.type) {
    case CollectiblesActionType.ADD_FAVORITE_COLLECTIBLE: {
      const { selectedAddress, chainId, collectible } = action;
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

export const showNftFetchingLoadingIndicator =
  (): ShowNftFetchingLoaderAction => ({
    type: CollectiblesActionType.SHOW_NFT_FETCHING_LOADER,
  });

export const hideNftFetchingLoadingIndicator =
  (): HideNftFetchingLoaderAction => ({
    type: CollectiblesActionType.HIDE_NFT_FETCHING_LOADER,
  });

export default collectiblesFavoritesReducer;
export * from './types';
