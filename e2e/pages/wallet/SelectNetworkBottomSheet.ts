import { PermissionSummaryBottomSheetSelectorsText } from '../../selectors/Browser/PermissionSummaryBottomSheet.selectors';
import Gestures from '../../framework/Gestures';
import Matchers from '../../framework/Matchers';

/**
 * Page object for the Select Networks bottom sheet in end-to-end tests.
 * Provides methods to interact with network selection UI elements.
 */
class SelectNetworksBottomSheet {
  /**
   * Gets the connected accounts text element from the bottom sheet.
   * @returns The DetoxElement for the connected accounts text
   */
  get connectedAccountsText(): DetoxElement {
    return Matchers.getElementByText(
      PermissionSummaryBottomSheetSelectorsText.CONNECTED_ACCOUNTS_TEXT,
    );
  }

  /**
   * Dismisses the networks bottom sheet by swiping down.
   * @returns Promise that resolves when the swipe gesture is complete
   */
  async swipeToDismiss(): Promise<void> {
    await Gestures.swipe(this.connectedAccountsText, 'down', {
      elemDescription: 'Networks Bottom Sheet',
      speed: 'fast',
      percentage: 0.6,
    });
  }

  /**
   * Performs a long press gesture on a specific network element.
   * @param networkName - The name of the network to long press on
   * @returns Promise that resolves when the long press gesture is complete
   */
  async longPressOnNetwork(networkName: string): Promise<void> {
    const networkElement = Matchers.getElementByText(networkName);
    await Gestures.longPress(networkElement, {
      elemDescription: `Network: ${networkName}`,
    });
  }
}

export default new SelectNetworksBottomSheet();
