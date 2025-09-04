import { StakeViewSelectors } from '../../selectors/Stake/StakeView.selectors.js';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the Stake view in end-to-end tests.
 * Provides methods to interact with staking interface elements and perform staking operations.
 */
class StakeView {
  /**
   * Gets the stake container element.
   * @returns The stake container DetoxElement for interaction
   */
  get stakeContainer(): DetoxElement {
    return Matchers.getElementByText(StakeViewSelectors.STAKE_CONTAINER);
  }

  /**
   * Gets the unstake container element.
   * @returns The unstake container DetoxElement for interaction
   */
  get unstakeContainer(): DetoxElement {
    return Matchers.getElementByText(StakeViewSelectors.UNSTAKE_CONTAINER);
  }

  /**
   * Gets the review button element.
   * @returns The review button DetoxElement for interaction
   */
  get reviewButton(): DetoxElement {
    return Matchers.getElementByText(StakeViewSelectors.REVIEW_BUTTON);
  }

  /**
   * Gets the continue button element.
   * @returns The continue button DetoxElement for interaction
   */
  get continueButton(): DetoxElement {
    return Matchers.getElementByText(StakeViewSelectors.CONTINUE);
  }

  /**
   * Selects a predefined amount by tapping the corresponding button.
   * @param amount - The amount text to select
   */
  async selectAmount(amount: string): Promise<void> {
    const amountButton = Matchers.getElementByText(amount);
    await Gestures.waitAndTap(amountButton);
  }

  /**
   * Enters a custom amount by tapping individual digit buttons.
   * @param amount - The amount to enter as a string of digits
   */
  async enterAmount(amount: string): Promise<void> {
    for (const digit of amount) {
      const button = Matchers.getElementByText(digit);
      await Gestures.waitAndTap(button, {
        elemDescription: `Digit ${digit} in Stake Amount`,
      });
    }
  }

  async tapReview(): Promise<void> {
    await Gestures.waitAndTap(this.reviewButton, {
      elemDescription: 'Review Button in Stake View',
    });
  }

  async tapContinue(): Promise<void> {
    await Gestures.waitAndTap(this.continueButton, {
      elemDescription: 'Continue Button in Stake View',
    });
  }
}

export default new StakeView();
