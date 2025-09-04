import Gestures from '../../framework/Gestures';
import Matchers from '../../framework/Matchers';
import { StakeConfirmViewSelectors } from '../../selectors/Stake/StakeConfirmView.selectors.js';

/**
 * Page object for the Stake Confirmation View in end-to-end tests.
 * Provides methods to interact with the stake confirmation screen elements.
 */
class StakeConfirmationView {
  /**
   * Gets the confirm button element for stake confirmation.
   * @returns The confirm button DetoxElement
   */
  get confirmButton(): DetoxElement {
    return Matchers.getElementByText(StakeConfirmViewSelectors.CONFIRM);
  }

  /**
   * Taps the confirm button to proceed with stake confirmation.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapConfirmButton(): Promise<void> {
    await Gestures.waitAndTap(this.confirmButton, {
      elemDescription: 'Confirm Button in Stake Confirmation View',
    });
  }
}

export default new StakeConfirmationView();
