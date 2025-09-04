import { OnboardingSelectorIDs } from '../../selectors/Onboarding/Onboarding.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { BASE_DEFAULTS, Utilities } from '../../framework';
import OnboardingSheet from './OnboardingSheet';

/**
 * Page object model for the onboarding view in end-to-end tests.
 * Provides methods to interact with onboarding UI elements and perform common actions.
 */
class OnboardingView {
  /**
   * Gets the main container element for the onboarding view.
   * @returns The container DetoxElement for the onboarding screen
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(OnboardingSelectorIDs.CONTAINER_ID);
  }

  /**
   * Gets the existing wallet button element.
   * @returns The DetoxElement for the existing wallet button
   */
  get existingWalletButton() {
    return Matchers.getElementByID(
      OnboardingSelectorIDs.EXISTING_WALLET_BUTTON,
    );
  }

  /**
   * Gets the new wallet button element.
   * @returns The DetoxElement for the new wallet button
   */
  get newWalletButton(): DetoxElement {
    return Matchers.getElementByID(OnboardingSelectorIDs.NEW_WALLET_BUTTON);
  }

  /**
   * Taps the create new wallet button to start the wallet creation flow.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapCreateWallet(): Promise<void> {
    await Gestures.waitAndTap(this.newWalletButton, {
      elemDescription: 'Onboarding  - Create New Wallet Button',
    });
  }

  /**
   * Taps the existing wallet button and waits for the import options sheet to appear.
   * Uses retry logic to ensure the action completes successfully.
   * @returns Promise that resolves when the existing wallet flow is initiated
   */
  async tapHaveAnExistingWallet() {
    await Utilities.executeWithRetry(
      async () => {
        await Gestures.waitAndTap(this.existingWalletButton, {
          elemDescription: 'Onboarding Have an Existing Wallet Button',
        });
        await Utilities.waitForElementToBeVisible(
          OnboardingSheet.importSeedButton,
        );
      },
      {
        timeout: BASE_DEFAULTS.timeout,
        description: 'tapHaveAnExistingWallet()',
        elemDescription: 'Taps to prompt bottom sheet',
      },
    );
  }
}

export default new OnboardingView();
