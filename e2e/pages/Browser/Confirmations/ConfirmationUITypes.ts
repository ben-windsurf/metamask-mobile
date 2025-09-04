import { ConfirmationUIType } from '../../../selectors/Confirmation/ConfirmationView.selectors';
import Matchers from '../../../framework/Matchers';

/**
 * Page object class for handling different confirmation UI types in end-to-end tests.
 * Provides access to modal and flat confirmation containers for test automation.
 */
class ConfirmationUITypes {
  /**
   * Gets the modal confirmation container element for testing.
   * @returns The Detox element representing the modal confirmation UI
   */
  get ModalConfirmationContainer(): DetoxElement {
    return Matchers.getElementByID(ConfirmationUIType.MODAL);
  }

  /**
   * Gets the flat confirmation container element for testing.
   * @returns The Detox element representing the flat confirmation UI
   */
  get FlatConfirmationContainer(): DetoxElement {
    return Matchers.getElementByID(ConfirmationUIType.FLAT);
  }
}

export default new ConfirmationUITypes();
