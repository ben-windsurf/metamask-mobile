import compareVersions from 'compare-versions';
import { getVersion } from 'react-native-device-info';

/**
 * Checks if the current app version meets the minimum required version for bridge functionality.
 *
 * @param minRequiredVersion - The minimum version required for bridge features, or undefined if no requirement
 * @param isBridgeEnabled - Whether bridge functionality is currently enabled
 * @returns True if the current version meets the minimum requirement and bridge is enabled, false otherwise
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
