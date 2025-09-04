import Matchers from '../../framework/Matchers';
import Gestures from '../../framework/Gestures';
import { TabBarSelectorIDs } from '../../selectors/wallet/TabBar.selectors';

/**
 * Page object class for interacting with the tab bar component in the MetaMask mobile app.
 * Provides methods to access tab bar buttons and perform navigation actions.
 */
class TabBarComponent {
  /**
   * Gets the browser tab button element.
   * @returns The browser tab button DetoxElement
   */
  get tabBarBrowserButton(): DetoxElement {
    return Matchers.getElementByID(TabBarSelectorIDs.BROWSER);
  }

  /**
   * Gets the wallet tab button element.
   * @returns The wallet tab button DetoxElement
   */
  get tabBarWalletButton(): DetoxElement {
    return Matchers.getElementByID(TabBarSelectorIDs.WALLET);
  }

  /**
   * Gets the actions tab button element.
   * @returns The actions tab button DetoxElement
   */
  get tabBarActionButton(): DetoxElement {
    return Matchers.getElementByID(TabBarSelectorIDs.ACTIONS);
  }

  /**
   * Gets the settings tab button element.
   * @returns The settings tab button DetoxElement
   */
  get tabBarSettingButton(): DetoxElement {
    return Matchers.getElementByID(TabBarSelectorIDs.SETTING);
  }

  /**
   * Gets the activity tab button element.
   * @returns The activity tab button DetoxElement
   */
  get tabBarActivityButton(): DetoxElement {
    return Matchers.getElementByID(TabBarSelectorIDs.ACTIVITY);
  }

  /**
   * Taps the browser tab button to navigate to the browser view.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapBrowser(): Promise<void> {
    await Gestures.waitAndTap(this.tabBarBrowserButton, {
      elemDescription: 'Tab Bar - Browser Button',
    });
  }

  /**
   * Taps the wallet tab button to navigate to the wallet view.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapWallet(): Promise<void> {
    await Gestures.waitAndTap(this.tabBarWalletButton, {
      elemDescription: 'Tab Bar - Wallet Button',
    });
  }

  async tapActions(): Promise<void> {
    await Gestures.waitAndTap(this.tabBarActionButton, {
      elemDescription: 'Tab Bar - Actions Button',
    });
  }

  async tapSettings(): Promise<void> {
    await Gestures.waitAndTap(this.tabBarSettingButton, {
      elemDescription: 'Tab Bar - Settings Button',
    });
  }

  async tapActivity(): Promise<void> {
    await Gestures.waitAndTap(this.tabBarActivityButton, {
      elemDescription: 'Tab Bar - Activity Button',
    });
  }
}

export default new TabBarComponent();
