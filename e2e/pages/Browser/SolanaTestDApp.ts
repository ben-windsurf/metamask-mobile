import { dataTestIds } from '@metamask/test-dapp-solana';
import { getLocalTestDappUrl } from '../../fixtures/utils';
import Matchers from '../../framework/Matchers';
import { BrowserViewSelectorsIDs } from '../../selectors/Browser/BrowserView.selectors';
import Browser from './BrowserView';
import Gestures from '../../framework/Gestures';
import { waitFor } from 'detox';
import { SolanaTestDappSelectorsWebIDs } from '../../selectors/Browser/SolanaTestDapp.selectors';

/**
 * Get a test element by data-testid
 * @param dataTestId - The data-testid of the element
 * @param options.tag - The tag of the element having the data-testid attribute (e.g. 'div', 'input', etc.). Defaults to 'div'
 * @param options.extraXPath - The extra xpath to the element (e.g. '/div/button'), useful for accessing elements we aren't able to assign a data-testid to
 * @returns The test element
 */
function getTestElement(
  dataTestId: string,
  options: { extraXPath?: string; tag?: string } = {},
): Promise<DetoxElement | WebElement> {
  const { tag = 'div', extraXPath = '' } = options;
  const xpath = `//${tag}[@data-testid="${dataTestId}"]${extraXPath}`;

  return Matchers.getElementByXPath(
    BrowserViewSelectorsIDs.BROWSER_WEBVIEW_ID,
    xpath,
  );
}

/**
 * Class to interact with the Multichain Test DApp via the WebView
 */
class SolanaTestDApp {
  /**
   * Get the connect button selector element
   * @returns WebElement for the connect button
   */
  get connectButtonSelector(): WebElement {
    return getTestElement(dataTestIds.testPage.header.connect, {
      extraXPath: '/div/button',
    });
  }

  /**
   * Get the disconnect button selector element
   * @returns WebElement for the disconnect button
   */
  get disconnectButtonSelector(): WebElement {
    return getTestElement(dataTestIds.testPage.header.disconnect, {
      extraXPath: '/button',
    });
  }

  /**
   * Get the endpoint input selector element
   * @returns WebElement for the endpoint input field
   */
  get endpointSelector(): WebElement {
    return getTestElement(dataTestIds.testPage.header.endpoint, {
      tag: 'input',
    });
  }

  /**
   * Get the wallet button selector element
   * @returns WebElement for the wallet selection button
   */
  get walletButtonSelector(): WebElement {
    return Matchers.getElementByCSS(
      BrowserViewSelectorsIDs.BROWSER_WEBVIEW_ID,
      SolanaTestDappSelectorsWebIDs.WALLET_BUTTON,
    );
  }

  /**
   * Get the confirm transaction button selector element
   * @returns WebElement for the confirm transaction button
   */
  get confirmTransactionButtonSelector(): WebElement {
    return Matchers.getElementByID(
      SolanaTestDappSelectorsWebIDs.CONFIRM_TRANSACTION_BUTTON,
    );
  }

  /**
   * Get the confirm sign message button selector element
   * @returns WebElement for the confirm sign message button
   */
  get confirmSignMessageButtonSelector(): WebElement {
    return Matchers.getElementByID(
      SolanaTestDappSelectorsWebIDs.CONFIRM_SIGN_MESSAGE_BUTTON,
    );
  }

  /**
   * Get the cancel button selector element
   * @returns WebElement for the cancel button
   */
  get cancelButtonSelector() {
    return Matchers.getElementByText('Cancel');
  }

  /**
   * Navigate to the Solana Test DApp
   * @returns Promise that resolves when navigation is complete
   */
  async navigateToSolanaTestDApp(): Promise<void> {
    await Browser.tapUrlInputBox();

    await Browser.navigateToURL(getLocalTestDappUrl());

    await waitFor(element(by.id(BrowserViewSelectorsIDs.BROWSER_WEBVIEW_ID)))
      .toBeVisible()
      .withTimeout(10000);
  }

  /**
   * Reload the Solana Test DApp page
   * @returns Promise that resolves when reload is complete
   */
  async reloadSolanaTestDApp(): Promise<void> {
    await Browser.reloadTab();

    await waitFor(element(by.id(BrowserViewSelectorsIDs.BROWSER_WEBVIEW_ID)))
      .toBeVisible()
      .withTimeout(10000);
  }

  /**
   * Tap a button in the WebView
   * @param webElement - The WebElement to tap
   * @returns Promise that resolves when the tap is complete
   */
  async tapButton(webElement: WebElement): Promise<void> {
    await Gestures.scrollToWebViewPort(webElement);
    await Gestures.tap(webElement);
  }

  /**
   * Get header interaction methods for the test DApp
   * @returns Object containing header interaction methods
   */
  getHeader() {
    return {
      connect: async () => {
        await this.tapButton(this.connectButtonSelector);
      },
      disconnect: async () => {
        await this.tapButton(this.disconnectButtonSelector);
      },
      selectMetaMask: async () => {
        await this.tapButton(this.walletButtonSelector);
      },
      getConnectionStatus: async () => {
        const connectionStatusDiv = await getTestElement(
          dataTestIds.testPage.header.connectionStatus,
        );
        return await connectionStatusDiv.getText();
      },
      getAccount: async () => {
        const account = await getTestElement(
          dataTestIds.testPage.header.account,
          { extraXPath: '/a' },
        );
        return await account.getText();
      },
    };
  }

  /**
   * Get sign message test interaction methods
   * @returns Object containing sign message test methods
   */
  getSignMessageTest() {
    return {
      signMessage: async () => {
        await this.tapButton(
          getTestElement(dataTestIds.testPage.signMessage.signMessage, {
            tag: 'button',
          }),
        );
      },
      getSignedMessage: async () =>
        (
          await getTestElement(dataTestIds.testPage.signMessage.signedMessage, {
            tag: 'pre',
          })
        ).getText(),
    };
  }

  getSendSolTest() {
    return {
      signTransaction: async () => {
        await this.tapButton(
          getTestElement(dataTestIds.testPage.sendSol.signTransaction, {
            tag: 'button',
          }),
        );
      },
      sendTransaction: async () => {
        await this.tapButton(
          getTestElement(dataTestIds.testPage.sendSol.sendTransaction, {
            tag: 'button',
          }),
        );
      },
      getSignedTransaction: async () =>
        (
          await getTestElement(dataTestIds.testPage.sendSol.signedTransaction, {
            tag: 'pre',
          })
        ).getText(),
      getTransactionHash: async () =>
        (
          await getTestElement(dataTestIds.testPage.sendSol.transactionHash, {
            tag: 'pre',
          })
        ).getText(),
    };
  }

  async confirmTransaction(): Promise<void> {
    await Gestures.waitAndTap(this.confirmTransactionButtonSelector);
  }

  async confirmSignMessage(): Promise<void> {
    await Gestures.waitAndTap(this.confirmSignMessageButtonSelector);
  }

  async tapCancelButton(): Promise<void> {
    await Gestures.waitAndTap(this.cancelButtonSelector);
  }
}

export default new SolanaTestDApp();
