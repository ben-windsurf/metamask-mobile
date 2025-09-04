import { ContactsViewSelectorIDs } from '../../../selectors/Settings/Contacts/ContacsView.selectors';
import Matchers from '../../../framework/Matchers';
import Gestures from '../../../framework/Gestures';
import Assertions from '../../../framework/Assertions';

/**
 * Page object for the Contacts view in Settings.
 * Provides methods to interact with contact management functionality.
 */
class ContactsView {
  /**
   * Gets the main container element for the contacts view.
   * @returns The container DetoxElement
   */
  get container(): DetoxElement {
    return Matchers.getElementByID(ContactsViewSelectorIDs.CONTAINER);
  }

  /**
   * Gets the add contact button element, handling platform differences.
   * @returns The add button DetoxElement
   */
  get addButton(): DetoxElement {
    return device.getPlatform() === 'ios'
      ? Matchers.getElementByID(ContactsViewSelectorIDs.ADD_BUTTON)
      : Matchers.getElementByLabel(ContactsViewSelectorIDs.ADD_BUTTON);
  }

  /**
   * Taps on a contact by its alias name.
   * @param alias - The alias name of the contact to tap
   */
  async tapOnAlias(alias: string): Promise<void> {
    const contactAlias = Matchers.getElementByText(alias);
    await Gestures.waitAndTap(contactAlias, {
      elemDescription: `Contact Alias: ${alias}`,
    });
  }

  /**
   * Taps the add contact button to create a new contact.
   */
  async tapAddContactButton(): Promise<void> {
    await Gestures.waitAndTap(this.addButton, {
      elemDescription: 'Add Contact Button',
    });
  }

  /**
   * Verifies that a contact alias is visible on the screen.
   * @param alias - The alias name to check for visibility
   */
  async isContactAliasVisible(alias: string): Promise<void> {
    await Assertions.expectTextDisplayed(alias);
  }

  /**
   * Verifies that a contact alias is not visible on the screen.
   * @param alias - The alias name to check for absence
   */
  async isContactAliasNotVisible(alias: string): Promise<void> {
    await Assertions.expectTextNotDisplayed(alias);
  }
}

export default new ContactsView();
