import { TermsOfUseModalSelectorsIDs } from '../../selectors/Onboarding/TermsOfUseModal.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the Terms of Use modal in the onboarding flow.
 * Provides methods to interact with modal elements and perform user actions.
 */
class TermsOfUseModal {
  /**
   * Gets the main container element of the Terms of Use modal.
   * @returns The container DetoxElement for the modal
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(TermsOfUseModalSelectorsIDs.CONTAINER);
  }

  /**
   * Gets the agreement checkbox element.
   * @returns The checkbox DetoxElement for agreeing to terms
   */
  get checkbox(): DetoxElement {
    return Matchers.getElementByID(TermsOfUseModalSelectorsIDs.CHECKBOX);
  }

  /**
   * Gets the scroll arrow button element.
   * @returns The scroll arrow DetoxElement for navigating through terms
   */
  get scrollArrowButton(): DetoxElement {
    return Matchers.getElementByID(
      TermsOfUseModalSelectorsIDs.SCROLL_ARROW_BUTTON,
    );
  }

  /**
   * Gets the accept button element.
   * @returns The accept DetoxElement for confirming terms acceptance
   */
  get acceptButton(): DetoxElement {
    return Matchers.getElementByID(TermsOfUseModalSelectorsIDs.ACCEPT_BUTTON);
  }

  /**
   * Gets the close button element.
   * @returns The close DetoxElement for dismissing the modal
   */
  get closeButton(): DetoxElement {
    return Matchers.getElementByID(TermsOfUseModalSelectorsIDs.CLOSE_BUTTON);
  }

  /**
   * Taps the agreement checkbox to indicate acceptance of terms.
   * @returns Promise that resolves when the checkbox is tapped
   */
  async tapAgreeCheckBox(): Promise<void> {
    await Gestures.waitAndTap(this.checkbox, {
      elemDescription: 'Terms of Use Modal Agree Checkbox',
    });
  }

  async tapScrollEndButton(): Promise<void> {
    await Gestures.waitAndTap(this.scrollArrowButton, {
      elemDescription: 'Terms of Use Modal Scroll Arrow Button',
    });
  }

  async tapAcceptButton(): Promise<void> {
    await Gestures.waitAndTap(this.acceptButton, {
      elemDescription: 'Terms of Use Modal Accept Button',
    });
  }

  async tapCloseButton(): Promise<void> {
    await Gestures.waitAndTap(this.closeButton, {
      elemDescription: 'Terms of Use Modal Close Button',
    });
  }
}

export default new TermsOfUseModal();
