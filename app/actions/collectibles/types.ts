import { type Action } from 'redux';

export enum CollectiblesActionType {
  ADD_FAVORITE_COLLECTIBLE = 'ADD_FAVORITE_COLLECTIBLE',
  REMOVE_FAVORITE_COLLECTIBLE = 'REMOVE_FAVORITE_COLLECTIBLE',
  SHOW_NFT_FETCHING_LOADER = 'SHOW_NFT_FETCHING_LOADER',
  HIDE_NFT_FETCHING_LOADER = 'HIDE_NFT_FETCHING_LOADER',
}

export interface Collectible {
  tokenId: string;
  address: string;
}

export type AddFavoriteCollectibleAction =
  Action<CollectiblesActionType.ADD_FAVORITE_COLLECTIBLE> & {
    selectedAddress: string;
    chainId: string;
    collectible: Collectible;
  };

export type RemoveFavoriteCollectibleAction =
  Action<CollectiblesActionType.REMOVE_FAVORITE_COLLECTIBLE> & {
    selectedAddress: string;
    chainId: string;
    collectible: Collectible;
  };

export type ShowNftFetchingLoaderAction =
  Action<CollectiblesActionType.SHOW_NFT_FETCHING_LOADER>;

export type HideNftFetchingLoaderAction =
  Action<CollectiblesActionType.HIDE_NFT_FETCHING_LOADER>;

export type CollectiblesAction =
  | AddFavoriteCollectibleAction
  | RemoveFavoriteCollectibleAction
  | ShowNftFetchingLoaderAction
  | HideNftFetchingLoaderAction;
