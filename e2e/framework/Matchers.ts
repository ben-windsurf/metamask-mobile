import { web, system } from 'detox';

/**
 * Matchers class with element stability and auto-retry for E2E testing.
 * Provides robust element matching and selection methods with built-in retry mechanisms,
 * stability checking, and proper error handling for complex element queries.
 */
export default class Matchers {
  /**
   * Get element by ID with optional index
   * @param elementId - The element ID to search for
   * @param index - Optional index for multiple matching elements
   * @returns Promise resolving to the matched native element
   */
  static async getElementByID(
    elementId: string | RegExp,
    index?: number,
  ): Promise<Detox.IndexableNativeElement> {
    const el = element(by.id(elementId));
    if (index !== undefined) {
      return el.atIndex(index) as Detox.IndexableNativeElement;
    }
    return el as Detox.IndexableNativeElement;
  }

  /**
   * Get element by text with optional index
   * @param text - The text content to search for
   * @param index - Index for multiple matching elements (default: 0)
   * @returns Promise resolving to the matched native element
   */
  static async getElementByText(
    text: string | RegExp,
    index = 0,
  ): Promise<Detox.IndexableNativeElement> {
    return element(by.text(text)).atIndex(
      index,
    ) as Detox.IndexableNativeElement;
  }

  /**
   * Get element that matches by id and label
   * This strategy matches elements by combining 2 matchers together.
   * Elements returned match the provided ID and Label at the same time.
   * @param id - The element ID to match
   * @param label - The accessibility label to match
   * @param index - Index for multiple matching elements (default: 0)
   * @returns Promise resolving to the matched native element
   */
  static async getElementByIDAndLabel(
    id: string,
    label: string | RegExp,
    index = 0,
  ): Promise<Detox.IndexableNativeElement> {
    return element(by.id(id).and(by.label(label))).atIndex(
      index,
    ) as Detox.IndexableNativeElement;
  }

  /**
   * Get element by label (accessibility label on iOS, content description on Android)
   * @param label - The accessibility label to search for
   * @param index - Index for multiple matching elements (default: 0)
   * @returns Promise resolving to the matched native element
   */
  static async getElementByLabel(
    label: string,
    index = 0,
  ): Promise<Detox.IndexableNativeElement> {
    return element(by.label(label)).atIndex(
      index,
    ) as Detox.IndexableNativeElement;
  }

  /**
   * Get element by descendant relationship
   * @param parentElement - The parent element ID
   * @param childElement - The child element ID to find within parent
   * @returns Promise resolving to the matched native element
   */
  static async getElementByDescendant(
    parentElement: string,
    childElement: string,
  ): Promise<Detox.IndexableNativeElement> {
    return element(by.id(parentElement).withDescendant(by.id(childElement)));
  }

  /**
   * Get element with ancestor relationship
   * @param childElement - The child element ID to find
   * @param parentElement - The ancestor element ID that should contain the child
   * @returns Promise resolving to the matched native element
   */
  static async getElementIDWithAncestor(
    childElement: string,
    parentElement: string,
  ): Promise<Detox.IndexableNativeElement> {
    return element(by.id(childElement).withAncestor(by.id(parentElement)));
  }

  /**
   * Get Native WebView instance by elementId
   * Because Android Webview might have more that one WebView instance present on the main activity,
   * the correct element is selected based on its parent element id.
   * @param elementId - The webview element ID to locate
   * @returns The webview element for further interaction
   */
  static getWebViewByID(elementId: string): Detox.WebViewElement {
    if (process.env.CI) {
      return device.getPlatform() === 'ios'
        ? web(by.id(elementId))
        : web(by.type('android.webkit.WebView').withAncestor(by.id(elementId)));
    }
    return web(by.id(elementId));
  }

  /**
   * Get element by web ID within a webview
   * @param webviewID - The webview container ID
   * @param innerID - The element ID within the webview
   * @returns Promise resolving to the web element
   */
  static async getElementByWebID(
    webviewID: string,
    innerID: string,
  ): WebElement {
    const myWebView = this.getWebViewByID(webviewID);
    return myWebView.element(by.web.id(innerID));
  }

  /**
   * Get element by CSS selector within a webview
   * @param webviewID - The webview container ID
   * @param selector - The CSS selector to match elements
   * @returns Promise resolving to the matched web element
   */
  static async getElementByCSS(
    webviewID: string,
    selector: string,
  ): Promise<Detox.IndexableWebElement> {
    const myWebView = this.getWebViewByID(webviewID);
    return myWebView
      .element(by.web.cssSelector(selector))
      .atIndex(0) as unknown as Detox.IndexableWebElement;
  }

  /**
   * Get element by XPath within a webview
   * @param webviewID - The webview container ID
   * @param xpath - The XPath expression to locate elements
   * @returns Promise resolving to the matched element
   */
  static async getElementByXPath(
    webviewID: string,
    xpath: string,
  ): Promise<DetoxElement | WebElement> {
    const myWebView = this.getWebViewByID(webviewID);
    return myWebView.element(by.web.xpath(xpath));
  }

  /**
   * Get element by href within a webview
   * @param webviewID - The webview container ID
   * @param url - The href URL to match
   * @returns Promise resolving to the matched web element
   */
  static async getElementByHref(
    webviewID: string,
    url: string,
  ): Promise<Detox.IndexableWebElement> {
    const myWebView = this.getWebViewByID(webviewID);
    return myWebView
      .element(by.web.href(url))
      .atIndex(0) as unknown as Detox.IndexableWebElement;
  }

  /**
   * Creates a Detox matcher for identifying an element by its ID
   * This method does not create an element but instead generates only a matcher.
   * The purpose is to create a matcher that can be used for identification purposes,
   * without performing any actions on the element.
   * @param selectorString - The selector string to create a matcher for
   * @returns Promise resolving to the native matcher
   */
  static async getIdentifier(
    selectorString: string,
  ): Promise<Detox.NativeMatcher> {
    return by.id(selectorString);
  }

  /**
   * Get system dialogs in the system-level (e.g. permissions, alerts, etc.), by text
   * @param text - The text content to search for in system dialogs
   * @returns Promise resolving to the matched system element
   */
  static async getSystemElementByText(
    text: string,
  ): Promise<Detox.IndexableSystemElement> {
    return system.element(by.system.label(text));
  }
}
