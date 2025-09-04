import Routes from '../../../constants/navigation/Routes';
import { InteractionManager } from 'react-native';
import DeeplinkManager from '../DeeplinkManager';
import { EXTERNAL_LINK_TYPE } from '../../../constants/browser';

/**
 * Handles browser URL navigation from deeplinks by either executing a callback
 * or navigating to the browser view with the provided URL.
 *
 * @param params - The parameters for handling the browser URL
 * @param params.deeplinkManager - The deeplink manager instance for navigation
 * @param params.url - The URL to navigate to or pass to the callback
 * @param params.callback - Optional callback function to execute with the URL instead of navigating
 */
function handleBrowserUrl({
  deeplinkManager,
  url,
  callback,
}: {
  deeplinkManager: DeeplinkManager;
  url: string;
  callback?: (url: string) => void;
}) {
  const handle = InteractionManager.runAfterInteractions(() => {
    if (callback) {
      callback(url);
    } else {
      deeplinkManager.navigation.navigate(Routes.BROWSER.HOME, {
        screen: Routes.BROWSER.VIEW,
        params: {
          newTabUrl: url,
          linkType: EXTERNAL_LINK_TYPE,
          timestamp: Date.now(),
        },
      });
    }
  });
  if (handle?.done) {
    handle.done();
  }
}

export default handleBrowserUrl;
