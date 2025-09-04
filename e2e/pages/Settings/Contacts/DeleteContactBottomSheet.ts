import Matchers from '../../../framework/Matchers';
import Gestures from '../../../framework/Gestures';
import { DeleteContactBottomSheetSelectorsText } from '../../../selectors/Settings/Contacts/DeleteContactBottomSheet.selectors';

/**
 * Page object model for the Delete Contact Bottom Sheet in the Settings section.
 * Provides methods to interact with the delete contact confirmation modal.
 */
class DeleteContactBottomSheet {
  /**
   * Gets the title element of the delete contact bottom sheet.
   * @returns The title element
   */
  get title(): DetoxElement {
    return Matchers.getElementByText(
      DeleteContactBottomSheetSelectorsText.MODAL_TITLE,
    );
  }

  /**
   * Gets the delete button element with platform-specific handling.
   * Uses different matchers for iOS and Android platforms.
   * @returns The delete button element
   */
  get deleteButton(): DetoxElement {
    return device.getPlatform() === 'ios'
      ? Matchers.getElementByText(
          DeleteContactBottomSheetSelectorsText.DELETE_BUTTON,
          1,
        )
      : Matchers.getElementByLabel(
          DeleteContactBottomSheetSelectorsText.DELETE_BUTTON,
        );
  }

  /**
   * Taps the delete button to confirm contact deletion.
   * Waits for the button to be available before tapping.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapDeleteButton(): Promise<void> {
    await Gestures.waitAndTap(this.deleteButton, {
      elemDescription: 'Delete Button in Delete Contact Bottom Sheet',
    });
  }
}

export default new DeleteContactBottomSheet();
