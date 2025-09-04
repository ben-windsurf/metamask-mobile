import {
  ContractApprovalBottomSheetSelectorsIDs,
  ContractApprovalBottomSheetSelectorsText,
} from '../../selectors/Browser/ContractApprovalBottomSheet.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the Contract Approval Bottom Sheet in the browser.
 * Provides methods to interact with contract approval UI elements and perform actions
 * like approving/rejecting contracts, editing nicknames, and inputting custom amounts.
 */
class ContractApprovalBottomSheet {
  get container(): DetoxElement {
    return Matchers.getElementByID(
      ContractApprovalBottomSheetSelectorsIDs.CONTAINER,
    );
  }

  get addNickName(): DetoxElement {
    return Matchers.getElementByText(
      ContractApprovalBottomSheetSelectorsText.ADD_NICKNAME,
    );
  }

  get editNickName(): DetoxElement {
    return Matchers.getElementByText(
      ContractApprovalBottomSheetSelectorsText.EDIT_NICKNAME,
    );
  }

  get rejectButton(): DetoxElement {
    return Matchers.getElementByText(
      ContractApprovalBottomSheetSelectorsText.REJECT,
    );
  }

  get approveButton(): DetoxElement {
    return Matchers.getElementByText(
      ContractApprovalBottomSheetSelectorsText.APPROVE,
    );
  }

  get contractAddress(): DetoxElement {
    return Matchers.getElementByID(
      ContractApprovalBottomSheetSelectorsIDs.CONTRACT_ADDRESS,
    );
  }

  get nextButton(): DetoxElement {
    return Matchers.getElementByText(
      ContractApprovalBottomSheetSelectorsText.NEXT,
    );
  }

  get approveTokenAmount(): DetoxElement {
    return Matchers.getElementByID(
      ContractApprovalBottomSheetSelectorsIDs.APPROVE_TOKEN_AMOUNT,
    );
  }

  get confirmButton(): DetoxElement {
    return Matchers.getElementByText(
      ContractApprovalBottomSheetSelectorsText.CONFIRM,
    );
  }

  /**
   * Taps the add nickname button to add a nickname for the contract.
   */
  async tapAddNickName(): Promise<void> {
    await Gestures.waitAndTap(this.addNickName, {
      elemDescription: 'Tap on the add nickname button',
    });
  }
  /**
   * Taps the edit nickname button to modify an existing contract nickname.
   */
  async tapEditNickName(): Promise<void> {
    await Gestures.waitAndTap(this.editNickName, {
      elemDescription: 'Tap on the edit nickname button',
    });
  }

  /**
   * Taps the reject button to decline the contract approval request.
   */
  async tapRejectButton(): Promise<void> {
    await Gestures.waitAndTap(this.rejectButton, {
      elemDescription: 'Tap on the reject button',
    });
  }

  /**
   * Taps the approve button to accept the contract approval request.
   */
  async tapApproveButton(): Promise<void> {
    await Gestures.waitAndTap(this.approveButton, {
      elemDescription: 'Tap on the approve button',
    });
  }

  /**
   * Taps the confirm button to finalize the contract approval action.
   */
  async tapConfirmButton(): Promise<void> {
    await Gestures.waitAndTap(this.confirmButton, {
      elemDescription: 'Tap on the confirm button',
    });
  }

  /**
   * Taps on the contract address to copy it to the clipboard.
   */
  async tapToCopyContractAddress(): Promise<void> {
    await Gestures.waitAndTap(this.contractAddress, {
      elemDescription: 'Tap on the contract address',
    });
  }

  async tapNextButton(): Promise<void> {
    await Gestures.waitAndTap(this.nextButton, {
      elemDescription: 'Tap on the next button',
    });
  }

  async inputCustomAmount(amount: string): Promise<void> {
    await Gestures.typeTextAndHideKeyboard(this.approveTokenAmount, amount);
  }

  async clearInput(): Promise<void> {
    await Gestures.typeText(this.approveTokenAmount, '', {
      clearFirst: true,
      elemDescription: 'Clear the input field',
    });
  }
}

export default new ContractApprovalBottomSheet();
