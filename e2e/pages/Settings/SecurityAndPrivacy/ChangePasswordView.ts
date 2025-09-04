import { RESET_PASSWORD_CONFIRM_INPUT_BOX_ID } from '../../../../wdio/screen-objects/testIDs/Screens/ChangePasswordScreensIDs.testIds';
import { ChoosePasswordSelectorsIDs } from '../../../selectors/Onboarding/ChoosePassword.selectors';
import { ChangePasswordViewSelectorsText } from '../../../selectors/Settings/SecurityAndPrivacy/ChangePasswordView.selectors';
import Matchers from '../../../framework/Matchers';
import Gestures from '../../../framework/Gestures';

/**
 * Page object model for the Change Password view in the Security and Privacy settings.
 * Provides methods to interact with password change form elements and perform password update operations.
 */
class ChangePasswordView {
  /**
   * Gets the title element of the change password view.
   * @returns The title element containing "Change Password" text
   */
  get title(): DetoxElement {
    return Matchers.getElementByText(
      ChangePasswordViewSelectorsText.CHANGE_PASSWORD,
    );
  }

  /**
   * Gets the new password input field element.
   * @returns The password input element for entering the new password
   */
  get passwordInput(): DetoxElement {
    return Matchers.getElementByID(
      ChoosePasswordSelectorsIDs.NEW_PASSWORD_INPUT_ID,
    );
  }

  /**
   * Gets the confirm password input field element.
   * @returns The confirm password input element for re-entering the new password
   */
  get confirmPasswordInput(): DetoxElement {
    return Matchers.getElementByID(RESET_PASSWORD_CONFIRM_INPUT_BOX_ID);
  }

  /**
   * Gets the "I understand" checkbox element.
   * @returns The checkbox element that users must check to acknowledge password change implications
   */
  get iUnderstandCheckBox(): DetoxElement {
    return Matchers.getElementByLabel(
      ChoosePasswordSelectorsIDs.I_UNDERSTAND_CHECKBOX_ID,
    );
  }

  /**
   * Gets the submit button element for saving the new password.
   * @returns The submit button element to confirm password change
   */
  get submitButton(): DetoxElement {
    return Matchers.getElementByText(
      ChoosePasswordSelectorsIDs.SAVE_PASSWORD_BUTTON_TEXT,
    );
  }

  async typeInConfirmPasswordInputBox(PASSWORD: string): Promise<void> {
    await Gestures.typeText(this.passwordInput, PASSWORD, {
      hideKeyboard: true,
      elemDescription: 'Confirm password input box',
    });
  }

  async reEnterPassword(PASSWORD: string): Promise<void> {
    await Gestures.typeText(this.confirmPasswordInput, PASSWORD, {
      hideKeyboard: true,
      elemDescription: 'Confirm password input box re-enter',
    });
  }

  async tapIUnderstandCheckBox(): Promise<void> {
    await Gestures.waitAndTap(this.iUnderstandCheckBox, {
      elemDescription: 'I understand checkbox',
    });
  }

  async tapSubmitButton(): Promise<void> {
    await Gestures.waitAndTap(this.submitButton, {
      elemDescription: 'Submit button',
    });
  }
}

export default new ChangePasswordView();
