export interface Bookmark {
  url: string;
  name?: string;
}

export type BookmarksState = Bookmark[];

export enum BookmarksActionType {
  ADD_BOOKMARK = 'ADD_BOOKMARK',
  REMOVE_BOOKMARK = 'REMOVE_BOOKMARK',
}

export interface BookmarksAction {
  type: BookmarksActionType;
  bookmark: Bookmark;
}
