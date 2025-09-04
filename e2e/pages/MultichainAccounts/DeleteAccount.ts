import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { MultichainDeleteAccountSelectors } from '../../selectors/MultichainAccounts/DeleteAccount.selectors';

/**
 * Page object for the Delete Account screen in multichain accounts flow.
 * Provides methods to interact with delete account UI elements and perform deletion actions.
 */
class DeleteAccount {
  /**
   * Gets the main container element for the delete account screen.
   * @returns The delete account container element
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(
      MultichainDeleteAccountSelectors.DELETE_ACCOUNT_CONTAINER,
    );
  }

  /**
   * Gets the delete account button element.
   * @returns The delete account button element
   */
  get deleteAccountButton(): DetoxElement {
    return Matchers.getElementByID(
      MultichainDeleteAccountSelectors.DELETE_ACCOUNT_REMOVE_BUTTON,
    );
  }

  /**
   * Taps the delete account button to initiate account deletion.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapDeleteAccount(): Promise<void> {
    await Gestures.waitAndTap(this.deleteAccountButton, {
      elemDescription: 'Delete Account Button in Delete Account',
    });
  }
}

export default new DeleteAccount();
