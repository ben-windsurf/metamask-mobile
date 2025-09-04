import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { EditAccountNameIds } from '../../selectors/MultichainAccounts/EditAccountName.selectors';

/**
 * Page object for the Edit Account Name screen in end-to-end tests.
 * Provides methods to interact with account name editing functionality.
 */
class EditAccountName {
  /**
   * Gets the main container element for the edit account name screen.
   * @returns The container DetoxElement
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(
      EditAccountNameIds.EDIT_ACCOUNT_NAME_CONTAINER,
    );
  }

  /**
   * Gets the account name input field element.
   * @returns The account name input DetoxElement
   */
  get accountNameInput(): DetoxElement {
    return Matchers.getElementByID(EditAccountNameIds.ACCOUNT_NAME_INPUT);
  }

  /**
   * Gets the save button element.
   * @returns The save button DetoxElement
   */
  get saveButton(): DetoxElement {
    return Matchers.getElementByID(EditAccountNameIds.SAVE_BUTTON);
  }

  /**
   * Updates the account name by typing in the input field.
   * @param newName - The new name to set for the account
   * @returns Promise that resolves when the name is updated
   */
  async updateAccountName(newName: string): Promise<void> {
    await Gestures.typeText(this.accountNameInput, newName, {
      elemDescription: 'Account Name Input in Edit Account Name',
      hideKeyboard: true,
    });
  }

  /**
   * Taps the save button to save the account name changes.
   * @returns Promise that resolves when the save button is tapped
   */
  async tapSave(): Promise<void> {
    await Gestures.waitAndTap(this.saveButton, {
      elemDescription: 'Save Button in Edit Account Name',
    });
  }
}

export default new EditAccountName();
