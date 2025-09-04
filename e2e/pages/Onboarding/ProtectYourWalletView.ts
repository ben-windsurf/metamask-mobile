import { ManualBackUpStepsSelectorsIDs } from '../../selectors/Onboarding/ManualBackUpSteps.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the Protect Your Wallet view during onboarding.
 * Provides methods to interact with wallet protection options and navigation.
 */
class ProtectYourWalletView {
  /**
   * Gets the main container element for the protect your wallet view.
   * @returns The container DetoxElement for interaction and validation
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(
      ManualBackUpStepsSelectorsIDs.PROTECT_CONTAINER,
    );
  }

  /**
   * Gets the "Remind Me Later" button element.
   * @returns The remind me later button DetoxElement for interaction
   */
  get remindMeLaterButton(): DetoxElement {
    return Matchers.getElementByID(
      ManualBackUpStepsSelectorsIDs.REMIND_ME_LATER_BUTTON,
    );
  }

  /**
   * Taps on the "Remind Me Later" button to skip wallet protection setup.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapOnRemindMeLaterButton(): Promise<void> {
    await Gestures.waitAndTap(this.remindMeLaterButton);
  }
}

export default new ProtectYourWalletView();
