import { SendActionViewSelectorsIDs } from '../../selectors/SendFlow/SendActionView.selectors';
import Gestures from '../../framework/Gestures';
import Matchers from '../../framework/Matchers';

/**
 * Page object model for the Send Action Bottom Sheet in end-to-end tests.
 * Provides methods to interact with Solana send transaction UI elements.
 */
class SendActionBottomSheet {
  get solanaAddressInputField(): DetoxElement {
    return Matchers.getElementByID(
      SendActionViewSelectorsIDs.SOLANA_INPUT_ADDRESS_FIELD,
    );
  }

  get solanaAmountInputField(): DetoxElement {
    return Matchers.getElementByID(
      SendActionViewSelectorsIDs.SOLANA_INPUT_AMOUNT_FIELD,
    );
  }

  get invalidAddressError(): DetoxElement {
    return Matchers.getElementByID(
      SendActionViewSelectorsIDs.INVALID_ADDRESS_ERROR,
    );
  }

  get continueButton(): DetoxElement {
    return Matchers.getElementByID(SendActionViewSelectorsIDs.CONTINUE_BUTTON);
  }

  get cancelButton(): DetoxElement {
    return Matchers.getElementByID(SendActionViewSelectorsIDs.CANCEL_BUTTON);
  }

  get closeModalButton(): DetoxElement {
    return Matchers.getElementByID(SendActionViewSelectorsIDs.CLOSE_BUTTON);
  }

  get sendSOLTransactionButton(): DetoxElement {
    return Matchers.getElementByID(
      SendActionViewSelectorsIDs.SEND_TRANSACTION_BUTTON,
    );
  }

  /**
   * Inputs a Solana address into the address input field.
   * @param address - The Solana address to input
   */
  async sendActionInputAddress(address: string) {
    await Gestures.typeText(this.solanaAddressInputField, address, {
      hideKeyboard: true,
      elemDescription: 'Solana address input field',
    });
  }

  /**
   * Inputs an amount into the Solana amount input field.
   * @param amount - The amount to input as a string
   */
  async sendActionInputAmount(amount: string) {
    await Gestures.typeText(this.solanaAmountInputField, amount, {
      hideKeyboard: true,
    });
  }

  /**
   * Taps the Send SOL transaction button to initiate the transaction.
   */
  async tapSendSOLTransactionButton() {
    await Gestures.waitAndTap(this.sendSOLTransactionButton, {
      delay: 1500,
      elemDescription: 'Send SOL transaction button',
    });
  }

  /**
   * Taps the Cancel button to cancel the send action.
   */
  async tapCancelButton() {
    await Gestures.waitAndTap(this.cancelButton);
  }

  /**
   * Taps the Continue button to proceed with the send action.
   */
  async tapContinueButton() {
    await Gestures.waitAndTap(this.continueButton, {
      delay: 1000,
    });
  }

  /**
   * Taps the Close button to close the modal.
   */
  async tapCloseButton() {
    await Gestures.waitAndTap(this.closeModalButton);
  }
}

export default new SendActionBottomSheet();
