import { AppState, AppStateStatus } from 'react-native';
import Logger from '../util/Logger';
import { MetaMetrics, MetaMetricsEvents } from './Analytics';
import { MetricsEventBuilder } from './Analytics/MetricsEventBuilder';
import { processAttribution } from './processAttribution';
import DevLogger from './SDKConnect/utils/DevLogger';
import ReduxService from './redux';
import generateDeviceAnalyticsMetaData from '../util/metrics';
import generateUserSettingsAnalyticsMetaData from '../util/metrics/UserSettingsAnalyticsMetaData/generateUserProfileAnalyticsMetaData';

/**
 * Manages app state changes and handles analytics tracking when the app becomes active.
 * Processes deeplinks and attribution data, and tracks user engagement metrics.
 */
export class AppStateEventListener {
  private appStateSubscription:
    | ReturnType<typeof AppState.addEventListener>
    | undefined = undefined;
  // TODO: The AppStateEventListener should be feature agnostic and shouldn't include deeplinks. Abstract this into a deeplink service instead
  public currentDeeplink: string | null = null;
  public pendingDeeplink: string | null = null;
  private lastAppState: AppStateStatus = AppState.currentState;

  /**
   * Creates a new AppStateEventListener instance.
   * Initializes the last app state to the current state.
   */
  constructor() {
    this.lastAppState = AppState.currentState;
  }

  /**
   * Starts listening for app state changes.
   * Sets up an event listener that triggers analytics processing when the app becomes active.
   */
  start() {
    if (this.appStateSubscription) {
      // Already started
      return;
    }
    this.appStateSubscription = AppState.addEventListener(
      'change',
      this.handleAppStateChange,
    );
  }

  /**
   * Sets the current deeplink for attribution tracking.
   *
   * @param deeplink - The deeplink URL to track, or null to clear
   */
  public setCurrentDeeplink(deeplink: string | null) {
    this.currentDeeplink = deeplink;
    this.pendingDeeplink = deeplink;
  }

  /**
   * Clears the pending deeplink after it has been processed.
   */
  public clearPendingDeeplink() {
    this.pendingDeeplink = null;
  }

  private handleAppStateChange = (nextAppState: AppStateStatus) => {
    if (nextAppState === 'active' && this.lastAppState !== nextAppState) {
      // delay to allow time for the deeplink to be set
      setTimeout(() => {
        this.processAppStateChange();
      }, 2000);
    }
    this.lastAppState = nextAppState;
  };

  private processAppStateChange = () => {
    try {
      const attribution = processAttribution({
        currentDeeplink: this.currentDeeplink,
        store: ReduxService.store,
      });
      const metrics = MetaMetrics.getInstance();
      // identify user with the latest traits
      const consolidatedTraits = {
        ...generateDeviceAnalyticsMetaData(),
        ...generateUserSettingsAnalyticsMetaData(),
      };
      metrics.addTraitsToUser(consolidatedTraits).catch((error) => {
        Logger.error(
          error as Error,
          'AppStateManager: Error adding traits to user',
        );
      });
      const appOpenedEventBuilder = MetricsEventBuilder.createEventBuilder(
        MetaMetricsEvents.APP_OPENED,
      );
      if (attribution) {
        const { attributionId, utm, ...utmParams } = attribution;
        DevLogger.log(
          `AppStateManager:: processAppStateChange:: sending event 'APP_OPENED' attributionId=${attribution.attributionId} utm=${attribution.utm}`,
          utmParams,
        );
        appOpenedEventBuilder.addProperties({ attributionId, ...utmParams });
      }
      metrics.trackEvent(appOpenedEventBuilder.build());
    } catch (error) {
      Logger.error(
        error as Error,
        'AppStateManager: Error processing app state change',
      );
    }
  };

  /**
   * Cleans up the app state event listener.
   * Removes the event subscription and resets the subscription reference.
   */
  public cleanup() {
    this.appStateSubscription?.remove();
    this.appStateSubscription = undefined;
  }
}

/**
 * Global instance of the AppStateEventListener for managing app state changes
 * and analytics tracking throughout the application.
 */
export const AppStateEventProcessor = new AppStateEventListener();
