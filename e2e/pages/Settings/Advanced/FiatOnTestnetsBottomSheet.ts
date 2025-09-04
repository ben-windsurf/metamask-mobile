import { FiatOnTestnetsBottomSheetSelectorsIDs } from '../../../selectors/Settings/Advanced/FiatOnTestnetsBottomSheet.selectors';
import Gestures from '../../../framework/Gestures';
import Matchers from '../../../framework/Matchers';

/**
 * Page object for the Fiat On Testnets bottom sheet in the Advanced Settings.
 * Provides methods to interact with the bottom sheet elements and perform actions.
 */
class FiatOnTestnetsBottomSheet {
  /**
   * Gets the continue button element from the Fiat On Testnets bottom sheet.
   * @returns The continue button DetoxElement
   */
  get continueButton(): DetoxElement {
    return Matchers.getElementByID(
      FiatOnTestnetsBottomSheetSelectorsIDs.CONTINUE_BUTTON,
    );
  }

  /**
   * Taps the continue button in the Fiat On Testnets bottom sheet.
   * Waits for the button to be available before tapping.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapContinueButton(): Promise<void> {
    await Gestures.waitAndTap(this.continueButton, {
      elemDescription: 'Continue Button in Fiat On Testnets Bottom Sheet',
    });
  }
}

export default new FiatOnTestnetsBottomSheet();
