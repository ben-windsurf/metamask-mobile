import { NetworkApprovalBottomSheetSelectorsIDs } from '../../selectors/Network/NetworkApprovalBottomSheet.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the Network Approval Bottom Sheet component.
 * Provides methods to interact with network approval UI elements in end-to-end tests.
 */
class NetworkApprovalBottomSheet {
  /**
   * Gets the main container element of the network approval bottom sheet.
   * @returns The container DetoxElement for the bottom sheet
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(
      NetworkApprovalBottomSheetSelectorsIDs.CONTAINER,
    );
  }

  /**
   * Gets the approve button element for confirming network approval.
   * @returns The approve button DetoxElement
   */
  get approvedButton(): DetoxElement {
    return Matchers.getElementByID(
      NetworkApprovalBottomSheetSelectorsIDs.APPROVE_BUTTON,
    );
  }
  /**
   * Gets the cancel button element for rejecting network approval.
   * @returns The cancel button DetoxElement
   */
  get cancelButton(): DetoxElement {
    return Matchers.getElementByID(
      NetworkApprovalBottomSheetSelectorsIDs.CANCEL_BUTTON,
    );
  }

  /**
   * Gets the display name element showing the network name.
   * @returns The display name DetoxElement
   */
  get displayName(): DetoxElement {
    return Matchers.getElementByID(
      NetworkApprovalBottomSheetSelectorsIDs.DISPLAY_NAME,
    );
  }

  /**
   * Taps the approve button to confirm network approval.
   * @returns Promise that resolves when the tap gesture is completed
   */
  async tapApproveButton(): Promise<void> {
    await Gestures.tap(this.approvedButton, {
      elemDescription: 'Approve Button in Network Approval Bottom Sheet',
    });
  }
  /**
   * Taps the cancel button to reject network approval.
   * @returns Promise that resolves when the tap gesture is completed
   */
  async tapCancelButton(): Promise<void> {
    await Gestures.tap(this.cancelButton, {
      elemDescription: 'Cancel Button in Network Approval Bottom Sheet',
    });
  }
}

export default new NetworkApprovalBottomSheet();
