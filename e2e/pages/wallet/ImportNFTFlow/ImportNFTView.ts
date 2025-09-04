import Matchers from '../../../framework/Matchers';
import Gestures from '../../../framework/Gestures';
import { NFTImportScreenSelectorsIDs } from '../../../selectors/wallet/ImportNFTView.selectors';

/**
 * Page object model for the Import NFT view in end-to-end tests.
 * Provides methods to interact with NFT import form elements and perform actions.
 */
class ImportNFTView {
  /**
   * Gets the main container element for the Import NFT screen.
   * @returns The container DetoxElement for the Import NFT view
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(NFTImportScreenSelectorsIDs.CONTAINER);
  }

  /**
   * Gets the NFT contract address input field element.
   * @returns The address input DetoxElement
   */
  get addressInput(): DetoxElement {
    return Matchers.getElementByID(
      NFTImportScreenSelectorsIDs.ADDRESS_INPUT_BOX,
    );
  }

  /**
   * Gets the warning message element that appears for invalid addresses.
   * @returns The address warning message DetoxElement
   */
  get addressWarningMessage(): DetoxElement {
    return Matchers.getElementByID(
      NFTImportScreenSelectorsIDs.ADDRESS_WARNING_MESSAGE,
    );
  }

  /**
   * Gets the NFT token identifier input field element.
   * @returns The identifier input DetoxElement
   */
  get identifierInput(): DetoxElement {
    return Matchers.getElementByID(
      NFTImportScreenSelectorsIDs.IDENTIFIER_INPUT_BOX,
    );
  }

  /**
   * Types the NFT contract address into the address input field.
   * @param address - The NFT contract address to enter
   * @returns Promise that resolves when the address has been typed
   */
  async typeInNFTAddress(address: string): Promise<void> {
    await Gestures.typeText(this.addressInput, address, {
      elemDescription: 'NFT Address Input',
      hideKeyboard: true,
    });
  }

  /**
   * Types the NFT token identifier into the identifier input field.
   * @param identifier - The NFT token identifier (token ID) to enter
   * @returns Promise that resolves when the identifier has been typed
   */
  async typeInNFTIdentifier(identifier: string): Promise<void> {
    await Gestures.typeText(this.identifierInput, identifier, {
      elemDescription: 'NFT Identifier Input',
      hideKeyboard: true,
    });
  }
}

export default new ImportNFTView();
