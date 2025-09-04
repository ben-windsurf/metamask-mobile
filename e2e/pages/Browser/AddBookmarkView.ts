import { AddBookmarkViewSelectorsIDs } from '../../selectors/Browser/AddBookmarkView.selectors';
import Gestures from '../../framework/Gestures';
import Matchers from '../../framework/Matchers';

/**
 * Page object model for the Add Bookmark view in the browser.
 * Provides methods to interact with bookmark creation functionality.
 */
class AddFavoritesView {
  /**
   * Gets the main container element for the add bookmark view.
   * @returns The container DetoxElement for interaction
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(AddBookmarkViewSelectorsIDs.CONTAINER);
  }

  /**
   * Gets the add bookmark confirmation button element.
   * Uses platform-specific selectors for iOS and Android.
   * @returns The add bookmark button DetoxElement for interaction
   */
  get addBookmarkButton(): DetoxElement {
    return device.getPlatform() === 'ios'
      ? Matchers.getElementByID(AddBookmarkViewSelectorsIDs.CONFIRM_BUTTON)
      : Matchers.getElementByLabel(AddBookmarkViewSelectorsIDs.CONFIRM_BUTTON);
  }

  /**
   * Taps the add bookmark confirmation button to save the bookmark.
   * Waits for the element to be available before tapping.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapAddBookmarksButton(): Promise<void> {
    await Gestures.waitAndTap(this.addBookmarkButton, {
      elemDescription: 'Tap on the add bookmark button',
    });
  }
}

export default new AddFavoritesView();
