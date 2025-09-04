import { NftDetectionModalSelectorsIDs } from '../../selectors/wallet/NftDetectionModal.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the NFT Detection Modal in end-to-end tests.
 * Provides methods to interact with the modal that prompts users to enable NFT detection.
 */
class NftDetectionModal {
  /**
   * Gets the main container element of the NFT Detection Modal.
   * @returns The container DetoxElement for the modal
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(NftDetectionModalSelectorsIDs.CONTAINER);
  }

  /**
   * Gets the cancel button element of the NFT Detection Modal.
   * @returns The cancel button DetoxElement
   */
  get cancelButton(): DetoxElement {
    return Matchers.getElementByID(NftDetectionModalSelectorsIDs.CANCEL_BUTTON);
  }

  /**
   * Gets the allow button element of the NFT Detection Modal.
   * @returns The allow button DetoxElement
   */
  get allowButton(): DetoxElement {
    return Matchers.getElementByID(NftDetectionModalSelectorsIDs.ALLOW_BUTTON);
  }

  /**
   * Taps the cancel button to dismiss the NFT Detection Modal without enabling NFT detection.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapCancelButton(): Promise<void> {
    await Gestures.waitAndTap(this.cancelButton, {
      elemDescription: 'Cancel Button in NFT Detection Modal',
    });
  }

  /**
   * Taps the allow button to enable NFT detection and dismiss the modal.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapAllowButton(): Promise<void> {
    await Gestures.waitAndTap(this.allowButton, {
      elemDescription: 'Allow Button in NFT Detection Modal',
    });
  }
}

export default new NftDetectionModal();
