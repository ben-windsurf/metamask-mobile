import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { SmartAccountIds } from '../../selectors/MultichainAccounts/SmartAccount.selectors';

/**
 * Page object model for Smart Account functionality in end-to-end tests.
 * Provides methods to interact with smart account UI elements and perform actions.
 */
class SmartAccount {
  /**
   * Gets the smart account container element.
   * @returns The smart account container DetoxElement for interaction
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(SmartAccountIds.SMART_ACCOUNT_CONTAINER);
  }

  /**
   * Gets the smart account switch toggle element.
   * @returns The smart account switch DetoxElement for interaction
   */
  get smartAccountSwitch(): DetoxElement {
    return Matchers.getElementByID(SmartAccountIds.SMART_ACCOUNT_SWITCH);
  }

  /**
   * Taps the smart account switch to toggle smart account functionality.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapSmartAccountSwitch(): Promise<void> {
    await Gestures.waitAndTap(this.smartAccountSwitch, {
      elemDescription: 'Smart Account Switch in Smart Account',
    });
  }
}

export default new SmartAccount();
