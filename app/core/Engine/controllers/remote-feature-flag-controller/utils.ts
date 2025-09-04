import {
  RemoteFeatureFlagController,
  ClientConfigApiService,
  ClientType,
  DistributionType,
  EnvironmentType,
} from '@metamask/remote-feature-flag-controller';

import Logger from '../../../../util/Logger';

import { RemoteFeatureFlagInitParamTypes } from './types';
import AppConstants from '../../../AppConstants';

/**
 * Determines the feature flag environment type based on the METAMASK_ENVIRONMENT variable.
 * Maps environment strings to appropriate EnvironmentType enum values.
 *
 * @returns The corresponding EnvironmentType for the current environment
 */
const getFeatureFlagAppEnvironment = () => {
  const env = process.env.METAMASK_ENVIRONMENT;
  switch (env) {
    case 'pre-release':
    case 'rc':
      return EnvironmentType.ReleaseCandidate;
    case 'production':
    case 'beta':
      return EnvironmentType.Production;
    case 'local':
    case 'exp':
    default:
      return EnvironmentType.Development;
  }
};

/**
 * Determines the feature flag distribution type based on build type and environment variables.
 * Maps build type strings to appropriate DistributionType enum values.
 *
 * @returns The corresponding DistributionType for the current build configuration
 */
const getFeatureFlagAppDistribution = () => {
  const dist = process.env.METAMASK_BUILD_TYPE;
  const env = process.env.METAMASK_ENVIRONMENT;
  switch (dist) {
    case 'main':
      return env === 'beta' ? DistributionType.Beta : DistributionType.Main;
    case 'flask':
      return DistributionType.Flask;
    case 'beta':
      return DistributionType.Beta;
    default:
      return DistributionType.Main;
  }
};

/**
 * Boolean flag indicating whether remote feature flag overrides are activated.
 * Determined by the OVERRIDE_REMOTE_FEATURE_FLAGS environment variable.
 */
export const isRemoteFeatureFlagOverrideActivated =
  process.env.OVERRIDE_REMOTE_FEATURE_FLAGS === 'true';

/**
 * Creates and initializes a RemoteFeatureFlagController instance with the provided configuration.
 * Sets up the client configuration service and handles initial feature flag fetching.
 *
 * @param state - Initial state for the controller
 * @param messenger - Controller messenger for communication
 * @param disabled - Whether the controller should be disabled
 * @param getMetaMetricsId - Function to retrieve MetaMetrics ID
 * @param fetchInterval - Interval for fetching feature flags (defaults to API constant)
 * @returns Configured RemoteFeatureFlagController instance
 */
export const createRemoteFeatureFlagController = ({
  state,
  messenger,
  disabled,
  getMetaMetricsId,
  fetchInterval = AppConstants.FEATURE_FLAGS_API.DEFAULT_FETCH_INTERVAL,
}: RemoteFeatureFlagInitParamTypes) => {
  const remoteFeatureFlagController = new RemoteFeatureFlagController({
    messenger,
    state,
    disabled,
    getMetaMetricsId,
    clientConfigApiService: new ClientConfigApiService({
      fetch,
      config: {
        client: ClientType.Mobile,
        environment: getFeatureFlagAppEnvironment(),
        distribution: getFeatureFlagAppDistribution(),
      },
    }),
    fetchInterval,
  });

  if (disabled) {
    Logger.log('Feature flag controller disabled');
  } else if (isRemoteFeatureFlagOverrideActivated) {
    Logger.log('Remote feature flags override activated');
  } else {
    remoteFeatureFlagController
      .updateRemoteFeatureFlags()
      .then(() => {
        Logger.log('Feature flags updated');
      })
      .catch((error) => Logger.log(error));
  }
  return remoteFeatureFlagController;
};
