const getWindowInformation = `
  const shortcutIcon = window.document.querySelector('head > link[rel="shortcut icon"]');
  const icon = shortcutIcon || Array.from(window.document.querySelectorAll('head > link[rel="icon"]')).find((icon) => Boolean(icon.href));

  const siteName = document.querySelector('head > meta[property="og:site_name"]');
  const title = siteName || document.querySelector('head > meta[name="title"]');
  window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify(
    {
      type: 'GET_TITLE_FOR_BOOKMARK',
      payload: {
        title: title ? title.content : document.title,
        url: location.href,
        icon: icon && icon.href
      }
    }
  ))
`;

/**
 * JavaScript code that listens for URL changes in Single Page Applications (SPAs).
 * Intercepts history.pushState and history.replaceState to detect navigation changes
 * and posts messages to React Native WebView with updated URL and title information.
 */
export const SPA_urlChangeListener = `(function () {
  var __mmHistory = window.history;
  var __mmPushState = __mmHistory.pushState;
  var __mmReplaceState = __mmHistory.replaceState;
  function __mm__updateUrl(){
    const siteName = document.querySelector('head > meta[property="og:site_name"]');
    const title = siteName || document.querySelector('head > meta[name="title"]') || document.title;
    const height = Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight);

    window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify(
      {
        type: 'NAV_CHANGE',
        payload: {
          url: location.href,
          title: title,
        }
      }
    ));

    setTimeout(() => {
      const height = Math.max(document.documentElement.clientHeight, document.documentElement.scrollHeight, document.body.clientHeight, document.body.scrollHeight);
      window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify(
      {
        type: 'GET_HEIGHT',
        payload: {
          height: height
        }
      }))
    }, 500);
  }

  __mmHistory.pushState = function(state) {
    setTimeout(function () {
      __mm__updateUrl();
    }, 100);
    return __mmPushState.apply(history, arguments);
  };

  __mmHistory.replaceState = function(state) {
    setTimeout(function () {
      __mm__updateUrl();
    }, 100);
    return __mmReplaceState.apply(history, arguments);
  };

  window.onpopstate = function(event) {
    __mm__updateUrl();
  };
  })();
`;

/**
 * JavaScript code that extracts window information including page title, URL, and favicon.
 * Posts the collected information to React Native WebView for bookmark creation.
 */
export const JS_WINDOW_INFORMATION = `
  (function () {
    ${getWindowInformation}
  })();
`;

/**
 * JavaScript code that deselects any currently selected text in the browser.
 * Supports both modern browsers (getSelection) and legacy IE (document.selection).
 */
export const JS_DESELECT_TEXT = `if (window.getSelection) {window.getSelection().removeAllRanges();}
else if (document.selection) {document.selection.empty();}`;

/**
 * Generates JavaScript code that posts a message to the MetaMask provider.
 * Includes origin validation to ensure messages are only sent to matching origins.
 *
 * @param message - The message object to send to the provider
 * @param origin - The expected origin for security validation
 * @returns JavaScript code string that posts the message with origin validation
 */
export const JS_POST_MESSAGE_TO_PROVIDER = (
  message: object,
  origin: string,
) => `(function () {
  try {
    // Only send message if origins match
    if (window.location.origin === ${JSON.stringify(origin)}) {
      window.postMessage(${JSON.stringify(message)}, ${JSON.stringify(origin)});
    } else {
      console.warn('MetaMask: Origin mismatch, blocking message');
    }
  } catch (e) {
    console.error('MetaMask postMessage error:', e);
  }
})();`;

/**
 * Generates JavaScript code for posting messages to iframes (currently disabled).
 * This function is a placeholder that returns empty code for security reasons.
 *
 * @param _message - The message object (unused in current implementation)
 * @param _origin - The target origin (unused in current implementation)
 * @returns Empty JavaScript function code
 */
export const JS_IFRAME_POST_MESSAGE_TO_PROVIDER = (
  _message: object,
  _origin: string,
) => `(function () {})()`;
/** Disable sending messages to iframes for now
 *
`(function () {
  const iframes = document.getElementsByTagName('iframe');
  for (let frame of iframes){

      try {
        frame.contentWindow.postMessage(${JSON.stringify(_message)}, '${_origin}');
      } catch (e) {
        //Nothing to do
      }

  }
})()`;
 */
