export interface Bookmark {
  name: string;
  url: string;
}

export type BookmarksState = Bookmark[];

export enum BookmarkActionType {
  ADD_BOOKMARK = 'ADD_BOOKMARK',
  REMOVE_BOOKMARK = 'REMOVE_BOOKMARK',
}

interface AddBookmarkAction {
  type: BookmarkActionType.ADD_BOOKMARK;
  bookmark: Bookmark;
}

interface RemoveBookmarkAction {
  type: BookmarkActionType.REMOVE_BOOKMARK;
  bookmark: Bookmark;
}

type BookmarkAction = AddBookmarkAction | RemoveBookmarkAction;

const initialState: BookmarksState = [];

const bookmarksReducer = (
  state: BookmarksState = initialState,
  action: BookmarkAction,
): BookmarksState => {
  switch (action.type) {
    case BookmarkActionType.ADD_BOOKMARK:
      return [...state, action.bookmark];
    case BookmarkActionType.REMOVE_BOOKMARK:
      return state.filter((item) => item.url !== action.bookmark.url);
    default:
      return state;
  }
};

export default bookmarksReducer;
