import { ConfirmationTopSheetSelectorsIDs } from '../../selectors/Confirmation/ConfirmationView.selectors';
import Matchers from '../../framework/Matchers';

/**
 * Page object for the confirmation view in end-to-end tests.
 * Provides methods to interact with confirmation-related UI elements.
 */
class ConfirmationView {
  /**
   * Gets the security alert banner element.
   * @returns The security alert banner DetoxElement for interaction
   */
  get securityAlertBanner(): DetoxElement {
    return Matchers.getElementByID(
      ConfirmationTopSheetSelectorsIDs.SECURITY_ALERT_BANNER,
    );
  }

  /**
   * Gets the security alert response failed banner element.
   * @returns The security alert response failed banner DetoxElement for interaction
   */
  get securityAlertResponseFailedBanner(): DetoxElement {
    return Matchers.getElementByID(
      ConfirmationTopSheetSelectorsIDs.SECURITY_ALERT_RESPONSE_FAILED_BANNER,
    );
  }
}

export default new ConfirmationView();
