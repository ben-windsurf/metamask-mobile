import compareVersions from 'compare-versions';
import { getVersion } from 'react-native-device-info';

/**
 * Checks if the current app version meets the minimum required version.
 *
 * @param minRequiredVersion - The minimum version required as a string (e.g., "1.2.3")
 * @returns True if the current version is greater than or equal to the minimum required version, false otherwise
 */
export const hasMinimumRequiredVersion = (minRequiredVersion: string) => {
  if (!minRequiredVersion) return false;
  const currentVersion = getVersion();
  return compareVersions.compare(currentVersion, minRequiredVersion, '>=');
};
