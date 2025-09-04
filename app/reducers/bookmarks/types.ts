export interface Bookmark {
  url: string;
  name?: string;
}

export type BookmarksState = Bookmark[];

export enum BookmarksActionType {
  ADD_BOOKMARK = 'ADD_BOOKMARK',
  REMOVE_BOOKMARK = 'REMOVE_BOOKMARK',
}

export interface AddBookmarkAction {
  type: BookmarksActionType.ADD_BOOKMARK;
  bookmark: Bookmark;
}

export interface RemoveBookmarkAction {
  type: BookmarksActionType.REMOVE_BOOKMARK;
  bookmark: Bookmark;
}

export type BookmarksAction = AddBookmarkAction | RemoveBookmarkAction;
