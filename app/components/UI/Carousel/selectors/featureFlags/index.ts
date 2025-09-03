import { createSelector } from 'reselect';
import { selectRemoteFeatureFlags } from '../../../../../selectors/featureFlagController';

/**
 * Selector to determine if the Contentful carousel feature is enabled
 * @returns {boolean} True if the contentful carousel feature flag is enabled, false otherwise
 */
export const selectContentfulCarouselEnabledFlag = createSelector(
  selectRemoteFeatureFlags,
  (remoteFlags): boolean => Boolean(remoteFlags?.contentfulCarouselEnabled),
);
