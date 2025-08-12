export interface Bookmark {
  url: string;
  name?: string;
}

export type BookmarksState = Bookmark[];

interface BookmarksAction {
  type: string;
  bookmark: Bookmark;
}

const bookmarksReducer = (
  action: BookmarksAction,
  state: BookmarksState = [],
): BookmarksState => {
  switch (action.type) {
    case 'ADD_BOOKMARK':
      return [...state, action.bookmark];
    case 'REMOVE_BOOKMARK':
      return state.filter((item) => item.url !== action.bookmark.url);
    default:
      return state;
  }
};
export default bookmarksReducer;
