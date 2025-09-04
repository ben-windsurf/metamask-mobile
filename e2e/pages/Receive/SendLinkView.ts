import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { SendLinkViewSelectorsIDs } from '../../selectors/Receive/SendLinkView.selectors';

/**
 * Page object model for the Send Link View screen in the receive flow.
 * Provides methods to interact with QR code display and navigation elements.
 */
class SendLinkView {
  /**
   * Gets the main container element for the Send Link View.
   * @returns The container DetoxElement
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(SendLinkViewSelectorsIDs.CONTAINER_ID);
  }

  /**
   * Gets the QR code modal element.
   * @returns The QR modal DetoxElement
   */
  get qrModal(): DetoxElement {
    return Matchers.getElementByID(SendLinkViewSelectorsIDs.QR_MODAL);
  }

  /**
   * Gets the close button element for the Send Link View.
   * @returns The close button DetoxElement
   */
  get closeSendLinkButton(): DetoxElement {
    return Matchers.getElementByID(
      SendLinkViewSelectorsIDs.CLOSE_SEND_LINK_VIEW_BUTTON,
    );
  }

  /**
   * Gets the QR code button element with platform-specific handling.
   * Uses label matching for Android and ID matching for iOS.
   * @returns The QR code button DetoxElement
   */
  get qrCodeButton(): DetoxElement {
    return device.getPlatform() === 'android'
      ? Matchers.getElementByLabel(SendLinkViewSelectorsIDs.QR_CODE_BUTTON)
      : Matchers.getElementByID(SendLinkViewSelectorsIDs.QR_CODE_BUTTON);
  }

  /**
   * Taps the QR code button to display the QR code modal.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapQRCodeButton(): Promise<void> {
    await Gestures.waitAndTap(this.qrCodeButton, {
      elemDescription: 'QR Code Button in Send Link View',
    });
  }

  /**
   * Taps the close button to dismiss the Send Link View.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapCloseSendLinkButton(): Promise<void> {
    await Gestures.waitAndTap(this.closeSendLinkButton, {
      elemDescription: 'Close Send Link Button in Send Link View',
    });
  }
}

export default new SendLinkView();
