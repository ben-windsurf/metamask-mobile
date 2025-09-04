import {
  RevealSeedViewSelectorsIDs,
  RevealSeedViewSelectorsText,
} from '../../../selectors/Settings/SecurityAndPrivacy/RevealSeedView.selectors';
import Matchers from '../../../framework/Matchers';
import Gestures from '../../../framework/Gestures';

/**
 * Page object model for the Reveal Private Key view in the Security and Privacy settings.
 * Provides methods to interact with UI elements for revealing and managing private keys.
 */
class RevealPrivateKey {
  /**
   * Gets the main container element for the reveal private key view.
   * @returns The container DetoxElement
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(
      RevealSeedViewSelectorsIDs.REVEAL_CREDENTIAL_CONTAINER_ID,
    );
  }
  /**
   * Gets the password input field element for revealing credentials.
   * @returns The password input DetoxElement
   */
  get passwordInputToRevealCredential(): DetoxElement {
    return Matchers.getElementByID(
      RevealSeedViewSelectorsIDs.PASSWORD_INPUT_BOX_ID,
    );
  }

  /**
   * Gets the password warning element that displays validation messages.
   * @returns The password warning DetoxElement
   */
  get passwordWarning(): DetoxElement {
    return Matchers.getElementByID(
      RevealSeedViewSelectorsIDs.PASSWORD_WARNING_ID,
    );
  }

  /**
   * Gets the scroll view identifier for scrolling operations.
   * @returns Promise resolving to the scroll view DetoxMatcher
   */
  get scrollViewIdentifier(): Promise<DetoxMatcher> {
    return Matchers.getIdentifier(
      RevealSeedViewSelectorsIDs.REVEAL_CREDENTIAL_SCROLL_ID,
    );
  }

  /**
   * Gets the private key text element that displays the revealed private key.
   * @returns The private key text DetoxElement
   */
  get privateKey(): DetoxElement {
    return Matchers.getElementByText(
      RevealSeedViewSelectorsIDs.REVEAL_CREDENTIAL_TEXT,
    );
  }
  /**
   * Gets the reveal private key button element.
   * @returns The reveal private key button DetoxElement
   */
  get revealPrivateKeyButton(): DetoxElement {
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

  async tapDoneButton(): Promise<void> {
    await Gestures.waitAndTap(this.doneButton, {
      elemDescription: 'Done button',
    });
  }

  async tapToReveal(): Promise<void> {
    await Gestures.waitAndTap(this.revealPrivateKeyButton, {
      elemDescription: 'Reveal private key button',
    });
  }

  async tapToCopyCredentialToClipboard(): Promise<void> {
    await Gestures.tap(this.revealCredentialCopyToClipboardButton, {
      elemDescription: 'Reveal credential copy to clipboard button',
    });
  }

  async tapToRevealPrivateCredentialQRCode(): Promise<void> {
    await Gestures.tap(this.revealCredentialQRCodeTab, {
      elemDescription: 'Reveal credential QR code tab',
    });
  }

  async scrollToDone(): Promise<void> {
    await Gestures.scrollToElement(this.doneButton, this.scrollViewIdentifier);
  }
  async enterPasswordToRevealSecretCredential(password: string): Promise<void> {
    await Gestures.typeText(this.passwordInputToRevealCredential, password, {
      elemDescription: 'Password input',
      hideKeyboard: true,
    });
  }
}

export default new RevealPrivateKey();
