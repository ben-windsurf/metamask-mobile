import {
  PermissionSummaryBottomSheetSelectorsIDs,
  PermissionSummaryBottomSheetSelectorsText,
} from '../../selectors/Browser/PermissionSummaryBottomSheet.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the Permission Summary Bottom Sheet in the browser.
 * Provides methods to interact with permission-related UI elements and perform actions
 * like dismissing the modal and navigating back.
 */
class PermissionSummaryBottomSheet {
  /**
   * Gets the main container element of the permission summary bottom sheet.
   * @returns The container DetoxElement for the permission summary modal
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(
      PermissionSummaryBottomSheetSelectorsIDs.CONTAINER,
    );
  }
  /**
   * Gets the network permissions container element.
   * @returns The DetoxElement for the network permissions section
   */
  get addNetworkPermissionContainer(): DetoxElement {
    return Matchers.getElementByID(
      PermissionSummaryBottomSheetSelectorsIDs.NETWORK_PERMISSIONS_CONTAINER,
    );
  }

  /**
   * Gets the back button element.
   * @returns The DetoxElement for the back navigation button
   */
  get backButton(): DetoxElement {
    return Matchers.getElementByID(
      PermissionSummaryBottomSheetSelectorsIDs.BACK_BUTTON,
    );
  }

  /**
   * Gets the connected accounts text element.
   * @returns The DetoxElement for the connected accounts label
   */
  get connectedAccountsText(): DetoxElement {
    return Matchers.getElementByText(
      PermissionSummaryBottomSheetSelectorsText.CONNECTED_ACCOUNTS_TEXT,
    );
  }

  /**
   * Gets the Ethereum Mainnet text element.
   * @returns The DetoxElement for the Ethereum Mainnet network label
   */
  get ethereumMainnetText(): DetoxElement {
    return Matchers.getElementByText(
      PermissionSummaryBottomSheetSelectorsText.ETHEREUM_MAINNET_LABEL,
    );
  }

  get accountPermissionLabelContainer(): DetoxElement {
    return Matchers.getElementByID(
      PermissionSummaryBottomSheetSelectorsIDs.ACCOUNT_PERMISSION_CONTAINER,
    );
  }

  async swipeToDismissModal(): Promise<void> {
    await Gestures.swipe(this.container, 'down', {
      speed: 'fast',
      elemDescription: 'Swipe to dismiss the modal',
    });
  }

  async tapBackButton(): Promise<void> {
    await Gestures.waitAndTap(this.backButton, {
      elemDescription: 'Tap on the back button',
    });
  }
}

export default new PermissionSummaryBottomSheet();
