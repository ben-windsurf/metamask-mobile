export interface BookmarksState extends Array<BookmarkItem> {}

interface BookmarkItem {
  url: string;
  name?: string;
}

export enum BookmarksActionType {
  ADD_BOOKMARK = 'ADD_BOOKMARK',
  REMOVE_BOOKMARK = 'REMOVE_BOOKMARK',
}

interface BookmarksAction {
  type: string;
  bookmark: BookmarkItem;
}

const bookmarksReducer = (
  state: BookmarksState,
  action: BookmarksAction = { type: '', bookmark: { url: '' } },
): BookmarksState => {
  if (!state) state = [];
  switch (action.type) {
    case BookmarksActionType.ADD_BOOKMARK:
      return [...state, action.bookmark];
    case BookmarksActionType.REMOVE_BOOKMARK:
      return state.filter((item) => item.url !== action.bookmark.url);
    default:
      return state;
  }
};

export default bookmarksReducer;
