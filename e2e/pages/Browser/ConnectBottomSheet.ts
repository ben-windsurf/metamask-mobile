import {
  ConnectAccountBottomSheetSelectorsIDs,
  ConnectAccountBottomSheetSelectorsText,
} from '../../selectors/Browser/ConnectAccountBottomSheet.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { CommonSelectorsIDs } from '../../selectors/Common.selectors';

/**
 * Page object model for the Connect Bottom Sheet component in browser interactions.
 * Provides methods to interact with account connection UI elements during dApp connections.
 */
class ConnectBottomSheet {
  /**
   * Gets the main container element of the connect bottom sheet.
   * @returns The container DetoxElement for the connect bottom sheet
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(
      ConnectAccountBottomSheetSelectorsIDs.CONTAINER,
    );
  }
  /**
   * Gets the connect button element with platform-specific selector logic.
   * @returns The connect button DetoxElement (uses label on Android, ID on iOS)
   */
  get connectButton(): DetoxElement {
    return device.getPlatform() === 'android'
      ? Matchers.getElementByLabel(CommonSelectorsIDs.CONNECT_BUTTON)
      : Matchers.getElementByID(CommonSelectorsIDs.CONNECT_BUTTON);
  }

  /**
   * Gets the connect accounts button for connecting multiple accounts.
   * @returns The connect accounts button DetoxElement
   */
  get connectAccountsButton(): DetoxElement {
    return Matchers.getElementByText(
      ConnectAccountBottomSheetSelectorsText.CONNECT_ACCOUNTS,
    );
  }

  /**
   * Gets the import account button for importing accounts or hardware wallets.
   * @returns The import button DetoxElement
   */
  get importButton(): DetoxElement {
    return Matchers.getElementByText(
      ConnectAccountBottomSheetSelectorsText.IMPORT_ACCOUNT,
    );
  }

  /**
   * Gets the select all button for selecting all available accounts.
   * @returns The select all button DetoxElement
   */
  get selectAllButton(): DetoxElement {
    return Matchers.getElementByText(
      ConnectAccountBottomSheetSelectorsText.SELECT_ALL,
    );
  }

  /**
   * Gets the multi-select button for account selection.
   * @returns The multi-select button DetoxElement
   */
  get selectMultiButton(): DetoxElement {
    return Matchers.getElementByID(
      ConnectAccountBottomSheetSelectorsIDs.SELECT_MULTI_BUTTON,
    );
  }

  get cancelButton(): DetoxElement {
    return Matchers.getElementByID(
      ConnectAccountBottomSheetSelectorsIDs.CANCEL_BUTTON,
    );
  }

  async tapCancelButton(): Promise<void> {
    await Gestures.waitAndTap(this.cancelButton, {
      elemDescription: 'Tap on the cancel button',
    });
  }

  async tapConnectButton(): Promise<void> {
    await Gestures.waitAndTap(this.connectButton, {
      elemDescription: 'Tap on the connect button',
    });
  }

  async tapConnectMultipleAccountsButton(): Promise<void> {
    await Gestures.waitAndTap(this.connectAccountsButton, {
      elemDescription: 'Tap on the connect multiple accounts button',
    });
  }

  async tapImportAccountOrHWButton(): Promise<void> {
    await Gestures.waitAndTap(this.importButton, {
      elemDescription: 'Tap on the import account or hardware wallet button',
    });
  }

  async tapSelectAllButton(): Promise<void> {
    await Gestures.waitAndTap(this.selectAllButton, {
      elemDescription: 'Tap on the select all button',
    });
  }

  async tapAccountConnectMultiSelectButton(): Promise<void> {
    await Gestures.waitAndTap(this.selectMultiButton, {
      elemDescription: 'Tap on the account connect multi select button',
    });
  }

  async scrollToBottomOfModal(): Promise<void> {
    await Gestures.swipe(this.container, 'down', {
      speed: 'slow',
      elemDescription: 'Scroll to the bottom of the modal',
    });
  }
}

export default new ConnectBottomSheet();
