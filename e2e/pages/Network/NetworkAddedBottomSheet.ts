import {
  NetworkAddedBottomSheetSelectorsIDs,
  NetworkAddedBottomSheetSelectorsText,
} from '../../selectors/Network/NetworkAddedBottomSheet.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the Network Added Bottom Sheet component.
 * Provides methods to interact with the bottom sheet that appears after adding a new network.
 */
class NetworkAddedBottomSheet {
  /**
   * Gets the switch network text element.
   * @returns The DetoxElement for the switch network text
   */
  get switchNetwork(): DetoxElement {
    return Matchers.getElementByText(
      NetworkAddedBottomSheetSelectorsText.SWITCH_NETWORK,
    );
  }

  /**
   * Gets the switch network button element.
   * @returns The DetoxElement for the switch network button
   */
  get switchNetworkButton(): DetoxElement {
    return Matchers.getElementByID(
      NetworkAddedBottomSheetSelectorsIDs.SWITCH_NETWORK_BUTTON,
    );
  }

  /**
   * Gets the close network button element.
   * @returns The DetoxElement for the close network button
   */
  get closeNetworkButton(): DetoxElement {
    return Matchers.getElementByID(
      NetworkAddedBottomSheetSelectorsIDs.CLOSE_NETWORK_BUTTON,
    );
  }

  /**
   * Taps the switch to network button to switch to the newly added network.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapSwitchToNetwork(): Promise<void> {
    await Gestures.waitAndTap(this.switchNetworkButton, {
      elemDescription: 'Switch Network Button in Network Added Bottom Sheet',
    });
  }

  /**
   * Taps the close button to dismiss the network added bottom sheet.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapCloseButton(): Promise<void> {
    await Gestures.waitAndTap(this.closeNetworkButton, {
      elemDescription: 'Close Network Button in Network Added Bottom Sheet',
    });
  }
}

export default new NetworkAddedBottomSheet();
