import { AdvancedViewSelectorsIDs } from '../../selectors/Settings/AdvancedView.selectors';
import Gestures from '../../framework/Gestures';
import Matchers from '../../framework/Matchers';

/**
 * Page object model for the Advanced Settings view in the MetaMask mobile app.
 * Provides methods to interact with advanced settings toggles and controls.
 */
class AdvancedSettingsView {
  /**
   * Gets the scroll view identifier for the advanced settings screen.
   * @returns Promise that resolves to the native matcher for the scroll view
   */
  get scrollViewIdentifier(): Promise<Detox.NativeMatcher> {
    return Matchers.getIdentifier(
      AdvancedViewSelectorsIDs.ADVANCED_SETTINGS_SCROLLVIEW,
    );
  }

  /**
   * Gets the toggle element for showing fiat values on testnets.
   * @returns DetoxElement for the show fiat on testnets toggle
   */
  get showFiatOnTestnetsToggle(): DetoxElement {
    return Matchers.getElementByID(
      AdvancedViewSelectorsIDs.SHOW_FIAT_ON_TESTNETS,
    );
  }

  /**
   * Gets the toggle element for smart transactions feature.
   * @returns DetoxElement for the smart transactions toggle
   */
  get smartTransactionsToggle(): DetoxElement {
    return Matchers.getElementByID(AdvancedViewSelectorsIDs.STX_OPT_IN_SWITCH);
  }

  /**
   * Taps the show fiat on testnets toggle switch.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapShowFiatOnTestnetsSwitch(): Promise<void> {
    await Gestures.waitAndTap(this.showFiatOnTestnetsToggle, {
      elemDescription: 'Show Fiat on Testnets Toggle in Advanced Settings',
    });
  }

  /**
   * Taps the smart transactions toggle switch.
   * @returns Promise that resolves when the tap action is completed
   */
  async tapSmartTransactionSwitch(): Promise<void> {
    await Gestures.waitAndTap(this.smartTransactionsToggle, {
      elemDescription: 'Smart Transactions Toggle in Advanced Settings',
    });
  }

  async scrollToShowFiatOnTestnetsToggle(): Promise<void> {
    await Gestures.scrollToElement(
      this.showFiatOnTestnetsToggle,
      this.scrollViewIdentifier,
      {
        elemDescription: 'Scroll to Show Fiat on Testnets Toggle',
      },
    );
  }
}

export default new AdvancedSettingsView();
