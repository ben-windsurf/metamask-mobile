export interface CollectibleFavorite {
  tokenId: string;
  address: string;
}

export interface CollectiblesState {
  favorites: {
    [address: string]: {
      [chainId: string]: CollectibleFavorite[];
    };
  };
  isNftFetchingProgress: boolean;
}

export enum CollectiblesActionType {
  ADD_FAVORITE_COLLECTIBLE = 'ADD_FAVORITE_COLLECTIBLE',
  REMOVE_FAVORITE_COLLECTIBLE = 'REMOVE_FAVORITE_COLLECTIBLE',
  SHOW_NFT_FETCHING_LOADER = 'SHOW_NFT_FETCHING_LOADER',
  HIDE_NFT_FETCHING_LOADER = 'HIDE_NFT_FETCHING_LOADER',
}

export interface CollectiblesAction {
  type: CollectiblesActionType;
  selectedAddress?: string;
  chainId?: string;
  collectible?: {
    tokenId: string;
    address: string;
  };
}
