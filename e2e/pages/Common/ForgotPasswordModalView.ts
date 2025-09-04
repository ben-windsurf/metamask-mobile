import {
  ForgotPasswordModalSelectorsIDs,
  ForgotPasswordModalSelectorsText,
} from '../../selectors/Common/ForgotPasswordModal.selectors';
import Matchers from '../../framework/Matchers.ts';
import Gestures from '../../framework/Gestures.ts';
import { OnboardingSelectorText } from '../../selectors/Onboarding/Onboarding.selectors';

/**
 * Page object model for the Forgot Password Modal view in end-to-end tests.
 * Provides methods to interact with elements in the forgot password modal,
 * including buttons, text elements, and user actions for wallet reset functionality.
 */
class ForgotPasswordModalView {
  get container(): DetoxElement {
    return Matchers.getElementByID(ForgotPasswordModalSelectorsIDs.CONTAINER);
  }

  get title(): DetoxElement {
    return Matchers.getElementByID(ForgotPasswordModalSelectorsIDs.TITLE);
  }

  get description(): DetoxElement {
    return Matchers.getElementByID(ForgotPasswordModalSelectorsIDs.DESCRIPTION);
  }

  get resetWalletButton(): DetoxElement {
    return Matchers.getElementByID(
      ForgotPasswordModalSelectorsIDs.RESET_WALLET_BUTTON,
    );
  }

  get yesResetWalletButton(): DetoxElement {
    return Matchers.getElementByID(
      ForgotPasswordModalSelectorsIDs.YES_RESET_WALLET_BUTTON,
    );
  }

  get cancelButton(): DetoxElement {
    return Matchers.getElementByID(
      ForgotPasswordModalSelectorsIDs.CANCEL_BUTTON,
    );
  }

  get warningText(): DetoxElement {
    return Matchers.getElementByID(
      ForgotPasswordModalSelectorsIDs.WARNING_TEXT,
    );
  }

  get titleText(): DetoxElement {
    return Matchers.getElementByText(ForgotPasswordModalSelectorsText.TITLE);
  }

  get descriptionText(): DetoxElement {
    return Matchers.getElementByText(
      ForgotPasswordModalSelectorsText.DESCRIPTION,
    );
  }

  get resetWalletText(): DetoxElement {
    return Matchers.getElementByText(
      ForgotPasswordModalSelectorsText.RESET_WALLET,
    );
  }

  get yesResetWalletText(): DetoxElement {
    return Matchers.getElementByText(
      ForgotPasswordModalSelectorsText.YES_RESET_WALLET,
    );
  }

  get cancelText(): DetoxElement {
    return Matchers.getElementByText(ForgotPasswordModalSelectorsText.CANCEL);
  }

  get warningTextContent(): DetoxElement {
    return Matchers.getElementByText(ForgotPasswordModalSelectorsText.WARNING);
  }

  get successBottomNotification(): DetoxElement {
    return Matchers.getElementByText(
      OnboardingSelectorText.SUCCESSFUL_WALLET_RESET,
    );
  }

  /**
   * Taps the reset wallet button with extended timeout.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapResetWalletButton(): Promise<void> {
    await Gestures.waitAndTap(this.resetWalletButton, { timeout: 25000 });
  }

  /**
   * Taps the confirmation button to proceed with wallet reset.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapYesResetWalletButton(): Promise<void> {
    await Gestures.waitAndTap(this.yesResetWalletButton);
  }

  /**
   * Taps the cancel button to dismiss the modal.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapCancelButton(): Promise<void> {
    await Gestures.waitAndTap(this.cancelButton);
  }

  /**
   * Taps the reset wallet button using text-based selector.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapResetWalletByText(): Promise<void> {
    await Gestures.waitAndTap(this.resetWalletText);
  }

  /**
   * Taps the confirmation button using text-based selector.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapYesResetWalletByText(): Promise<void> {
    await Gestures.waitAndTap(this.yesResetWalletText);
  }

  /**
   * Taps the cancel button using text-based selector.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapCancelByText(): Promise<void> {
    await Gestures.waitAndTap(this.cancelText);
  }
}

export default new ForgotPasswordModalView();
