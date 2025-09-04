import { BrowserViewSelectorsIDs } from '../../selectors/Browser/BrowserView.selectors';
import {
  PortfolioPageSelectorsXpath,
  PortfolioPageSelectorsWebID,
} from '../../selectors/Browser/PortfolioPage.selectors';
import Gestures from '../../framework/Gestures';
import Matchers from '../../framework/Matchers';

/**
 * Page object model for the Portfolio home page in the browser.
 * Provides methods to interact with portfolio-related UI elements and actions.
 */
class PortfolioHomePage {
  /**
   * Gets the connect wallet button element.
   * @returns The WebElement for the connect wallet button
   */
  get connectWalletButton(): WebElement {
    return Matchers.getElementByWebID(
      BrowserViewSelectorsIDs.BROWSER_WEBVIEW_ID,
      PortfolioPageSelectorsWebID.CONNECT_WALLET_BUTTON,
    );
  }

  /**
   * Gets the close icon element for the privacy modal.
   * @returns The WebElement for the privacy modal close icon
   */
  get closeIconPrivacyModal(): WebElement {
    return Matchers.getElementByXPath(
      BrowserViewSelectorsIDs.BROWSER_WEBVIEW_ID,
      PortfolioPageSelectorsXpath.CLOSE_PRIVACY_MODAL,
    );
  }

  /**
   * Gets the account button element.
   * @returns The WebElement for the account button
   */
  get accountButton(): WebElement {
    return Matchers.getElementByXPath(
      BrowserViewSelectorsIDs.BROWSER_WEBVIEW_ID,
      PortfolioPageSelectorsXpath.ACCOUNT_ICON_HREF,
    );
  }

  /**
   * Gets the burger menu button element.
   * @returns The WebElement for the burger menu button
   */
  get burgerMenu(): WebElement {
    return Matchers.getElementByWebID(
      BrowserViewSelectorsIDs.BROWSER_WEBVIEW_ID,
      PortfolioPageSelectorsWebID.BURGER_MENU_BUTTON,
    );
  }

  /**
   * Taps the connect MetaMask wallet button.
   * @returns Promise that resolves when the tap action is complete
   */
  async tapConnectMetaMask(): Promise<void> {
    await Gestures.waitAndTap(this.connectWalletButton, {
      elemDescription: 'Portfolio - Connect MetaMask button',
    });
  }

  async closePrivacyModal(): Promise<void> {
    await Gestures.waitAndTap(this.closeIconPrivacyModal, {
      elemDescription: 'Portfolio - Close privacy modal',
    });
  }

  async tapAccountButton(): Promise<void> {
    await Gestures.waitAndTap(this.accountButton, {
      elemDescription: 'Portfolio - Account button',
    });
  }

  async tapBurgerMenu(): Promise<void> {
    await Gestures.waitAndTap(this.burgerMenu, {
      elemDescription: 'Portfolio - Burger menu',
    });
  }
}

export default new PortfolioHomePage();
