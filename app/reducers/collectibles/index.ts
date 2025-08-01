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
  CollectibleFavorite,
} from './types';

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
    allNftContracts[address || '']?.[chainId as `0x${string}`] || [],
);

export const multichainCollectibleContractsSelector = createSelector(
  selectSelectedInternalAccountAddress,
  selectAllNftContracts,
  (address, allNftContracts) => allNftContracts[address || ''] || {},
);

export const collectiblesSelector = createDeepEqualSelector(
  selectSelectedInternalAccountAddress,
  selectChainId,
  selectAllNfts,
  (address, chainId, allNfts) =>
    allNfts[address || '']?.[chainId as `0x${string}`] || [],
);

export const multichainCollectiblesSelector = createDeepEqualSelector(
  selectSelectedInternalAccountAddress,
  selectAllNfts,
  (address, allNfts) => allNfts[address || ''] || {},
);

export const favoritesCollectiblesSelector = createSelector(
  selectSelectedInternalAccountAddress,
  selectChainId,
  favoritesSelector,
  (address, chainId, favorites) =>
    favorites[address || '']?.[chainId || ''] || [],
);

export const isCollectibleInFavoritesSelector = createSelector(
  favoritesCollectiblesSelector,
  (_state: unknown, collectible: { tokenId: string; address: string }) =>
    collectible,
  (favoriteCollectibles, collectible) =>
    Boolean(
      favoriteCollectibles.find(
        ({ tokenId, address }: CollectibleFavorite) =>
          compareTokenIds(tokenId, collectible.tokenId) &&
          address === collectible.address,
      ),
    ),
);

const getFavoritesCollectibles = (
  favoriteCollectibles: CollectiblesState['favorites'],
  selectedAddress: string,
  chainId: string,
): CollectibleFavorite[] =>
  favoriteCollectibles[selectedAddress]?.[chainId] || [];

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

const collectiblesFavoritesReducer = (
  action: CollectiblesAction,
  state: CollectiblesState = initialState,
): CollectiblesState => {
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
