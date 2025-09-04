import {
  RemoteFeatureFlagControllerMessenger,
  RemoteFeatureFlagControllerState,
} from '@metamask/remote-feature-flag-controller';

/**
 * Configuration parameters for initializing the RemoteFeatureFlagController.
 * @interface RemoteFeatureFlagInitParamTypes
 * @property state - Optional initial state for the controller
 * @property messenger - Controller messenger for inter-controller communication
 * @property disabled - Whether the remote feature flag functionality is disabled
 * @property getMetaMetricsId - Function to retrieve the MetaMetrics ID for analytics
 * @property fetchInterval - Optional interval in milliseconds for fetching feature flags
 */
export interface RemoteFeatureFlagInitParamTypes {
  state?: RemoteFeatureFlagControllerState;
  messenger: RemoteFeatureFlagControllerMessenger;
  disabled: boolean;
  getMetaMetricsId: () => string;
  fetchInterval?: number;
}
