import { SRPListItemSelectorsIDs } from '../../../../selectors/MultiSRP/SRPListItem.selectors';
import Matchers from '../../../../framework/Matchers.ts';
import Gestures from '../../../../framework/Gestures.ts';

/**
 * Page object component for interacting with SRP (Secret Recovery Phrase) list items
 * in the multi-SRP wallet interface. Provides methods to access and interact with
 * SRP list elements during end-to-end testing.
 */
class SRPListItemComponent {
  /**
   * Gets the main SRP list item element
   * @returns The SRP list item element matcher
   */
  get listItem() {
    return Matchers.getElementByID(SRPListItemSelectorsIDs.SRP_LIST_ITEM);
  }

  /**
   * Gets the toggle button element for showing/hiding account details
   * @returns The account toggle element matcher
   */
  get accountToggle() {
    return Matchers.getElementByID(
      SRPListItemSelectorsIDs.SRP_LIST_ITEM_TOGGLE_SHOW,
    );
  }

  /**
   * Gets the accounts list element within the SRP list item
   * @returns The accounts list element matcher
   */
  get accountList() {
    return Matchers.getElementByID(
      SRPListItemSelectorsIDs.SRP_LIST_ITEM_ACCOUNTS_LIST,
    );
  }

  /**
   * Taps the account toggle button to show/hide account details
   * @returns Promise that resolves when the tap gesture is completed
   */
  async tapToggle() {
    await Gestures.waitAndTap(this.accountToggle);
  }

  /**
   * Taps a specific SRP list item by its ID
   * @param srpId - The unique identifier of the SRP to tap
   * @returns Promise that resolves when the tap gesture is completed
   */
  async tapListItem(srpId: string) {
    const srpSelector = Matchers.getElementByID(
      `${SRPListItemSelectorsIDs.SRP_LIST_ITEM}-${srpId}`,
    );
    await Gestures.waitAndTap(srpSelector);
  }

  async tapListItemByIndex(index: number) {
    const srpSelector = Matchers.getElementByID(
      new RegExp(`^${SRPListItemSelectorsIDs.SRP_LIST_ITEM}-\\w+$`),
      index,
    );
    await Gestures.waitAndTap(srpSelector, {
      elemDescription: `SRP List Item at index ${index}`,
    });
  }
}

export default new SRPListItemComponent();
