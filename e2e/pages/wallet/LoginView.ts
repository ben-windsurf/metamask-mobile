import { LoginViewSelectors } from '../../selectors/wallet/LoginView.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the login view in end-to-end tests.
 * Provides methods to interact with login form elements and perform login actions.
 */
class LoginView {
  /**
   * Gets the main container element for the login view.
   * @returns The container DetoxElement for the login view
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(LoginViewSelectors.CONTAINER);
  }

  /**
   * Gets the password input field element.
   * @returns The password input DetoxElement
   */
  get passwordInput(): DetoxElement {
    return Matchers.getElementByID(LoginViewSelectors.PASSWORD_INPUT);
  }

  /**
   * Gets the forgot password button element.
   * @returns The forgot password button DetoxElement
   */
  get forgotPasswordButton(): DetoxElement {
    return Matchers.getElementByID(LoginViewSelectors.RESET_WALLET);
  }

  /**
   * Gets the remember me switch element.
   * @returns The remember me switch DetoxElement
   */
  get rememberMeSwitch(): DetoxElement {
    return Matchers.getElementByID(LoginViewSelectors.REMEMBER_ME_SWITCH);
  }

  /**
   * Enters the specified password into the password input field.
   * @param password - The password to enter
   * @returns Promise that resolves when the password has been entered
   */
  async enterPassword(password: string): Promise<void> {
    await Gestures.typeText(this.passwordInput, password, {
      hideKeyboard: true,
      elemDescription: 'Password Input',
    });
  }

  /**
   * Taps the forgot password button to initiate password reset flow.
   * @returns Promise that resolves when the button has been tapped
   */
  async tapForgotPassword(): Promise<void> {
    await Gestures.waitAndTap(this.forgotPasswordButton, {
      elemDescription: 'Forgot Password Button',
    });
  }

  /**
   * Toggles the remember me switch to enable/disable password remembering.
   * @returns Promise that resolves when the switch has been toggled
   */
  async toggleRememberMeSwitch(): Promise<void> {
    await Gestures.waitAndTap(this.rememberMeSwitch, {
      elemDescription: 'Remember Me Switch',
    });
  }
}

export default new LoginView();
