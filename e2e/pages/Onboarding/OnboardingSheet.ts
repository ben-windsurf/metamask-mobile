import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { OnboardingSheetSelectorIDs } from '../../selectors/Onboarding/OnboardingSheet.selectors';

/**
 * Page object model for the onboarding sheet component in end-to-end tests.
 * Provides methods to interact with onboarding options including social login and seed import.
 */
class OnboardingSheet {
  /**
   * Gets the main container element of the onboarding sheet.
   * @returns The container DetoxElement for the onboarding sheet
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(OnboardingSheetSelectorIDs.CONTAINER_ID);
  }

  /**
   * Gets the Google login button element.
   * @returns The Google login DetoxElement
   */
  get googleLoginButton(): DetoxElement {
    return Matchers.getElementByID(
      OnboardingSheetSelectorIDs.GOOGLE_LOGIN_BUTTON,
    );
  }

  /**
   * Gets the Apple login button element.
   * @returns The Apple login DetoxElement
   */
  get appleLoginButton(): DetoxElement {
    return Matchers.getElementByID(
      OnboardingSheetSelectorIDs.APPLE_LOGIN_BUTTON,
    );
  }

  /**
   * Gets the import seed phrase button element.
   * @returns The import seed DetoxElement
   */
  get importSeedButton(): DetoxElement {
    return Matchers.getElementByID(
      OnboardingSheetSelectorIDs.IMPORT_SEED_BUTTON,
    );
  }

  /**
   * Taps the Google login button to initiate Google authentication flow.
   * @returns Promise that resolves when the tap gesture is completed
   */
  async tapGoogleLoginButton(): Promise<void> {
    await Gestures.waitAndTap(this.googleLoginButton, {
      elemDescription: 'Google Login Button in Onboarding Sheet',
    });
  }

  /**
   * Taps the Apple login button to initiate Apple authentication flow.
   * @returns Promise that resolves when the tap gesture is completed
   */
  async tapAppleLoginButton(): Promise<void> {
    await Gestures.waitAndTap(this.appleLoginButton, {
      elemDescription: 'Apple Login Button in Onboarding Sheet',
    });
  }

  async tapImportSeedButton(): Promise<void> {
    await Gestures.waitAndTap(this.importSeedButton, {
      elemDescription: 'Import Seed Button in Onboarding Sheet',
    });
  }
}

export default new OnboardingSheet();
