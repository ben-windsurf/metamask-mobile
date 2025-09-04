import { ConfirmationRequestTypeIDs } from '../../../selectors/Confirmation/ConfirmationView.selectors';
import Matchers from '../../../framework/Matchers';

/**
 * Page object class for handling different types of confirmation requests in the browser.
 * Provides access to UI elements for personal sign and typed sign requests.
 */
class RequestTypes {
  /**
   * Gets the personal sign request element for interaction in tests.
   * @returns The DetoxElement for the personal sign request UI component
   */
  get PersonalSignRequest(): DetoxElement {
    return Matchers.getElementByID(
      ConfirmationRequestTypeIDs.PERSONAL_SIGN_REQUEST,
    );
  }

  /**
   * Gets the typed sign request element for interaction in tests.
   * @returns The DetoxElement for the typed sign request UI component
   */
  get TypedSignRequest(): DetoxElement {
    return Matchers.getElementByID(
      ConfirmationRequestTypeIDs.TYPED_SIGN_REQUEST,
    );
  }
}

export default new RequestTypes();
