import {
  DeleteWalletModalSelectorsIDs,
  DeleteWalletModalSelectorsText,
} from '../../../selectors/Settings/SecurityAndPrivacy/DeleteWalletModal.selectors';
import Matchers from '../../../framework/Matchers';
import Gestures from '../../../framework/Gestures';

/**
 * Page object model for the Delete Wallet Modal in end-to-end tests.
 * Provides methods to interact with the delete wallet confirmation dialog.
 */
class DeleteWalletModal {
  /**
   * Gets the main container element of the delete wallet modal.
   * @returns The container DetoxElement for the modal
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(DeleteWalletModalSelectorsIDs.CONTAINER);
  }

  /**
   * Gets the "I Understand" button element.
   * @returns The understand button DetoxElement
   */
  get understandButton(): DetoxElement {
    return Matchers.getElementByText(
      DeleteWalletModalSelectorsText.UNDERSTAND_BUTTON,
    );
  }

  /**
   * Gets the "Delete My Wallet" button element.
   * @returns The delete wallet button DetoxElement
   */
  get deleteWalletButton(): DetoxElement {
    return Matchers.getElementByText(DeleteWalletModalSelectorsText.DELETE_MY);
  }

  /**
   * Gets the delete confirmation input field element.
   * @returns The delete input DetoxElement
   */
  get deleteInput(): DetoxElement {
    return Matchers.getElementByID(DeleteWalletModalSelectorsIDs.INPUT);
  }

  /**
   * Taps the "I Understand" button in the delete wallet modal.
   * @returns Promise that resolves when the button is tapped
   */
  async tapIUnderstandButton(): Promise<void> {
    await Gestures.waitAndTap(this.understandButton, {
      elemDescription: 'I Understand Button in Delete Wallet Modal',
    });
  }

  /**
   * Taps the "Delete My Wallet" button to confirm wallet deletion.
   * @returns Promise that resolves when the button is tapped
   */
  async tapDeleteMyWalletButton(): Promise<void> {
    await Gestures.waitAndTap(this.deleteWalletButton, {
      elemDescription: 'Delete My Wallet Button in Delete Wallet Modal',
    });
  }

  async typeDeleteInInputBox(): Promise<void> {
    await Gestures.typeText(this.deleteInput, 'delete', {
      elemDescription: 'Delete input box in Delete Wallet Modal',
    });
  }
}

export default new DeleteWalletModal();
