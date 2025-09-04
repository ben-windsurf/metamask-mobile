import { ApproveComponentIDs } from '../../selectors/Confirmation/ConfirmationView.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object for token approval confirmation interactions in end-to-end tests.
 * Provides methods to interact with spending cap controls and confirmation elements.
 */
class TokenApproveConfirmation {
  /**
   * Gets the spending cap value display element.
   * @returns The DetoxElement for the spending cap value
   */
  get SpendingCapValue(): DetoxElement {
    return Matchers.getElementByID(ApproveComponentIDs.SPENDING_CAP_VALUE);
  }

  /**
   * Gets the edit spending cap button element.
   * @returns The DetoxElement for the edit spending cap button
   */
  get EditSpendingCapButton(): DetoxElement {
    return Matchers.getElementByID(
      ApproveComponentIDs.EDIT_SPENDING_CAP_BUTTON,
    );
  }

  /**
   * Gets the edit spending cap input field element.
   * @returns The DetoxElement for the spending cap input field
   */
  get EditSpendingCapInput(): DetoxElement {
    return Matchers.getElementByID(ApproveComponentIDs.EDIT_SPENDING_CAP_INPUT);
  }

  /**
   * Gets the save button for spending cap edits.
   * @returns The DetoxElement for the save button
   */
  get EditSpendingCapSaveButton(): DetoxElement {
    return Matchers.getElementByID(
      ApproveComponentIDs.EDIT_SPENDING_CAP_SAVE_BUTTON,
    );
  }

  /**
   * Taps the edit spending cap button to open the spending cap editor.
   * @returns Promise that resolves when the tap action completes
   */
  async tapEditSpendingCapButton(): Promise<void> {
    await Gestures.waitAndTap(this.EditSpendingCapButton);
  }

  /**
   * Taps the save button to confirm spending cap changes.
   * @returns Promise that resolves when the tap action completes
   */
  async tapEditSpendingCapSaveButton(): Promise<void> {
    await Gestures.waitAndTap(this.EditSpendingCapSaveButton, {
      elemDescription:
        'Edit Spending Cap Save Button in Token Approve Confirmation',
    });
  }

  async inputSpendingCap(spendingCap: string): Promise<void> {
    await Gestures.typeText(this.EditSpendingCapInput, spendingCap, {
      elemDescription: 'Edit Spending Cap Input in Token Approve Confirmation',
      hideKeyboard: true,
    });
  }
}

export default new TokenApproveConfirmation();
