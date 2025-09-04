import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { SuccessImportAccountIDs } from '../../selectors/ImportAccount/SuccessImportAccount.selectors';

/**
 * Page object for the Success Import Account view in end-to-end tests.
 * Provides methods to interact with elements on the success screen after importing an account.
 */
class SuccessImportAccountView {
  /**
   * Gets the main container element of the success import account view.
   * @returns The container DetoxElement for interaction
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(SuccessImportAccountIDs.CONTAINER);
  }

  /**
   * Gets the close button element on the success import account view.
   * @returns The close button DetoxElement for interaction
   */
  get closeButton(): DetoxElement {
    return Matchers.getElementByID(SuccessImportAccountIDs.CLOSE_BUTTON);
  }

  /**
   * Taps the close button to dismiss the success import account view.
   * Waits for the button to be available before tapping.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapCloseButton(): Promise<void> {
    await Gestures.waitAndTap(this.closeButton, {
      elemDescription: 'Close button',
    });
  }
}

export default new SuccessImportAccountView();
