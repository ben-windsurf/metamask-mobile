import { OnboardingWizardModalSelectorsIDs } from '../../selectors/Onboarding/OnboardingWizardModal.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the Onboarding Wizard Modal in end-to-end tests.
 * Provides methods to interact with the onboarding tutorial steps and navigation buttons.
 */
class OnboardingWizardModal {
  /**
   * Gets the first step container element in the onboarding wizard.
   * @returns The DetoxElement for step one container
   */
  get stepOneContainer(): DetoxElement {
    return Matchers.getElementByID(
      OnboardingWizardModalSelectorsIDs.STEP_ONE_CONTAINER,
    );
  }

  /**
   * Gets the second step container element in the onboarding wizard.
   * @returns The DetoxElement for step two container
   */
  get stepTwoContainer(): DetoxElement {
    return Matchers.getElementByID(
      OnboardingWizardModalSelectorsIDs.STEP_TWO_CONTAINER,
    );
  }

  /**
   * Gets the third step container element in the onboarding wizard.
   * @returns The DetoxElement for step three container
   */
  get stepThreeContainer(): DetoxElement {
    return Matchers.getElementByID(
      OnboardingWizardModalSelectorsIDs.STEP_THREE_CONTAINER,
    );
  }

  /**
   * Gets the fourth step container element in the onboarding wizard.
   * @returns The DetoxElement for step four container
   */
  get stepFourContainer(): DetoxElement {
    return Matchers.getElementByID(
      OnboardingWizardModalSelectorsIDs.STEP_FOUR_CONTAINER,
    );
  }

  /**
   * Gets the fifth step container element in the onboarding wizard.
   * @returns The DetoxElement for step five container
   */
  get stepFiveContainer(): DetoxElement {
    return Matchers.getElementByID(
      OnboardingWizardModalSelectorsIDs.STEP_FIVE_CONTAINER,
    );
  }

  /**
   * Gets the sixth step container element in the onboarding wizard.
   * @returns The DetoxElement for step six container
   */
  get stepSixContainer(): DetoxElement {
    return Matchers.getElementByID(
      OnboardingWizardModalSelectorsIDs.STEP_SIX_CONTAINER,
    );
  }

  get stepSevenContainer(): DetoxElement {
    return Matchers.getElementByID(
      OnboardingWizardModalSelectorsIDs.STEP_SEVENTH_CONTAINER,
    );
  }

  get noThanksButton(): DetoxElement {
    return Matchers.getElementByID(
      OnboardingWizardModalSelectorsIDs.NO_THANKS_BUTTON,
    );
  }

  get takeTourButton(): DetoxElement {
    return Matchers.getElementByID(
      OnboardingWizardModalSelectorsIDs.TAKE_TOUR_BUTTON,
    );
  }

  get gotItButton(): DetoxElement {
    return device.getPlatform() === 'ios'
      ? Matchers.getElementByID(OnboardingWizardModalSelectorsIDs.GOT_IT_BUTTON)
      : Matchers.getElementByLabel(
          OnboardingWizardModalSelectorsIDs.GOT_IT_BUTTON,
        );
  }

  get backButton(): DetoxElement {
    return Matchers.getElementByID(
      OnboardingWizardModalSelectorsIDs.BACK_BUTTON,
    );
  }

  async tapNoThanksButton(): Promise<void> {
    await Gestures.waitAndTap(this.noThanksButton, {
      elemDescription: 'No Thanks Button in Onboarding Wizard Modal',
    });
  }

  async tapTakeTourButton(): Promise<void> {
    await Gestures.waitAndTap(this.takeTourButton, {
      elemDescription: 'Take Tour Button in Onboarding Wizard Modal',
    });
  }

  async tapGotItButton(): Promise<void> {
    await Gestures.waitAndTap(this.gotItButton, {
      elemDescription: 'Got It Button in Onboarding Wizard Modal',
    });
  }

  async tapBackButton(): Promise<void> {
    await Gestures.waitAndTap(this.backButton, {
      elemDescription: 'Back Button in Onboarding Wizard Modal',
    });
  }
}

export default new OnboardingWizardModal();
