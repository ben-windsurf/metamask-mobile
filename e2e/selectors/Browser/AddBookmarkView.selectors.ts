/**
 * Selector IDs for the Add Bookmark view in E2E tests.
 * Contains test identifiers for UI elements in the bookmark creation screen.
 */
export const AddBookmarkViewSelectorsIDs = {
  CANCEL_BUTTON: 'add-bookmark-cancel-button',
  CONFIRM_BUTTON: 'add-bookmark-confirm-button',
  CONTAINER: 'add-bookmark-screen',
  BOOKMARK_TITLE: 'add-bookmark-title',
  URL_TEXT: 'add-bookmark-url',
} as const;

/**
 * Type definition for AddBookmarkViewSelectorsIDs constant.
 * Provides type safety for accessing bookmark view selector properties.
 */
export type AddBookmarkViewSelectorsIDsType =
  typeof AddBookmarkViewSelectorsIDs;
