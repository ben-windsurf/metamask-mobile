import { ExperienceEnhancerBottomSheetSelectorsIDs } from '../../selectors/Onboarding/ExperienceEnhancerModal.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object for the Experience Enhancer bottom sheet in the onboarding flow.
 * Provides methods to interact with the bottom sheet that asks users to agree
 * to experience enhancement features.
 */
class ExperienceEnhancerBottomSheet {
  /**
   * Gets the main container element of the Experience Enhancer bottom sheet.
   * @returns The DetoxElement representing the bottom sheet container
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(
      ExperienceEnhancerBottomSheetSelectorsIDs.BOTTOM_SHEET,
    );
  }

  /**
   * Gets the "I Agree" button element in the Experience Enhancer bottom sheet.
   * @returns The DetoxElement representing the accept button
   */
  get iAgree(): DetoxElement {
    return Matchers.getElementByID(
      ExperienceEnhancerBottomSheetSelectorsIDs.ACCEPT_BUTTON,
    );
  }

  /**
   * Taps the "I Agree" button to accept the experience enhancement features.
   * Waits for the button to be available before tapping.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapIAgree(): Promise<void> {
    await Gestures.waitAndTap(this.iAgree, {
      elemDescription: 'I Agree Button in Experience Enhancer Bottom Sheet',
    });
  }
}

export default new ExperienceEnhancerBottomSheet();
