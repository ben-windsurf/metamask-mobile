import { AddNewAccountIds } from '../../../../selectors/MultiSRP/AddHdAccount.selectors';
import Matchers from '../../../../framework/Matchers.ts';
import Gestures from '../../../../framework/Gestures.ts';
import { IndexableNativeElement } from 'detox/detox';

/**
 * Page object component for adding new HD accounts in multi-SRP scenarios.
 * Provides methods to interact with the Add New HD Account screen elements.
 */
class AddNewHdAccountComponent {
  /**
   * Gets the main container element for the Add New HD Account screen.
   * @returns The container element
   */
  get container() {
    return Matchers.getElementByID(AddNewAccountIds.CONTAINER);
  }

  /**
   * Gets the SRP selector element for choosing which seed phrase to use.
   * @returns The SRP selector element
   */
  get srpSelector() {
    return Matchers.getElementByID(AddNewAccountIds.SRP_SELECTOR);
  }

  /**
   * Gets the cancel button element.
   * @returns The cancel button element
   */
  get cancelButton() {
    return Matchers.getElementByID(AddNewAccountIds.CANCEL);
  }

  /**
   * Gets the confirm button element.
   * @returns The confirm button element
   */
  get confirmButton() {
    return Matchers.getElementByID(AddNewAccountIds.CONFIRM);
  }

  /**
   * Gets the name input field element for entering the account name.
   * @returns The name input field element
   */
  get nameInput() {
    return Matchers.getElementByID(AddNewAccountIds.NAME_INPUT);
  }

  /**
   * Taps the SRP selector to open the seed phrase selection menu.
   */
  async tapSrpSelector() {
    await Gestures.waitAndTap(this.srpSelector);
  }

  /**
   * Taps the cancel button to dismiss the Add New HD Account screen.
   */
  async tapCancel() {
    await Gestures.waitAndTap(this.cancelButton);
  }

  async tapConfirm() {
    await Gestures.waitAndTap(this.confirmButton, {
      elemDescription: 'Confirm button on Add New HD Account screen',
    });
  }

  async enterName(accountName: string) {
    await Gestures.clearField(
      this.nameInput as Promise<IndexableNativeElement>,
    );
    await Gestures.typeTextAndHideKeyboard(
      this.nameInput as Promise<IndexableNativeElement>,
      accountName,
    );
  }
}

export default new AddNewHdAccountComponent();
