import Matchers from '../../framework/Matchers.ts';
import Gestures from '../../framework/Gestures.ts';
import { SwitchAccountModalSelectorIDs } from '../../selectors/wallet/SwitchAccountModal.selectors.js';

/**
 * Page object model for the Switch Account Modal in end-to-end tests.
 * Provides methods to interact with the switch account functionality.
 */
class SwitchAccountModal {
  /**
   * Gets the switch account button element.
   * @returns The DetoxElement for the switch account button
   */
  get switchAccountButton(): DetoxElement {
    return Matchers.getElementByID(
      SwitchAccountModalSelectorIDs.SWITCH_ACCOUNT_BUTTON_LOCALHOST,
    );
  }

  /**
   * Taps the switch account button to trigger account switching.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapSwitchAccountButton(): Promise<void> {
    await Gestures.waitAndTap(this.switchAccountButton, {
      checkEnabled: false,
      elemDescription: 'Switch Account button',
    });
  }
}

export default new SwitchAccountModal();
