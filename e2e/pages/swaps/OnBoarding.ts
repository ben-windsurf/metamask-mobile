import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { OnBoardingSelectors } from '../../selectors/swaps/OnBoarding.selectors';

/**
 * Page object for the swaps onboarding flow.
 * Provides methods to interact with onboarding elements and complete the swaps setup process.
 */
class Onboarding {
  /**
   * Gets the start swapping button element.
   * @returns The DetoxElement for the start swapping button
   */
  get startSwappingButton(): DetoxElement {
    return Matchers.getElementByText(OnBoardingSelectors.START_SWAPPING);
  }

  /**
   * Taps the start swapping button to proceed with the onboarding flow.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapStartSwapping(): Promise<void> {
    await Gestures.waitAndTap(this.startSwappingButton, {
      elemDescription: 'Start Swapping Button in Onboarding',
    });
  }
}

export default new Onboarding();
