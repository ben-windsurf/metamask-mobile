import { WalletActionsBottomSheetSelectorsIDs } from '../../selectors/wallet/WalletActionsBottomSheet.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the wallet actions bottom sheet component.
 * Provides methods to interact with wallet action buttons like send, receive, swap, bridge, buy, and sell.
 */
class WalletActionsBottomSheet {
  /**
   * Gets the send button element from the wallet actions bottom sheet.
   * @returns The send button DetoxElement for interaction
   */
  get sendButton(): DetoxElement {
    return Matchers.getElementByID(
      WalletActionsBottomSheetSelectorsIDs.SEND_BUTTON,
    );
  }

  /**
   * Gets the receive button element from the wallet actions bottom sheet.
   * @returns The receive button DetoxElement for interaction
   */
  get receiveButton(): DetoxElement {
    return Matchers.getElementByID(
      WalletActionsBottomSheetSelectorsIDs.RECEIVE_BUTTON,
    );
  }

  /**
   * Gets the swap button element from the wallet actions bottom sheet.
   * @returns The swap button DetoxElement for interaction
   */
  get swapButton(): DetoxElement {
    return Matchers.getElementByID(
      WalletActionsBottomSheetSelectorsIDs.SWAP_BUTTON,
    );
  }

  /**
   * Gets the bridge button element from the wallet actions bottom sheet.
   * @returns The bridge button DetoxElement for interaction
   */
  get bridgeButton(): DetoxElement {
    return Matchers.getElementByID(
      WalletActionsBottomSheetSelectorsIDs.BRIDGE_BUTTON,
    );
  }

  /**
   * Gets the buy button element from the wallet actions bottom sheet.
   * @returns The buy button DetoxElement for interaction
   */
  get buyButton(): DetoxElement {
    return Matchers.getElementByID(
      WalletActionsBottomSheetSelectorsIDs.BUY_BUTTON,
    );
  }

  /**
   * Gets the sell button element from the wallet actions bottom sheet.
   * @returns The sell button DetoxElement for interaction
   */
  get sellButton(): DetoxElement {
    return Matchers.getElementByID(
      WalletActionsBottomSheetSelectorsIDs.SELL_BUTTON,
    );
  }

  async tapSendButton(): Promise<void> {
    await Gestures.waitAndTap(this.sendButton);
  }

  async tapReceiveButton(): Promise<void> {
    await Gestures.waitAndTap(this.receiveButton);
  }

  async tapSwapButton(): Promise<void> {
    await Gestures.waitAndTap(this.swapButton, {
      delay: 1000,
    });
  }

  async tapBridgeButton(): Promise<void> {
    await Gestures.waitAndTap(this.bridgeButton, {
      delay: 1000,
    });
  }

  async tapBuyButton(): Promise<void> {
    await Gestures.waitAndTap(this.buyButton);
  }

  async tapSellButton() {
    await Gestures.waitAndTap(this.sellButton);
  }

  async swipeDownActionsBottomSheet(): Promise<void> {
    await Gestures.swipe(this.sendButton, 'down', {
      speed: 'fast',
    });
  }
}

export default new WalletActionsBottomSheet();
