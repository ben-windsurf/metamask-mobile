import { NetworkConnectMultiSelectorSelectorsIDs } from '../../selectors/Browser/NetworkConnectMultiSelector.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { Assertions } from '../../framework';

/**
 * Page object model for the Network Connect Multi Selector screen.
 * Provides methods to interact with network chain permission selection UI elements.
 */
class NetworkConnectMultiSelector {
  /**
   * Gets the update button element for updating chain permissions.
   * @returns The update button DetoxElement
   */
  get updateButton(): DetoxElement {
    return Matchers.getElementByID(
      NetworkConnectMultiSelectorSelectorsIDs.UPDATE_CHAIN_PERMISSIONS,
    );
  }

  /**
   * Gets the back button element for navigating back from the selector.
   * @returns The back button DetoxElement
   */
  get backButton(): DetoxElement {
    return Matchers.getElementByID(
      NetworkConnectMultiSelectorSelectorsIDs.BACK_BUTTON,
    );
  }

  /**
   * Taps the update button to apply chain permission changes.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapUpdateButton(): Promise<void> {
    await Gestures.waitAndTap(this.updateButton, {
      elemDescription: 'Tap on the update button',
    });
  }

  /**
   * Taps the back button to navigate back from the selector screen.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapBackButton(): Promise<void> {
    await Gestures.waitAndTap(this.backButton, {
      elemDescription: 'Tap on the back button',
    });
  }

  /**
   * Verifies that a network chain permission is selected.
   * @param chainName - The name of the chain to check selection status for
   * @returns Promise that resolves when the assertion is complete
   */
  async isNetworkChainPermissionSelected(chainName: string): Promise<void> {
    const chainPermissionTestId = `${chainName}-selected`;
    const el = await Matchers.getElementByID(chainPermissionTestId);
    await Assertions.expectElementToBeVisible(el, {
      timeout: 10000,
      description: `Network chain permission ${chainName} should be selected`,
    });
  }

  async isNetworkChainPermissionNotSelected(chainName: string): Promise<void> {
    const chainPermissionTestId = `${chainName}-not-selected`;
    const el = await Matchers.getElementByID(chainPermissionTestId);
    await Assertions.expectElementToBeVisible(el, {
      timeout: 10000,
      description: `Network chain permission ${chainName} should be selected`,
    });
  }
}

export default new NetworkConnectMultiSelector();
