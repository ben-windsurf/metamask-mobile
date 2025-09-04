import { MetaMetricsOptInSelectorsIDs } from '../../selectors/Onboarding/MetaMetricsOptIn.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the MetaMetrics opt-in screen during onboarding.
 * Provides methods to interact with the privacy policy content and opt-in/opt-out buttons.
 */
class MetaMetricsOptIn {
  /**
   * Gets the main container element for the MetaMetrics opt-in screen.
   * @returns The container DetoxElement
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(
      MetaMetricsOptInSelectorsIDs.METAMETRICS_OPT_IN_CONTAINER_ID,
    );
  }

  /**
   * Gets the privacy policy description content element.
   * @returns The privacy policy content DetoxElement
   */
  get optInMetricsContent(): DetoxElement {
    return Matchers.getElementByID(
      MetaMetricsOptInSelectorsIDs.OPTIN_METRICS_PRIVACY_POLICY_DESCRIPTION_CONTENT_1_ID,
    );
  }

  /**
   * Gets the "I Agree" button element for opting into MetaMetrics.
   * @returns The "I Agree" button DetoxElement
   */
  get iAgreeButton(): DetoxElement {
    return Matchers.getElementByID(
      MetaMetricsOptInSelectorsIDs.OPTIN_METRICS_I_AGREE_BUTTON_ID,
    );
  }

  /**
   * Gets the "No Thanks" button element for opting out of MetaMetrics.
   * @returns The "No Thanks" button DetoxElement
   */
  get noThanksButton(): DetoxElement {
    return Matchers.getElementByID(
      MetaMetricsOptInSelectorsIDs.OPTIN_METRICS_NO_THANKS_BUTTON_ID,
    );
  }

  /**
   * Swipes the privacy policy content upward to reveal more content or buttons.
   * @returns Promise that resolves when the swipe gesture is complete
   */
  async swipeContentUp(): Promise<void> {
    await Gestures.swipe(this.optInMetricsContent, 'up', {
      speed: 'fast',
      percentage: 0.9,
      elemDescription: 'Opt-in Metrics Privacy Policy Content',
    });
  }

  async tapAgreeButton(): Promise<void> {
    await this.swipeContentUp();
    await Gestures.waitAndTap(this.iAgreeButton, {
      elemDescription: 'Opt-in Metrics I Agree Button',
    });
  }

  async tapNoThanksButton(): Promise<void> {
    await this.swipeContentUp();
    await Gestures.waitAndTap(this.noThanksButton, {
      elemDescription: 'Opt-in Metrics No Thanks Button',
    });
  }
}

export default new MetaMetricsOptIn();
