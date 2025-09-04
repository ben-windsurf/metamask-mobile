import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { ErrorBoundarySelectorsText } from '../../selectors/ErrorBoundary/ErrorBoundaryView.selectors';

/**
 * Page object model for the Error Boundary view in end-to-end tests.
 * Provides methods to interact with error boundary UI elements and perform actions.
 */
class ErrorBoundaryView {
  /**
   * Gets the title element of the error boundary view.
   * @returns The title element for interaction in tests
   */
  get title(): DetoxElement {
    return Matchers.getElementByText(ErrorBoundarySelectorsText.TITLE);
  }

  /**
   * Gets the SRP (Secret Recovery Phrase) link text element.
   * @returns The SRP link text element for interaction in tests
   */
  get srpLinkText(): DetoxElement {
    return Matchers.getElementByText(
      ErrorBoundarySelectorsText.SAVE_YOUR_SRP_TEXT,
    );
  }

  /**
   * Taps on the SRP link text element.
   * Waits for the element to be available before tapping.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapSRPLinkText(): Promise<void> {
    await Gestures.waitAndTap(this.srpLinkText, {
      elemDescription: 'SRP link text',
    });
  }
}

export default new ErrorBoundaryView();
