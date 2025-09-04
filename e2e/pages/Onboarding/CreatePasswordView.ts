import { ChoosePasswordSelectorsIDs } from '../../selectors/Onboarding/ChoosePassword.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import enContent from '../../../locales/languages/en.json';

/**
 * Page object model for the Create Password view in the onboarding flow.
 * Provides methods to interact with password creation form elements and perform
 * password-related actions during the wallet setup process.
 */
class CreatePasswordView {
  /**
   * Gets the main container element for the create password view.
   * @returns The container DetoxElement
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(ChoosePasswordSelectorsIDs.CONTAINER_ID);
  }

  /**
   * Gets the new password input field element.
   * @returns The new password input DetoxElement
   */
  get newPasswordInput(): DetoxElement {
    return Matchers.getElementByID(
      ChoosePasswordSelectorsIDs.NEW_PASSWORD_INPUT_ID,
    );
  }

  /**
   * Gets the confirm password input field element.
   * @returns The confirm password input DetoxElement
   */
  get confirmPasswordInput(): DetoxElement {
    return Matchers.getElementByID(
      ChoosePasswordSelectorsIDs.CONFIRM_PASSWORD_INPUT_ID,
    );
  }

  /**
   * Gets the "I understand" checkbox element.
   * @returns The checkbox DetoxElement
   */
  get iUnderstandCheckbox(): DetoxElement {
    return Matchers.getElementByID(
      ChoosePasswordSelectorsIDs.I_UNDERSTAND_CHECKBOX_ID,
    );
  }

  /**
   * Gets the "I understand" checkbox element for new wallet creation flow.
   * @returns The checkbox DetoxElement
   */
  get iUnderstandCheckboxNewWallet(): DetoxElement {
    return Matchers.getElementByID(
      ChoosePasswordSelectorsIDs.I_UNDERSTAND_CHECKBOX_ID,
    );
  }

  /**
   * Gets the submit button element for creating the password.
   * @returns The submit button DetoxElement
   */
  get submitButton(): DetoxElement {
    return Matchers.getElementByID(ChoosePasswordSelectorsIDs.SUBMIT_BUTTON_ID);
  }

  get passwordError(): DetoxElement {
    return Matchers.getElementByText(enContent.import_from_seed.password_error);
  }

  async resetPasswordInputs(): Promise<void> {
    await Gestures.typeText(this.newPasswordInput, '', {
      hideKeyboard: true,
    });
    await Gestures.typeText(this.confirmPasswordInput, '', {
      hideKeyboard: true,
    });
  }

  async enterPassword(password: string): Promise<void> {
    await Gestures.typeText(this.newPasswordInput, password, {
      elemDescription: 'Create Password New Password Input',
      hideKeyboard: true,
    });
  }

  async reEnterPassword(password: string): Promise<void> {
    await Gestures.typeText(this.confirmPasswordInput, password, {
      elemDescription: 'Create Password Confirm Password Input',
      hideKeyboard: true,
    });
  }

  async tapIUnderstandCheckBox(): Promise<void> {
    await Gestures.tap(this.iUnderstandCheckbox, {
      elemDescription: 'Create Password - I Understand Checkbox',
    });
  }

  async tapCreatePasswordButton(): Promise<void> {
    await Gestures.waitAndTap(this.submitButton, {
      elemDescription: 'Create Password Submit Button',
    });
  }
}

export default new CreatePasswordView();
