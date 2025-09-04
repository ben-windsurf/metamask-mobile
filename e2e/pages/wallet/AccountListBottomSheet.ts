import { CellComponentSelectorsIDs } from '../../selectors/wallet/CellComponent.selectors';
import {
  AccountListBottomSheetSelectorsIDs,
  AccountListBottomSheetSelectorsText,
} from '../../selectors/wallet/AccountListBottomSheet.selectors';
import { WalletViewSelectorsIDs } from '../../selectors/wallet/WalletView.selectors';
import { ConnectAccountBottomSheetSelectorsIDs } from '../../selectors/Browser/ConnectAccountBottomSheet.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the Account List Bottom Sheet component.
 * Provides methods to interact with account selection, management, and navigation
 * in the wallet's account list modal interface.
 */
class AccountListBottomSheet {
  /**
   * Gets the main account list container element.
   * @returns The DetoxElement representing the account list container
   */
  get accountList(): DetoxElement {
    return Matchers.getElementByID(
      AccountListBottomSheetSelectorsIDs.ACCOUNT_LIST_ID,
    );
  }

  /**
   * Gets the account type label element.
   * @returns The DetoxElement representing the account type label
   */
  get accountTypeLabel(): DetoxElement {
    return Matchers.getElementByID(
      AccountListBottomSheetSelectorsIDs.ACCOUNT_TYPE_LABEL,
    );
  }

  /**
   * Gets the account tag label element.
   * @returns The DetoxElement representing the account tag label
   */
  get accountTagLabel(): DetoxElement {
    return Matchers.getElementByID(CellComponentSelectorsIDs.TAG_LABEL);
  }

  /**
   * Gets the title element of the account list bottom sheet.
   * @returns The DetoxElement representing the sheet title
   */
  get title(): DetoxElement {
    return Matchers.getElementByText(
      AccountListBottomSheetSelectorsText.ACCOUNTS_LIST_TITLE,
    );
  }

  /**
   * Gets the add account button element.
   * @returns The DetoxElement representing the add account button
   */
  get addAccountButton(): DetoxElement {
    return Matchers.getElementByID(
      AccountListBottomSheetSelectorsIDs.ACCOUNT_LIST_ADD_BUTTON_ID,
    );
  }

  /**
   * Gets the add Ethereum account button element.
   * @returns The DetoxElement representing the add Ethereum account button
   */
  get addEthereumAccountButton(): DetoxElement {
    return Matchers.getElementByText(
      AccountListBottomSheetSelectorsText.ADD_ETHEREUM_ACCOUNT,
    );
  }

  get removeAccountAlertText(): DetoxElement {
    return Matchers.getElementByText(
      AccountListBottomSheetSelectorsText.REMOVE_IMPORTED_ACCOUNT,
    );
  }

  get connectAccountsButton(): DetoxElement {
    return Matchers.getElementByID(
      ConnectAccountBottomSheetSelectorsIDs.SELECT_MULTI_BUTTON,
    );
  }

  async getAccountElementByAccountName(
    accountName: string,
  ): Promise<DetoxElement> {
    return Matchers.getElementByIDAndLabel(
      CellComponentSelectorsIDs.BASE_TITLE,
      accountName,
    );
  }

  async getSelectElement(index: number): DetoxElement {
    return Matchers.getElementByID(CellComponentSelectorsIDs.SELECT, index);
  }

  async getMultiselectElement(index: number): Promise<DetoxElement> {
    return Matchers.getElementByID(
      CellComponentSelectorsIDs.MULTISELECT,
      index,
    );
  }

  /**
   * Retrieves the title/name of an element using the `cellbase-avatar-title` ID.
   * Note: The `select-with-menu` ID element seems to never receive the tap event,
   * so this method fetches the title/name instead.
   *
   * @param {number} index - The index of the element to retrieve.
   * @returns {Detox.IndexableNativeElement} The matcher for the element's title/name.
   */
  getSelectWithMenuElementName(index: number): DetoxElement {
    return Matchers.getElementByID(CellComponentSelectorsIDs.BASE_TITLE, index);
  }

  async tapEditAccountActionsAtIndex(index: number): Promise<void> {
    await Gestures.tapAtIndex(
      Matchers.getElementByID(WalletViewSelectorsIDs.ACCOUNT_ACTIONS),
      index,
    );
  }

  async accountNameInList(accountName: string): Promise<DetoxElement> {
    return Matchers.getElementByText(accountName, 1);
  }
  async tapAccountIndex(index: number): Promise<void> {
    await Gestures.waitAndTap(this.getMultiselectElement(index), {
      elemDescription: `Account at index ${index}`,
    });
  }

  async tapToSelectActiveAccountAtIndex(index: number): Promise<void> {
    await Gestures.waitAndTap(this.getSelectWithMenuElementName(index), {
      elemDescription: `Account at index ${index}`,
    });
  }

  async longPressAccountAtIndex(index: number): Promise<void> {
    await Gestures.longPress(this.getSelectWithMenuElementName(index), {
      elemDescription: 'Account name',
    });
  }

  async tapAddAccountButton(): Promise<void> {
    await Gestures.waitAndTap(this.addAccountButton, {
      elemDescription: 'Add Account button',
    });
  }

  async tapAddEthereumAccountButton(): Promise<void> {
    await Gestures.waitAndTap(this.addEthereumAccountButton, {
      elemDescription: 'Add Ethereum Account button',
    });
  }

  async longPressImportedAccount(): Promise<void> {
    await Gestures.longPress(this.getSelectElement(1), {
      elemDescription: 'Imported account',
    });
  }

  async swipeToDismissAccountsModal(): Promise<void> {
    await Gestures.swipe(this.title, 'down', {
      speed: 'fast',
      percentage: 0.6,
    });
  }

  async tapYesToRemoveImportedAccountAlertButton(): Promise<void> {
    await Gestures.waitAndTap(this.removeAccountAlertText, {
      elemDescription: 'Yes to remove imported account alert button',
    });
  }

  async tapConnectAccountsButton(): Promise<void> {
    await Gestures.waitAndTap(this.connectAccountsButton, {
      elemDescription: 'Connect accounts button',
    });
  }

  async tapAccountByName(accountName: string): Promise<void> {
    const name = Matchers.getElementByText(accountName);

    await Gestures.waitAndTap(name);
  }

  async scrollToAccount(index: number): Promise<void> {
    await Gestures.scrollToElement(
      Matchers.getElementByID(WalletViewSelectorsIDs.ACCOUNT_ACTIONS, index),
      Matchers.getIdentifier(
        AccountListBottomSheetSelectorsIDs.ACCOUNT_LIST_ID,
      ),
    );
  }

  async scrollToBottomOfAccountList(): Promise<void> {
    await Gestures.swipe(this.accountList, 'up', {
      speed: 'fast',
    });
  }
}

export default new AccountListBottomSheet();
