import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { SendLinkViewSelectorsIDs } from '../../selectors/Receive/SendLinkView.selectors';

/**
 * Page object model for the Payment Request QR Bottom Sheet component.
 * Provides methods to interact with the QR code modal in the receive flow.
 */
class PaymentRequestQrBottomSheet {
  /**
   * Gets the main container element of the QR modal.
   * @returns The QR modal container element
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(SendLinkViewSelectorsIDs.QR_MODAL);
  }

  /**
   * Gets the close button element of the QR modal.
   * @returns The close button element
   */
  get closeButton(): DetoxElement {
    return Matchers.getElementByID(
      SendLinkViewSelectorsIDs.CLOSE_QR_MODAL_BUTTON,
    );
  }

  /**
   * Taps the close button to dismiss the QR modal.
   * @returns Promise that resolves when the close button is tapped
   */
  async tapCloseButton(): Promise<void> {
    await Gestures.waitAndTap(this.closeButton, {
      elemDescription: 'Close Button in Payment Request QR Bottom Sheet',
    });
  }
}

export default new PaymentRequestQrBottomSheet();
