import { WhatsNewModalSelectorsIDs } from '../../selectors/Onboarding/WhatsNewModal.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the What's New modal in the onboarding flow.
 * Provides methods to interact with the modal elements during end-to-end testing.
 */
class WhatsNewModal {
  /**
   * Gets the container element of the What's New modal.
   * @returns The DetoxElement representing the modal container
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(WhatsNewModalSelectorsIDs.CONTAINER);
  }

  /**
   * Gets the close button element of the What's New modal.
   * @returns The DetoxElement representing the close button
   */
  get closeButton(): DetoxElement {
    return Matchers.getElementByID(WhatsNewModalSelectorsIDs.CLOSE_BUTTON);
  }

  /**
   * Taps the close button to dismiss the What's New modal.
   * Waits for the button to be available before tapping.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapCloseButton(): Promise<void> {
    await Gestures.waitAndTap(this.closeButton, {
      elemDescription: 'Close Button in Whats New Modal',
    });
  }
}

export default new WhatsNewModal();
