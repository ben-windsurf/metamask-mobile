import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { ImportAccountFromPrivateKeyIDs } from '../../selectors/ImportAccount/ImportAccountFromPrivateKey.selectors';

/**
 * Page object model for the Import Account view in end-to-end tests.
 * Provides methods to interact with the import account functionality.
 */
class ImportAccountView {
  /**
   * Gets the main container element for the import account view.
   * @returns The container DetoxElement
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(ImportAccountFromPrivateKeyIDs.CONTAINER);
  }

  /**
   * Gets the import button element.
   * @returns The import button DetoxElement
   */
  get importButton(): DetoxElement {
    return Matchers.getElementByID(
      ImportAccountFromPrivateKeyIDs.IMPORT_BUTTON,
    );
  }

  /**
   * Gets the private key input field element.
   * @returns The private key input field DetoxElement
   */
  get privateKeyField(): DetoxElement {
    return Matchers.getElementByID(
      ImportAccountFromPrivateKeyIDs.PRIVATE_KEY_INPUT_BOX,
    );
  }

  /**
   * Taps the import button to initiate the account import process.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapImportButton(): Promise<void> {
    await Gestures.waitAndTap(this.importButton, {
      elemDescription: 'Import Button',
    });
  }

  /**
   * Enters a private key into the private key input field.
   * @param privateKey - The private key string to enter
   * @returns Promise that resolves when the text input is complete
   */
  async enterPrivateKey(privateKey: string): Promise<void> {
    await Gestures.typeText(this.privateKeyField, privateKey, {
      elemDescription: 'Private key input field',
      hideKeyboard: true,
    });
  }
}

export default new ImportAccountView();
