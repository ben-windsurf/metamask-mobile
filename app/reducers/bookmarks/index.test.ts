import bookmarksReducer, {
  Bookmark,
  BookmarksState,
  BookmarkActionType,
} from './index';

describe('bookmarksReducer', () => {
  const initialState: BookmarksState = [];

  it('should return the initial state', () => {
    const action = { type: 'UNKNOWN_ACTION' } as any;
    expect(bookmarksReducer(undefined, action)).toEqual(initialState);
  });

  describe('ADD_BOOKMARK', () => {
    it('should add a bookmark to empty state', () => {
      const bookmark: Bookmark = {
        name: 'MetaMask',
        url: 'https://metamask.io',
      };

      const action = {
        type: BookmarkActionType.ADD_BOOKMARK,
        bookmark,
      };

      const expectedState: BookmarksState = [bookmark];
      const newState = bookmarksReducer(initialState, action);

      expect(newState).toEqual(expectedState);
      expect(newState).not.toBe(initialState);
    });

    it('should add a bookmark to existing state', () => {
      const existingBookmark: Bookmark = {
        name: 'Ethereum',
        url: 'https://ethereum.org',
      };

      const newBookmark: Bookmark = {
        name: 'MetaMask',
        url: 'https://metamask.io',
      };

      const state: BookmarksState = [existingBookmark];

      const action = {
        type: BookmarkActionType.ADD_BOOKMARK,
        bookmark: newBookmark,
      };

      const expectedState: BookmarksState = [existingBookmark, newBookmark];
      const newState = bookmarksReducer(state, action);

      expect(newState).toEqual(expectedState);
      expect(newState.length).toBe(2);
    });

    it('should allow duplicate bookmarks with same URL', () => {
      const bookmark: Bookmark = {
        name: 'MetaMask',
        url: 'https://metamask.io',
      };

      const duplicateBookmark: Bookmark = {
        name: 'MetaMask Copy',
        url: 'https://metamask.io',
      };

      const state: BookmarksState = [bookmark];

      const action = {
        type: BookmarkActionType.ADD_BOOKMARK,
        bookmark: duplicateBookmark,
      };

      const newState = bookmarksReducer(state, action);

      expect(newState.length).toBe(2);
      expect(newState).toContain(bookmark);
      expect(newState).toContain(duplicateBookmark);
    });
  });

  describe('REMOVE_BOOKMARK', () => {
    it('should remove a bookmark by URL', () => {
      const bookmark1: Bookmark = {
        name: 'MetaMask',
        url: 'https://metamask.io',
      };

      const bookmark2: Bookmark = {
        name: 'Ethereum',
        url: 'https://ethereum.org',
      };

      const state: BookmarksState = [bookmark1, bookmark2];

      const action = {
        type: BookmarkActionType.REMOVE_BOOKMARK,
        bookmark: bookmark1,
      };

      const expectedState: BookmarksState = [bookmark2];
      const newState = bookmarksReducer(state, action);

      expect(newState).toEqual(expectedState);
      expect(newState.length).toBe(1);
    });

    it('should handle removing non-existent bookmark', () => {
      const bookmark1: Bookmark = {
        name: 'MetaMask',
        url: 'https://metamask.io',
      };

      const bookmark2: Bookmark = {
        name: 'Ethereum',
        url: 'https://ethereum.org',
      };

      const state: BookmarksState = [bookmark1];

      const action = {
        type: BookmarkActionType.REMOVE_BOOKMARK,
        bookmark: bookmark2,
      };

      const newState = bookmarksReducer(state, action);

      expect(newState).toEqual(state);
      expect(newState.length).toBe(1);
    });

    it('should remove all bookmarks with matching URL', () => {
      const bookmark1: Bookmark = {
        name: 'MetaMask',
        url: 'https://metamask.io',
      };

      const bookmark2: Bookmark = {
        name: 'MetaMask Copy',
        url: 'https://metamask.io',
      };

      const bookmark3: Bookmark = {
        name: 'Ethereum',
        url: 'https://ethereum.org',
      };

      const state: BookmarksState = [bookmark1, bookmark2, bookmark3];

      const action = {
        type: BookmarkActionType.REMOVE_BOOKMARK,
        bookmark: bookmark1,
      };

      const expectedState: BookmarksState = [bookmark3];
      const newState = bookmarksReducer(state, action);

      expect(newState).toEqual(expectedState);
      expect(newState.length).toBe(1);
    });

    it('should return empty array when removing last bookmark', () => {
      const bookmark: Bookmark = {
        name: 'MetaMask',
        url: 'https://metamask.io',
      };

      const state: BookmarksState = [bookmark];

      const action = {
        type: BookmarkActionType.REMOVE_BOOKMARK,
        bookmark,
      };

      const newState = bookmarksReducer(state, action);

      expect(newState).toEqual([]);
      expect(newState.length).toBe(0);
    });
  });
});
