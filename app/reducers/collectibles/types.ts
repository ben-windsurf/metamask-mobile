export interface CollectibleItem {
  tokenId: string;
  address: string;
}

export interface CollectiblesState {
  favorites: Record<string, Record<string, CollectibleItem[]>>;
  isNftFetchingProgress: boolean;
}

export enum CollectiblesActionType {
  ADD_FAVORITE_COLLECTIBLE = 'ADD_FAVORITE_COLLECTIBLE',
  REMOVE_FAVORITE_COLLECTIBLE = 'REMOVE_FAVORITE_COLLECTIBLE',
  SHOW_NFT_FETCHING_LOADER = 'SHOW_NFT_FETCHING_LOADER',
  HIDE_NFT_FETCHING_LOADER = 'HIDE_NFT_FETCHING_LOADER',
}

export interface AddFavoriteCollectibleAction {
  type: CollectiblesActionType.ADD_FAVORITE_COLLECTIBLE;
  selectedAddress: string;
  chainId: string;
  collectible: CollectibleItem;
}

export interface RemoveFavoriteCollectibleAction {
  type: CollectiblesActionType.REMOVE_FAVORITE_COLLECTIBLE;
  selectedAddress: string;
  chainId: string;
  collectible: CollectibleItem;
}

export interface ShowNftFetchingLoaderAction {
  type: CollectiblesActionType.SHOW_NFT_FETCHING_LOADER;
}

export interface HideNftFetchingLoaderAction {
  type: CollectiblesActionType.HIDE_NFT_FETCHING_LOADER;
}

export type CollectiblesAction =
  | AddFavoriteCollectibleAction
  | RemoveFavoriteCollectibleAction
  | ShowNftFetchingLoaderAction
  | HideNftFetchingLoaderAction;
