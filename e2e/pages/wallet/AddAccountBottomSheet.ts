import { AddAccountBottomSheetSelectorsIDs } from '../../selectors/wallet/AddAccountBottomSheet.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the Add Account bottom sheet in the wallet.
 * Provides methods to interact with account creation and import options.
 */
class AddAccountBottomSheet {
  /**
   * Gets the import account button element.
   * @returns The DetoxElement for the import account button
   */
  get importAccountButton(): DetoxElement {
    return Matchers.getElementByID(
      AddAccountBottomSheetSelectorsIDs.IMPORT_ACCOUNT_BUTTON,
    );
  }

  /**
   * Gets the create Ethereum account button element.
   * @returns The DetoxElement for the create Ethereum account button
   */
  get createEthereumAccountButton(): DetoxElement {
    return Matchers.getElementByID(
      AddAccountBottomSheetSelectorsIDs.ADD_ETHEREUM_ACCOUNT_BUTTON,
    );
  }

  /**
   * Gets the create Solana account button element.
   * @returns The DetoxElement for the create Solana account button
   */
  get createSolanaAccountButton(): DetoxElement {
    return Matchers.getElementByID(
      AddAccountBottomSheetSelectorsIDs.ADD_SOLANA_ACCOUNT_BUTTON,
    );
  }

  /**
   * Gets the import SRP (Secret Recovery Phrase) button element.
   * @returns The DetoxElement for the import SRP button
   */
  get importSrpButton(): DetoxElement {
    return Matchers.getElementByID(
      AddAccountBottomSheetSelectorsIDs.IMPORT_SRP_BUTTON,
    );
  }

  /**
   * Taps the import account button to initiate account import flow.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapImportAccount(): Promise<void> {
    await Gestures.waitAndTap(this.importAccountButton, {
      elemDescription: 'Import Account button',
    });
  }

  /**
   * Taps the create Ethereum account button to create a new Ethereum account.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapCreateEthereumAccount(): Promise<void> {
    await Gestures.waitAndTap(this.createEthereumAccountButton, {
      elemDescription: 'Create New Ethereum Account button',
    });
  }

  async tapImportSrp(): Promise<void> {
    await Gestures.waitAndTap(this.importSrpButton, {
      elemDescription: 'Import SRP button',
    });
  }

  async tapAddSolanaAccount(): Promise<void> {
    await Gestures.waitAndTap(this.createSolanaAccountButton, {
      elemDescription: 'Add Solana Account button',
    });
  }
}

export default new AddAccountBottomSheet();
