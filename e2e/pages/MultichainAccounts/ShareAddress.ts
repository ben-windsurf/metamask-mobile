import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { ShareAddressIds } from '../../selectors/MultichainAccounts/ShareAddress.selectors';

/**
 * Page object model for the Share Address screen in multichain accounts.
 * Provides methods to interact with address sharing functionality including QR codes,
 * copy actions, and blockchain explorer navigation.
 */
class ShareAddress {
  /**
   * Gets the main container element for the share address screen.
   * @returns The container DetoxElement for the share address interface
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(ShareAddressIds.SHARE_ADDRESS_CONTAINER);
  }

  /**
   * Gets the QR code element displaying the account address.
   * @returns The QR code DetoxElement for address sharing
   */
  get qrCode(): DetoxElement {
    return Matchers.getElementByID(ShareAddressIds.SHARE_ADDRESS_QR_CODE);
  }

  /**
   * Gets the account address text element.
   * @returns The account address DetoxElement displaying the wallet address
   */
  get accountAddress(): DetoxElement {
    return Matchers.getElementByID(
      ShareAddressIds.SHARE_ADDRESS_ACCOUNT_ADDRESS,
    );
  }

  /**
   * Gets the copy button element for copying the account address to clipboard.
   * @returns The copy button DetoxElement
   */
  get copyButton(): DetoxElement {
    return Matchers.getElementByID(ShareAddressIds.SHARE_ADDRESS_COPY_BUTTON);
  }

  /**
   * Gets the view on explorer button element for opening the address in a blockchain explorer.
   * @returns The view on explorer button DetoxElement
   */
  get viewOnExplorerButton(): DetoxElement {
    return Matchers.getElementByID(
      ShareAddressIds.SHARE_ADDRESS_VIEW_ON_EXPLORER_BUTTON,
    );
  }

  /**
   * Taps the copy button to copy the account address to the clipboard.
   * @returns Promise that resolves when the copy action is completed
   */
  async tapCopyButton(): Promise<void> {
    return await Gestures.waitAndTap(this.copyButton, {
      elemDescription: 'Copy Button in Share Address',
    });
  }

  async tapViewOnExplorerButton(): Promise<void> {
    await Gestures.waitAndTap(this.viewOnExplorerButton, {
      elemDescription: 'View on Explorer Button in Share Address',
    });
  }
}

export default new ShareAddress();
