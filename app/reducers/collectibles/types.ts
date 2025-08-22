import { Collectible } from '../../actions/collectibles/types';

export interface CollectiblesState {
  favorites: Record<string, Record<string, Collectible[]>>;
  isNftFetchingProgress: boolean;
}
