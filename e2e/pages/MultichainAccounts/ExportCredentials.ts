import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { ExportCredentialsIds } from '../../selectors/MultichainAccounts/ExportCredentials.selectors';
import { RevealSeedViewSelectorsIDs } from '../../selectors/Settings/SecurityAndPrivacy/RevealSeedView.selectors';

/**
 * Page object model for the Export Credentials screen in multichain accounts.
 * Provides methods to interact with UI elements for exporting private keys and seed phrases.
 */
class ExportCredentials {
  get srpInfoContainer(): DetoxElement {
    return Matchers.getElementByID(ExportCredentialsIds.CONTAINER);
  }

  get revealContainer(): DetoxElement {
    return Matchers.getElementByID(
      RevealSeedViewSelectorsIDs.REVEAL_CREDENTIAL_CONTAINER_ID,
    );
  }

  get exportPrivateKeyButton(): DetoxElement {
    return Matchers.getElementByID(
      ExportCredentialsIds.EXPORT_PRIVATE_KEY_BUTTON,
    );
  }

  get exportSrpButton(): DetoxElement {
    return Matchers.getElementByID(ExportCredentialsIds.EXPORT_SRP_BUTTON);
  }

  get passwordInput(): DetoxElement {
    return Matchers.getElementByID(
      RevealSeedViewSelectorsIDs.PASSWORD_INPUT_BOX_ID,
    );
  }

  get nextButton(): DetoxElement {
    return Matchers.getElementByID(ExportCredentialsIds.NEXT_BUTTON);
  }

  get learnMoreButton(): DetoxElement {
    return Matchers.getElementByID(ExportCredentialsIds.LEARN_MORE_BUTTON);
  }

  /**
   * Taps the export private key button to initiate private key export flow.
   */
  async tapExportPrivateKeyButton(): Promise<void> {
    await Gestures.waitAndTap(this.exportPrivateKeyButton, {
      elemDescription: 'Export Private Key Button in Export Credentials',
    });
  }

  /**
   * Taps the export SRP (Secret Recovery Phrase) button to initiate seed phrase export flow.
   */
  async tapExportSrpButton(): Promise<void> {
    await Gestures.waitAndTap(this.exportSrpButton, {
      elemDescription: 'Export SRP Button in Export Credentials',
    });
  }

  /**
   * Enters the user's password in the password input field.
   * @param password - The password to enter for authentication
   */
  async enterPassword(password: string): Promise<void> {
    await Gestures.typeText(this.passwordInput, password, {
      elemDescription: 'Password Input in Export Credentials',
      hideKeyboard: true,
    });
  }

  /**
   * Taps the next button to proceed to the next step in the export flow.
   */
  async tapNextButton(): Promise<void> {
    await Gestures.waitAndTap(this.nextButton, {
      elemDescription: 'Next Button in Export Credentials',
    });
  }

  /**
   * Taps the learn more button to access additional information about credential export.
   */
  async tapLearnMoreButton(): Promise<void> {
    await Gestures.waitAndTap(this.learnMoreButton, {
      elemDescription: 'Learn More Button in Export Credentials',
    });
  }
}

export default new ExportCredentials();
