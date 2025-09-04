import { OnboardingSuccessSelectorIDs } from '../../selectors/Onboarding/OnboardingSuccess.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object for the onboarding success view in end-to-end tests.
 * Provides methods to interact with the success screen elements after completing onboarding.
 */
class OnboardingSuccessView {
  /**
   * Gets the main container element for the onboarding success view.
   * @returns The container DetoxElement for interaction and validation
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(OnboardingSuccessSelectorIDs.CONTAINER_ID);
  }

  /**
   * Gets the done button element to complete the onboarding flow.
   * @returns The done button DetoxElement for tapping
   */
  get doneButton(): DetoxElement {
    return Matchers.getElementByID(OnboardingSuccessSelectorIDs.DONE_BUTTON);
  }

  /**
   * Taps the done button to complete the onboarding process.
   * Waits for the button to be available before tapping.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapDone(): Promise<void> {
    await Gestures.waitAndTap(this.doneButton, {
      elemDescription: 'Onboarding Success Done Button',
    });
  }
}

export default new OnboardingSuccessView();
