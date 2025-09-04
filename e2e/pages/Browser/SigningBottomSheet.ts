import { SigningBottomSheetSelectorsIDs } from '../../selectors/Browser/SigningBottomSheet.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the signing bottom sheet in browser context.
 * Provides methods to interact with signature request UI elements.
 */
class SigningBottomSheet {
  /**
   * Gets the sign button element.
   * @returns The sign button DetoxElement
   */
  get signButton(): DetoxElement {
    return Matchers.getElementByID(SigningBottomSheetSelectorsIDs.SIGN_BUTTON);
  }

  /**
   * Gets the cancel button element.
   * @returns The cancel button DetoxElement
   */
  get cancelButton(): DetoxElement {
    return Matchers.getElementByID(
      SigningBottomSheetSelectorsIDs.CANCEL_BUTTON,
    );
  }

  /**
   * Gets the personal request element.
   * @returns The personal request DetoxElement
   */
  get personalRequest(): DetoxElement {
    return Matchers.getElementByID(
      SigningBottomSheetSelectorsIDs.PERSONAL_REQUEST,
    );
  }

  /**
   * Gets the typed request element.
   * @returns The typed request DetoxElement
   */
  get typedRequest(): DetoxElement {
    return Matchers.getElementByID(
      SigningBottomSheetSelectorsIDs.TYPED_REQUEST,
    );
  }

  /**
   * Taps the sign button to confirm the signature request.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapSignButton(): Promise<void> {
    await Gestures.waitAndTap(this.signButton, {
      elemDescription: 'Tap on the sign button',
    });
  }

  /**
   * Taps the cancel button to reject the signature request.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapCancelButton(): Promise<void> {
    await Gestures.waitAndTap(this.cancelButton, {
      elemDescription: 'Tap on the cancel button',
    });
  }
}

export default new SigningBottomSheet();
