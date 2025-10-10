import {
  Bookmark,
  BookmarkActionType,
} from '../../reducers/bookmarks/index';

export function addBookmark(bookmark: Bookmark) {
  return {
    type: BookmarkActionType.ADD_BOOKMARK,
    bookmark,
  } as const;
}

export function removeBookmark(bookmark: Bookmark) {
  return {
    type: BookmarkActionType.REMOVE_BOOKMARK,
    bookmark,
  } as const;
}
