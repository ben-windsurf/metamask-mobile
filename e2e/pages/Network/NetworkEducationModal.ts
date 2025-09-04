import {
  NetworkEducationModalSelectorsIDs,
  NetworkEducationModalSelectorsText,
} from '../../selectors/Network/NetworkEducationModal.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the Network Education Modal in end-to-end tests.
 * Provides methods to interact with the modal that educates users about network switching.
 */
class NetworkEducationModal {
  /**
   * Gets the main container element of the network education modal.
   * @returns The container DetoxElement for the modal
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(NetworkEducationModalSelectorsIDs.CONTAINER);
  }

  /**
   * Gets the close button element of the network education modal.
   * Uses platform-specific selectors for iOS and Android.
   * @returns The close button DetoxElement
   */
  get closeButton(): DetoxElement {
    return device.getPlatform() === 'ios'
      ? Matchers.getElementByID(NetworkEducationModalSelectorsIDs.CLOSE_BUTTON)
      : Matchers.getElementByLabel(
          NetworkEducationModalSelectorsIDs.CLOSE_BUTTON,
        );
  }

  /**
   * Gets the add token element in the network education modal.
   * @returns The add token DetoxElement
   */
  get addToken(): DetoxElement {
    return Matchers.getElementByText(
      NetworkEducationModalSelectorsText.ADD_TOKEN,
    );
  }

  /**
   * Gets the network name element in the network education modal.
   * @returns The network name DetoxElement
   */
  get networkName(): DetoxElement {
    return Matchers.getElementByID(
      NetworkEducationModalSelectorsIDs.NETWORK_NAME,
    );
  }

  /**
   * Taps the "Got it" button to close the network education modal.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapGotItButton(): Promise<void> {
    await Gestures.waitAndTap(this.closeButton, {
      elemDescription: 'Got it button',
    });
  }

  /**
   * Taps the network name element in the modal.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapNetworkName(): Promise<void> {
    await Gestures.waitAndTap(this.networkName);
  }
}

export default new NetworkEducationModal();
