import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { EditAccountNameSelectorIDs } from '../../selectors/wallet/EditAccountName.selectors';

/**
 * Page object for the Edit Account Name view in the wallet.
 * Provides methods to interact with account name editing functionality.
 */
class EditAccountNameView {
  /**
   * Gets the save button element for confirming account name changes.
   * @returns The save button DetoxElement
   */
  get saveButton(): DetoxElement {
    return Matchers.getElementByID(
      EditAccountNameSelectorIDs.EDIT_ACCOUNT_NAME_SAVE,
    );
  }
  /**
   * Gets the account name input field element.
   * @returns The account name input DetoxElement
   */
  get accountNameInput(): DetoxElement {
    return Matchers.getElementByID(
      EditAccountNameSelectorIDs.ACCOUNT_NAME_INPUT,
    );
  }

  /**
   * Taps the save button to confirm account name changes.
   * @returns Promise that resolves when the save action is complete
   */
  async tapSave(): Promise<void> {
    await Gestures.waitAndTap(this.saveButton, {
      elemDescription: 'Save button',
    });
  }

  /**
   * Updates the account name by typing in the input field.
   * @param accountName - The new account name to set
   * @returns Promise that resolves when the text input is complete
   */
  async updateAccountName(accountName: string): Promise<void> {
    await Gestures.typeText(this.accountNameInput, accountName, {
      hideKeyboard: true,
      clearFirst: true,
      elemDescription: 'Account name input',
    });
  }
}

export default new EditAccountNameView();
