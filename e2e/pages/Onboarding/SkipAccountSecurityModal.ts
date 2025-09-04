import { SkipAccountSecurityModalSelectorsIDs } from '../../selectors/Onboarding/SkipAccountSecurityModal.selectors';
import Gestures from '../../framework/Gestures';
import Matchers from '../../framework/Matchers';

/**
 * Page object model for the Skip Account Security Modal in the onboarding flow.
 * Provides methods to interact with modal elements and perform user actions.
 */
class SkipAccountSecurityModal {
  /**
   * Gets the "I understand" checkbox element for the current platform.
   * @returns The DetoxElement for the checkbox
   */
  get iUnderstandCheckbox(): DetoxElement {
    return device.getPlatform() === 'android'
      ? Matchers.getElementByID(
          SkipAccountSecurityModalSelectorsIDs.ANDROID_SKIP_BACKUP_BUTTON_ID,
        )
      : Matchers.getElementByID(
          SkipAccountSecurityModalSelectorsIDs.iOS_SKIP_BACKUP_BUTTON_ID,
        );
  }

  /**
   * Gets the skip button element.
   * @returns The DetoxElement for the skip button
   */
  get skipButton(): DetoxElement {
    return Matchers.getElementByID(
      SkipAccountSecurityModalSelectorsIDs.SKIP_BUTTON,
    );
  }

  /**
   * Gets the cancel button element.
   * @returns The DetoxElement for the cancel button
   */
  get cancelButton(): DetoxElement {
    return Matchers.getElementByID(
      SkipAccountSecurityModalSelectorsIDs.CANCEL_BUTTON,
    );
  }

  /**
   * Taps the "I understand" checkbox to acknowledge the security warning.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapIUnderstandCheckBox(): Promise<void> {
    await Gestures.waitAndTap(this.iUnderstandCheckbox);
  }

  /**
   * Taps the skip button to proceed without setting up account security.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapSkipButton(): Promise<void> {
    await Gestures.waitAndTap(this.skipButton);
  }

  /**
   * Taps the cancel button to dismiss the modal and return to the previous screen.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapCancelButton(): Promise<void> {
    await Gestures.waitAndTap(this.cancelButton);
  }
}

export default new SkipAccountSecurityModal();
