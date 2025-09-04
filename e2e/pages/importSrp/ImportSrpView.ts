import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { ImportSRPIDs } from '../../selectors/MultiSRP/SRPImport.selectors';

/**
 * Page object for the Import SRP (Secret Recovery Phrase) view in end-to-end tests.
 * Provides methods to interact with SRP import UI elements and perform import operations.
 */
class ImportSrpView {
  /**
   * Gets the main container element for the Import SRP view.
   * @returns The container DetoxElement
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(ImportSRPIDs.CONTAINER);
  }

  /**
   * Gets the import button element, handling platform-specific differences.
   * @returns The import button DetoxElement
   */
  get importButton(): DetoxElement {
    return device.getPlatform() === 'ios'
      ? Matchers.getElementByID(ImportSRPIDs.IMPORT_BUTTON)
      : Matchers.getElementByLabel(ImportSRPIDs.IMPORT_BUTTON);
  }

  /**
   * Gets the SRP selection dropdown element.
   * @returns The dropdown DetoxElement for selecting SRP word count
   */
  get dropdown(): DetoxElement {
    return Matchers.getElementByID(ImportSRPIDs.SRP_SELECTION_DROPDOWN);
  }

  /**
   * Gets the input element for a specific SRP word by index.
   * @param srpIndex - The index of the SRP word input field
   * @returns The input DetoxElement for the specified SRP word
   */
  inputOfIndex(srpIndex: number): DetoxElement {
    return Matchers.getElementByID(
      ImportSRPIDs.SRP_INPUT_WORD_NUMBER + `-${String(srpIndex)}`,
    );
  }

  /**
   * Taps the import button to proceed with SRP import.
   * @returns Promise that resolves when the import button is tapped
   */
  async tapImportButton() {
    await Gestures.waitAndTap(this.importButton, {
      elemDescription: 'Import button',
    });
  }

  async enterSrpWord(srpIndex: number, word: string) {
    await Gestures.typeText(this.inputOfIndex(srpIndex), word, {
      elemDescription: `SRP word input at index ${srpIndex}`,
      hideKeyboard: true,
    });
  }

  async selectNWordSrp(numberOfWords: number) {
    await Gestures.waitAndTap(this.dropdown);
    await Gestures.waitAndTap(
      Matchers.getElementByLabel(
        `I have a ${String(numberOfWords)} word phrase`,
      ),
    );
  }
}

export default new ImportSrpView();
