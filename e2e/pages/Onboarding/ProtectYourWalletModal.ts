import { ProtectWalletModalSelectorsIDs } from '../../selectors/Onboarding/ProtectWalletModal.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the Protect Your Wallet modal in the onboarding flow.
 * Provides methods to interact with modal elements and perform user actions.
 */
class ProtectYourWalletModal {
  /**
   * Gets the main container element of the protect wallet modal.
   * @returns The container DetoxElement for the modal
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(ProtectWalletModalSelectorsIDs.CONTAINER);
  }

  /**
   * Gets the "Remind Me Later" button element.
   * @returns The DetoxElement for the remind me later button
   */
  get remindMeLaterButton(): DetoxElement {
    return Matchers.getElementByID(
      ProtectWalletModalSelectorsIDs.REMIND_ME_LATER_BUTTON,
    );
  }

  /**
   * Gets the collapsed wallet modal element.
   * @returns The DetoxElement for the collapsed wallet modal
   */
  get collapseWalletModal(): DetoxElement {
    return Matchers.getElementByID(
      ProtectWalletModalSelectorsIDs.COLLAPSED_WALLET_MODAL,
    );
  }

  /**
   * Taps the "Remind Me Later" button to dismiss the protect wallet modal.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapRemindMeLaterButton(): Promise<void> {
    await Gestures.waitAndTap(this.remindMeLaterButton);
  }
}

export default new ProtectYourWalletModal();
