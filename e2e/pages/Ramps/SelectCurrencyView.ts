import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';

/**
 * Page object for the Select Currency View in the Ramps flow.
 * Provides methods to interact with currency selection options.
 */
class SelectCurrencyView {
  /**
   * Taps on a specific currency option in the currency selection list.
   *
   * @param currency - The name of the currency to select (e.g., "USD", "EUR")
   * @returns Promise that resolves when the tap action is completed
   */
  async tapCurrencyOption(currency: string): Promise<void> {
    const currencyOption = Matchers.getElementByText(currency);
    await Gestures.waitAndTap(currencyOption, {
      elemDescription: `Currency "${currency}" in Select Currency View`,
    });
  }
}

export default new SelectCurrencyView();
