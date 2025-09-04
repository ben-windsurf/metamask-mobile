import Matchers from '../../../framework/Matchers';
import {
  AlertModalSelectorsIDs,
  AlertModalSelectorsText,
  ConfirmAlertModalSelectorsIDs,
  ConfirmationTopSheetSelectorsIDs,
  ConfirmationTopSheetSelectorsText,
  AlertTypeIDs,
} from '../../../selectors/Confirmation/ConfirmationView.selectors';
import Gestures from '../../../framework/Gestures';

/**
 * Page object class for interacting with alert system components in the browser confirmation flow.
 * Provides methods to access and interact with various alert banners, modals, and buttons.
 */
class AlertSystem {
  get securityAlertBanner(): DetoxElement {
    return Matchers.getElementByID(
      ConfirmationTopSheetSelectorsIDs.SECURITY_ALERT_BANNER_REDESIGNED,
    );
  }

  get securityAlertResponseFailedBanner(): DetoxElement {
    return Matchers.getElementByText(
      ConfirmationTopSheetSelectorsText.BANNER_FAILED_TITLE,
    );
  }

  get securityAlertResponseMaliciousBanner(): DetoxElement {
    return Matchers.getElementByText(
      ConfirmationTopSheetSelectorsText.BANNER_MALICIOUS_TITLE,
    );
  }

  get inlineAlert(): DetoxElement {
    return Matchers.getElementByID(AlertTypeIDs.INLINE_ALERT);
  }

  get alertMismatchTitle(): DetoxElement {
    return Matchers.getElementByText(
      AlertModalSelectorsText.ALERT_ORIGIN_MISMATCH_TITLE,
    );
  }

  get acknowledgeAlertModal(): DetoxElement {
    return Matchers.getElementByID(AlertModalSelectorsIDs.ALERT_MODAL_CHECKBOX);
  }

  get gotItAlertModalButton(): DetoxElement {
    return Matchers.getElementByID(
      AlertModalSelectorsIDs.ALERT_MODAL_GOT_IT_BUTTON,
    );
  }

  get confirmAlertModal(): DetoxElement {
    return Matchers.getElementByID(
      ConfirmAlertModalSelectorsIDs.CONFIRM_ALERT_MODAL,
    );
  }

  get confirmAlertModalButton(): DetoxElement {
    return Matchers.getElementByID(
      ConfirmAlertModalSelectorsIDs.CONFIRM_ALERT_BUTTON,
    );
  }

  get acknowledgeConfirmAlertModal(): DetoxElement {
    return Matchers.getElementByID(
      ConfirmAlertModalSelectorsIDs.CONFIRM_ALERT_CHECKBOX,
    );
  }

  /**
   * Taps the confirm alert checkbox to acknowledge the alert.
   * @returns Promise that resolves when the checkbox is tapped
   */
  async tapConfirmAlertCheckbox(): Promise<void> {
    await Gestures.waitAndTap(this.acknowledgeConfirmAlertModal, {
      elemDescription: 'Confirm alert checkbox',
    });
  }

  /**
   * Taps the confirm alert button to proceed with the alert confirmation.
   * @returns Promise that resolves when the button is tapped
   */
  async tapConfirmAlertButton(): Promise<void> {
    await Gestures.waitAndTap(this.confirmAlertModalButton, {
      elemDescription: 'Confirm alert button',
    });
  }

  /**
   * Taps the inline alert element to interact with it.
   * @returns Promise that resolves when the inline alert is tapped
   */
  async tapInlineAlert(): Promise<void> {
    await Gestures.waitAndTap(this.inlineAlert, {
      elemDescription: 'Inline alert',
    });
  }

  /**
   * Taps the "Got It" button in the alert modal to dismiss it.
   * @returns Promise that resolves when the button is tapped
   */
  async tapGotItAlertModalButton(): Promise<void> {
    await Gestures.waitAndTap(this.gotItAlertModalButton, {
      elemDescription: 'Got it alert modal button',
    });
  }

  /**
   * Taps the acknowledge checkbox in the alert modal.
   * @returns Promise that resolves when the checkbox is tapped
   */
  async tapAcknowledgeAlertModal(): Promise<void> {
    await Gestures.waitAndTap(this.acknowledgeAlertModal, {
      elemDescription: 'Acknowledge alert modal',
    });
  }
}

export default new AlertSystem();
