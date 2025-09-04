import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { AddNewAccountIds } from '../../selectors/MultiSRP/AddHdAccount.selectors';

/**
 * Page object for the Add New Account sheet in the wallet.
 * Provides methods to interact with the account creation flow.
 */
class AddNewAccountSheet {
  /**
   * Gets the confirm button element for creating a new account.
   * @returns The confirm button element
   */
  get confirmButton() {
    return Matchers.getElementByID(AddNewAccountIds.CONFIRM);
  }

  /**
   * Taps the confirm button to create a new account.
   * Waits for the button to be available before tapping.
   */
  async tapConfirmButton() {
    await Gestures.waitAndTap(this.confirmButton);
  }
}

export default new AddNewAccountSheet();
