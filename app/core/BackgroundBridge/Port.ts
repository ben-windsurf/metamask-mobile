import {
  JS_POST_MESSAGE_TO_PROVIDER,
  JS_IFRAME_POST_MESSAGE_TO_PROVIDER,
} from '../../util/browserScripts';
// eslint-disable-next-line import/no-nodejs-modules, import/no-commonjs, @typescript-eslint/no-var-requires, @typescript-eslint/no-require-imports
const EventEmitter = require('events').EventEmitter;

/**
 * Port class that facilitates communication between the background bridge and in-app browser.
 * Extends EventEmitter to handle message passing using postMessage for secure cross-frame communication.
 *
 * @example
 * ```typescript
 * const port = new Port(webView, true);
 * port.postMessage({ type: 'connect' }, 'https://example.com');
 * ```
 */
class Port extends EventEmitter {
  /**
   * Creates a new Port instance for browser communication.
   *
   * @param browserWindow - The browser window or WebView instance to inject JavaScript into
   * @param isMainFrame - Whether this port is for the main frame (true) or an iframe (false)
   */
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(browserWindow: any, isMainFrame: boolean) {
    super();
    this._window = browserWindow;
    this._isMainFrame = isMainFrame;
  }

  /**
   * Posts a message to the browser window using JavaScript injection.
   * Prevents wildcard origins for security and uses appropriate script based on frame type.
   *
   * @param msg - The message object to send to the provider
   * @param origin - The target origin for the message (wildcard '*' not allowed)
   */
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  postMessage = (msg: any, origin: string) => {
    if (origin === '*') {
      console.warn('Wildcard origin not allowed');
      return;
    }

    const js = this._isMainFrame
      ? JS_POST_MESSAGE_TO_PROVIDER(msg, origin)
      : JS_IFRAME_POST_MESSAGE_TO_PROVIDER(msg, origin);

    this._window?.injectJavaScript(js);
  };
}

export default Port;
