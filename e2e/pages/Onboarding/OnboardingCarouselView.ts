import {
  OnboardingCarouselSelectorIDs,
  OnboardingCarouselSelectorText,
} from '../../selectors/Onboarding/OnboardingCarousel.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the onboarding carousel view in end-to-end tests.
 * Provides methods and element getters for interacting with the onboarding carousel
 * that introduces users to MetaMask Mobile features.
 */
class OnboardingCarouselView {
  /**
   * Gets the main carousel container element.
   * @returns The carousel container DetoxElement for interaction
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(
      OnboardingCarouselSelectorIDs.CAROUSEL_CONTAINER_ID,
    );
  }

  /**
   * Gets the "Get Started" button element.
   * @returns The get started button DetoxElement for interaction
   */
  get getStartedButton(): DetoxElement {
    return Matchers.getElementByID(
      OnboardingCarouselSelectorIDs.GET_STARTED_BUTTON_ID,
    );
  }

  /**
   * Gets the first carousel slide title element.
   * @returns The first title DetoxElement for verification
   */
  get titleOne(): DetoxElement {
    return Matchers.getElementByText(OnboardingCarouselSelectorText.TITLE_ONE);
  }

  /**
   * Gets the first carousel slide image element.
   * @returns The first image DetoxElement for verification
   */
  get imageOne(): DetoxElement {
    return Matchers.getElementByID(OnboardingCarouselSelectorIDs.ONE_IMAGE_ID);
  }

  /**
   * Gets the second carousel slide title element.
   * @returns The second title DetoxElement for verification
   */
  get titleTwo(): DetoxElement {
    return Matchers.getElementByText(OnboardingCarouselSelectorText.TITLE_TWO);
  }

  /**
   * Gets the second carousel slide image element.
   * @returns The second image DetoxElement for verification
   */
  get imageTwo(): DetoxElement {
    return Matchers.getElementByID(OnboardingCarouselSelectorIDs.TWO_IMAGE_ID);
  }

  get titleThree(): DetoxElement {
    return Matchers.getElementByText(
      OnboardingCarouselSelectorText.TITLE_THREE,
    );
  }

  get imageThree(): DetoxElement {
    return Matchers.getElementByID(
      OnboardingCarouselSelectorIDs.THREE_IMAGE_ID,
    );
  }

  async swipeCarousel(): Promise<void> {
    await Gestures.swipe(this.container, 'left');
  }

  async tapOnGetStartedButton(): Promise<void> {
    await Gestures.waitAndTap(this.getStartedButton, {
      elemDescription: 'Onboarding Carousel Get Started Button',
    });
  }
}

export default new OnboardingCarouselView();
