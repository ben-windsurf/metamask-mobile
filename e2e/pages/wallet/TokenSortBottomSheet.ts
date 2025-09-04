import { WalletViewSelectorsIDs } from '../../selectors/wallet/WalletView.selectors';
import Gestures from '../../framework/Gestures';
import Matchers from '../../framework/Matchers';

/**
 * Page object model for the token sort bottom sheet modal.
 * Provides methods to interact with sorting options for wallet tokens.
 */
class SortModal {
  /**
   * Gets the sort alphabetically button element.
   * @returns The DetoxElement for the alphabetical sort option
   */
  get sortAlphabetically(): DetoxElement {
    return Matchers.getElementByID(WalletViewSelectorsIDs.SORT_ALPHABETICAL);
  }

  /**
   * Gets the sort by fiat amount button element.
   * @returns The DetoxElement for the fiat amount sort option
   */
  get sortFiatAmount(): DetoxElement {
    return Matchers.getElementByID(
      WalletViewSelectorsIDs.SORT_DECLINING_BALANCE,
    );
  }

  /**
   * Taps the sort alphabetically option.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapSortAlphabetically(): Promise<void> {
    await Gestures.waitAndTap(this.sortAlphabetically, {
      elemDescription: 'Sort Alphabetically',
    });
  }

  /**
   * Taps the sort by fiat amount option.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapSortFiatAmount(): Promise<void> {
    await Gestures.waitAndTap(this.sortFiatAmount, {
      elemDescription: 'Sort by Fiat Amount',
    });
  }
}

export default new SortModal();
