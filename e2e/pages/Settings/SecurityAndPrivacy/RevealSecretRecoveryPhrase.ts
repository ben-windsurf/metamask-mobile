import {
  RevealSeedViewSelectorsIDs,
  RevealSeedViewSelectorsText,
} from '../../../selectors/Settings/SecurityAndPrivacy/RevealSeedView.selectors';
import Matchers from '../../../framework/Matchers';
import Gestures from '../../../framework/Gestures';

/**
 * Page object model for the Reveal Secret Recovery Phrase screen in MetaMask settings.
 * Provides methods to interact with elements for revealing and managing secret recovery phrases.
 */
class RevealSecretRecoveryPhrase {
  get container(): DetoxElement {
    return Matchers.getElementByID(
      RevealSeedViewSelectorsIDs.REVEAL_CREDENTIAL_CONTAINER_ID,
    );
  }

  get passwordWarning(): DetoxElement {
    return Matchers.getElementByID(
      RevealSeedViewSelectorsIDs.PASSWORD_WARNING_ID,
    );
  }

  get passwordInputToRevealCredential(): DetoxElement {
    return Matchers.getElementByID(
      RevealSeedViewSelectorsIDs.PASSWORD_INPUT_BOX_ID,
    );
  }

  get scrollViewIdentifier(): Promise<DetoxMatcher> {
    return Matchers.getIdentifier(
      RevealSeedViewSelectorsIDs.REVEAL_CREDENTIAL_SCROLL_ID,
    );
  }

  get tabScrollViewTextIdentifier(): Promise<DetoxMatcher> {
    return Matchers.getIdentifier(
      RevealSeedViewSelectorsIDs.TAB_SCROLL_VIEW_TEXT,
    );
  }
  get tabScrollViewQRCodeIdentifier(): Promise<DetoxMatcher> {
    return Matchers.getIdentifier(
      RevealSeedViewSelectorsIDs.TAB_SCROLL_VIEW_QR_CODE,
    );
  }

  get revealSecretRecoveryPhraseButton(): DetoxElement {
    return Matchers.getElementByID(
      RevealSeedViewSelectorsIDs.REVEAL_CREDENTIAL_BUTTON_ID,
    );
  }

  get revealCredentialCopyToClipboardButton(): DetoxElement {
    return Matchers.getElementByID(
      RevealSeedViewSelectorsIDs.REVEAL_CREDENTIAL_COPY_TO_CLIPBOARD_BUTTON,
    );
  }

  get revealCredentialQRCodeTab(): DetoxElement {
    return Matchers.getElementByText(
      RevealSeedViewSelectorsText.REVEAL_CREDENTIAL_QR_CODE_TAB_ID,
    );
  }

  get revealCredentialQRCodeImage(): DetoxElement {
    return Matchers.getElementByID(
      RevealSeedViewSelectorsIDs.REVEAL_CREDENTIAL_QR_CODE_IMAGE_ID,
    );
  }

  get doneButton(): DetoxElement {
    return Matchers.getElementByText(
      RevealSeedViewSelectorsText.REVEAL_CREDENTIAL_DONE,
    );
  }

  /**
   * Enters the password required to reveal the secret recovery phrase.
   * @param password - The user's password to authenticate the reveal action
   */
  async enterPasswordToRevealSecretCredential(password: string): Promise<void> {
    await Gestures.typeText(this.passwordInputToRevealCredential, password, {
      hideKeyboard: true,
      elemDescription: 'Password input to reveal credential',
    });
  }

  /**
   * Taps the button to reveal the secret recovery phrase after password authentication.
   */
  async tapToReveal(): Promise<void> {
    await Gestures.waitAndTap(this.revealSecretRecoveryPhraseButton, {
      elemDescription: 'Reveal secret recovery phrase button',
    });
  }

  /**
   * Taps the button to copy the revealed credential to the device clipboard.
   */
  async tapToCopyCredentialToClipboard() {
    await Gestures.tap(this.revealCredentialCopyToClipboardButton, {
      elemDescription: 'Reveal credential copy to clipboard button',
    });
  }

  /**
   * Taps the QR code tab to switch to the QR code view of the credential.
   */
  async tapToRevealPrivateCredentialQRCode(): Promise<void> {
    await Gestures.tap(this.revealCredentialQRCodeTab, {
      elemDescription: 'Reveal credential QR code tab',
    });
  }

  /**
   * Scrolls the view to make the Done button visible.
   */
  async scrollToDone(): Promise<void> {
    await Gestures.scrollToElement(this.doneButton, this.scrollViewIdentifier, {
      elemDescription: 'Done button',
    });
  }

  async tapDoneButton(): Promise<void> {
    await Gestures.waitAndTap(this.doneButton, {
      elemDescription: 'Done button',
    });
  }

  async scrollToCopyToClipboardButton(): Promise<void> {
    await Gestures.scrollToElement(
      this.revealCredentialCopyToClipboardButton,
      this.tabScrollViewTextIdentifier,
      {
        elemDescription: 'Copy to clipboard button',
      },
    );
  }

  async scrollToQR(): Promise<void> {
    await Gestures.scrollToElement(
      this.revealCredentialQRCodeImage,
      this.tabScrollViewQRCodeIdentifier,
      {
        elemDescription: 'QR code',
      },
    );
  }
}

export default new RevealSecretRecoveryPhrase();
