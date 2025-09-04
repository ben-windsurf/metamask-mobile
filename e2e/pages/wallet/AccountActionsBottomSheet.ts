import { AccountActionsBottomSheetSelectorsIDs } from '../../selectors/wallet/AccountActionsBottomSheet.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import Utilities from '../../framework/Utilities';
import EditAccountNameView from './EditAccountNameView';
import MultichainAccountDetails from '../MultichainAccounts/AccountDetails';
import MultichainEditAccountName from '../MultichainAccounts/EditAccountName';

/**
 * Page object model for the Account Actions Bottom Sheet in end-to-end tests.
 * Provides methods to interact with account management actions like editing account names,
 * showing private keys, and switching between account types.
 */
class AccountActionsBottomSheet {
  /**
   * Gets the edit account button element.
   * @returns The DetoxElement for the edit account button
   */
  get editAccount(): DetoxElement {
    return Matchers.getElementByID(
      AccountActionsBottomSheetSelectorsIDs.EDIT_ACCOUNT,
    );
  }

  /**
   * Gets the show private key button element.
   * @returns The DetoxElement for the show private key button
   */
  get showPrivateKey(): DetoxElement {
    return Matchers.getElementByID(
      AccountActionsBottomSheetSelectorsIDs.SHOW_PRIVATE_KEY,
    );
  }

  /**
   * Gets the switch to smart account button element.
   * @returns The DetoxElement for the switch to smart account button
   */
  get switchToSmartAccount(): DetoxElement {
    return Matchers.getElementByID(
      AccountActionsBottomSheetSelectorsIDs.SWITCH_TO_SMART_ACCOUNT,
    );
  }

  /**
   * Gets the show secret recovery phrase button element.
   * @returns The DetoxElement for the show SRP button
   */
  get showSrp(): DetoxElement {
    return Matchers.getElementByID(
      AccountActionsBottomSheetSelectorsIDs.SHOW_SECRET_RECOVERY_PHRASE,
    );
  }

  /**
   * Taps the edit account button.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapEditAccount(): Promise<void> {
    await Gestures.waitAndTap(this.editAccount, {
      elemDescription: 'Edit account button',
    });
  }

  async tapShowPrivateKey(): Promise<void> {
    await Gestures.waitAndTap(this.showPrivateKey, {
      elemDescription: 'Show private key button',
    });
  }

  async tapSwitchToSmartAccount(): Promise<void> {
    await Gestures.waitAndTap(this.switchToSmartAccount, {
      elemDescription: 'Switch to smart account button',
    });
  }

  async tapShowSRP(): Promise<void> {
    await Gestures.waitAndTap(this.showSrp, {
      elemDescription: 'Show secret recovery phrase button',
    });
  }

  /**
   * This method adapts to feature flag changes for multichain accounts.
   */
  async renameActiveAccount(newName: string): Promise<void> {
    const isMultichainFlow = await this.detectMultichainFlow();
    if (isMultichainFlow) {
      await this.handleMultichainRename(newName);
    } else {
      await this.tapEditAccount();
      await this.handleLegacyRename(newName);
    }
  }

  /**
   * Detects whether the multichain account details UI is currently shown.
   * Returns true if multichain flow is active, false if legacy flow is active.
   */
  private async detectMultichainFlow(): Promise<boolean> {
    const isMultichainVisible = await Utilities.isElementVisible(
      MultichainAccountDetails.container,
      5000,
    );

    if (isMultichainVisible) {
      return true;
    }

    const isLegacyVisible = await Utilities.isElementVisible(
      this.editAccount,
      5000,
    );
    if (isLegacyVisible) {
      return false;
    }

    throw new Error(
      'Unable to detect rename UI flow - neither multichain nor legacy UI elements found',
    );
  }

  /**
   * Handles the modern multichain rename flow
   */
  private async handleMultichainRename(newName: string): Promise<void> {
    await Utilities.waitForElementToBeVisible(
      MultichainAccountDetails.container,
      5000,
    );
    await MultichainAccountDetails.tapEditAccountName();
    await MultichainEditAccountName.updateAccountName(newName);
    await MultichainEditAccountName.tapSave();
    await MultichainAccountDetails.tapBackButton();
  }

  /**
   * Handles the legacy rename flow
   */
  private async handleLegacyRename(newName: string): Promise<void> {
    await Gestures.typeText(EditAccountNameView.accountNameInput, newName, {
      hideKeyboard: true,
      clearFirst: true,
    });
    await EditAccountNameView.tapSave();
  }

  /**
   * Force multichain rename flow (for testing edge cases - use with mocked feature flag)
   * Use renameActiveAccount() instead for normal scenarios
   */
  async renameActiveAccountMultichain(newName: string): Promise<void> {
    await this.handleMultichainRename(newName);
  }

  /**
   * Force legacy rename flow (for testing edge cases - use with mocked feature flag)
   * Use renameActiveAccount() instead for normal scenarios
   */
  async renameActiveAccountLegacy(newName: string): Promise<void> {
    await this.tapEditAccount();
    await this.handleLegacyRename(newName);
  }
}

export default new AccountActionsBottomSheet();
