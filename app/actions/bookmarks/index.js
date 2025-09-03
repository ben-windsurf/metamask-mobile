/**
 * Creates an action to add a bookmark to the browser bookmarks list
 * @param {Object} bookmark - The bookmark object to add
 * @param {string} bookmark.url - The URL of the bookmarked page
 * @param {string} bookmark.name - The display name of the bookmark
 * @returns {Object} Redux action object with type and bookmark payload
 */
export function addBookmark(bookmark) {
  return {
    type: 'ADD_BOOKMARK',
    bookmark,
  };
}

/**
 * Creates an action to remove a bookmark from the browser bookmarks list
 * @param {Object} bookmark - The bookmark object to remove
 * @param {string} bookmark.url - The URL of the bookmark to remove
 * @param {string} bookmark.name - The display name of the bookmark to remove
 * @returns {Object} Redux action object with type and bookmark payload
 */
export function removeBookmark(bookmark) {
  return {
    type: 'REMOVE_BOOKMARK',
    bookmark,
  };
}
