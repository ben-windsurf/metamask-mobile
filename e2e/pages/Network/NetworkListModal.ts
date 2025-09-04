import {
  NetworkListModalSelectorsIDs,
  NetworkListModalSelectorsText,
} from '../../selectors/Network/NetworkListModal.selectors';
import { NetworksViewSelectorsIDs } from '../../selectors/Settings/NetworksView.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the Network List Modal in end-to-end tests.
 * Provides methods to interact with network selection, searching, and management functionality.
 */
class NetworkListModal {
  /**
   * Gets the scrollable network list element.
   * @returns The DetoxElement for the network scroll container
   */
  get networkScroll(): DetoxElement {
    return Matchers.getElementByID(NetworkListModalSelectorsIDs.SCROLL);
  }

  /**
   * Gets the close icon element for dismissing the modal.
   * @returns The DetoxElement for the close icon
   */
  get closeIcon(): DetoxElement {
    return Matchers.getElementByID(NetworksViewSelectorsIDs.CLOSE_ICON);
  }

  /**
   * Gets the delete network button element.
   * @returns The DetoxElement for the delete network button
   */
  get deleteNetworkButton(): DetoxElement {
    return Matchers.getElementByText(
      NetworkListModalSelectorsText.DELETE_NETWORK,
    );
  }

  /**
   * Gets the add popular network button element.
   * @returns The DetoxElement for the add popular network button
   */
  get addPopularNetworkButton(): DetoxElement {
    return Matchers.getElementByText(
      NetworkListModalSelectorsText.ADD_POPULAR_NETWORK_BUTTON,
    );
  }

  /**
   * Gets the network search input field element.
   * @returns The DetoxElement for the network search input
   */
  get networkSearchInput(): DetoxElement {
    return Matchers.getElementByID(
      NetworksViewSelectorsIDs.SEARCH_NETWORK_INPUT_BOX_ID,
    );
  }

  /**
   * Gets the select network element.
   * @returns The DetoxElement for the select network text
   */
  get selectNetwork(): DetoxElement {
    return Matchers.getElementByText(
      NetworkListModalSelectorsText.SELECT_NETWORK,
    );
  }

  get testNetToggle(): DetoxElement {
    return Matchers.getElementByID(
      NetworkListModalSelectorsIDs.TEST_NET_TOGGLE,
    );
  }

  get deleteButton(): DetoxElement {
    return Matchers.getElementByID('delete-network-button');
  }

  async getCustomNetwork(
    network: string,
    custom = false,
  ): Promise<DetoxElement> {
    if (device.getPlatform() === 'android' || !custom) {
      return Matchers.getElementByText(network);
    }

    return Matchers.getElementByID(
      NetworkListModalSelectorsIDs.CUSTOM_NETWORK_CELL(network),
    );
  }

  async tapDeleteButton(): Promise<void> {
    await Gestures.waitAndTap(this.deleteNetworkButton);
  }

  async scrollToTopOfNetworkList(): Promise<void> {
    await Gestures.swipe(this.networkScroll, 'down', {
      speed: 'fast',
    });
  }

  async changeNetworkTo(networkName: string, custom = false): Promise<void> {
    const elem = this.getCustomNetwork(networkName, custom);
    await Gestures.waitAndTap(elem);
  }

  async scrollToBottomOfNetworkList(): Promise<void> {
    await Gestures.swipe(this.networkScroll, 'up', {
      speed: 'fast',
      checkStability: true,
    });
  }

  async swipeToDismissModal(): Promise<void> {
    await Gestures.swipe(this.selectNetwork, 'down', {
      speed: 'slow',
      percentage: 0.9,
    });
  }

  async tapTestNetworkSwitch(): Promise<void> {
    await Gestures.tap(this.testNetToggle, {
      elemDescription: 'Test Network Switch',
      delay: 1500, // 1.5 seconds to ensure the network list is stable
    });
  }

  async longPressOnNetwork(networkName: string): Promise<void> {
    const network = Matchers.getElementByText(networkName);
    await Gestures.longPress(network);
  }

  async SearchNetworkName(networkName: string): Promise<void> {
    await Gestures.typeText(this.networkSearchInput, networkName, {
      hideKeyboard: true,
    });
  }

  async tapClearSearch(): Promise<void> {
    await Gestures.waitAndTap(this.closeIcon);
  }

  async tapAddNetworkButton(): Promise<void> {
    await Gestures.waitAndTap(this.addPopularNetworkButton);
  }
  async deleteNetwork(): Promise<void> {
    await Gestures.waitAndTap(this.deleteButton);
  }
}

export default new NetworkListModal();
