import { AddAddressModalSelectorsIDs } from '../../selectors/SendFlow/AddAddressModal.selectors';
import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object model for the Add Address Modal in the Send flow.
 * Provides methods to interact with elements and perform actions within the modal.
 */
class AddAddressModal {
  /**
   * Gets the container element of the Add Address Modal.
   * @returns The container DetoxElement
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(AddAddressModalSelectorsIDs.CONTAINER);
  }

  /**
   * Gets the alias input field element.
   * @returns The alias input DetoxElement
   */
  get aliasInput(): DetoxElement {
    return Matchers.getElementByID(
      AddAddressModalSelectorsIDs.ENTER_ALIAS_INPUT,
    );
  }

  /**
   * Gets the save button element, handling platform-specific differences.
   * @returns The save button DetoxElement
   */
  get saveButton(): DetoxElement {
    return device.getPlatform() === 'android'
      ? Matchers.getElementByLabel(AddAddressModalSelectorsIDs.SAVE_BUTTON)
      : Matchers.getElementByID(AddAddressModalSelectorsIDs.SAVE_BUTTON);
  }

  /**
   * Gets the title element of the Add Address Modal.
   * @returns The title DetoxElement
   */
  get title(): DetoxElement {
    return Matchers.getElementByID(AddAddressModalSelectorsIDs.TITLE);
  }

  /**
   * Types the provided alias name into the alias input field.
   * @param name - The alias name to type
   * @returns Promise that resolves when typing is complete
   */
  async typeInAlias(name: string): Promise<void> {
    await Gestures.typeText(this.aliasInput, name, {
      elemDescription: 'Alias Input Field in Add Address Modal',
      hideKeyboard: true,
    });
  }

  /**
   * Taps the save button to save the address with the entered alias.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapSaveButton(): Promise<void> {
    await Gestures.waitAndTap(this.saveButton, {
      elemDescription: 'Save Button in Add Address Modal',
    });
  }

  async tapTitle(): Promise<void> {
    await Gestures.waitAndTap(this.title, {
      elemDescription: 'Title in Add Address Modal',
    });
  }
}

export default new AddAddressModal();
