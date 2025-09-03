import compareVersions from 'compare-versions';
import { getVersion } from 'react-native-device-info';

/**
 * Checks if the current app version meets the minimum required version for bridge functionality
 * @param {string | undefined} minRequiredVersion - The minimum version required for bridge features
 * @param {boolean} isBridgeEnabled - Whether bridge functionality is enabled
 * @returns {boolean} True if current version meets minimum requirement and bridge is enabled
 */
export const hasMinimumRequiredVersion = (
  minRequiredVersion: string | undefined,
  isBridgeEnabled: boolean,
) => {
  if (!minRequiredVersion) return false;
  const currentVersion = getVersion();
  return (
    compareVersions.compare(currentVersion, minRequiredVersion, '>=') &&
    isBridgeEnabled
  );
};
