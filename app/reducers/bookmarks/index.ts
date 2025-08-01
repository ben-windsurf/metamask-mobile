import { BookmarksState, BookmarksAction, BookmarksActionType } from './types';

const bookmarksReducer = (
  action: BookmarksAction,
  state: BookmarksState = [],
): BookmarksState => {
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
