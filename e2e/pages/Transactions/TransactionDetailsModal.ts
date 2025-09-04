import {
  TransactionDetailsModalSelectorsText,
  TransactionDetailsModalSelectorsIDs,
} from '../../selectors/Transactions/TransactionDetailsModal.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { logger } from '../../framework';

/**
 * Page object model for the Transaction Details Modal in end-to-end tests.
 * Provides methods to interact with and validate the transaction details modal UI elements.
 */
class TransactionDetailsModal {
  /**
   * Gets the title element of the transaction details modal.
   * @returns The title element for interaction in tests
   */
  get title(): DetoxElement {
    return Matchers.getElementByID(TransactionDetailsModalSelectorsIDs.TITLE);
  }

  /**
   * Gets the close icon element of the transaction details modal.
   * @returns The close icon element for interaction in tests
   */
  get closeIcon(): DetoxElement {
    return Matchers.getElementByID(
      TransactionDetailsModalSelectorsIDs.CLOSE_ICON,
    );
  }

  /**
   * Generates the expected title text for the transaction details modal by replacing token placeholders.
   * @param sourceToken - The source token symbol to replace in the title template
   * @param destinationToken - The destination token symbol to replace in the title template
   * @returns The formatted title string with token symbols replaced
   */
  generateExpectedTitle(sourceToken: string, destinationToken: string): string {
    let title = TransactionDetailsModalSelectorsText.TITLE;
    title = title.replace('{{sourceToken}}', sourceToken);
    title = title.replace('{{destinationToken}}', destinationToken);
    return title;
  }

  /**
   * Taps on the close icon to dismiss the transaction details modal.
   * Includes error handling to gracefully handle tap failures.
   * @returns Promise that resolves when the tap action is completed or fails gracefully
   */
  async tapOnCloseIcon(): Promise<void> {
    try {
      await Gestures.waitAndTap(this.closeIcon);
    } catch {
      // Handle error
      logger.warn(
        'TransactionDetailsModal: tapOnCloseIcon - failed, skipping tap.',
      );
    }
  }
}

export default new TransactionDetailsModal();
