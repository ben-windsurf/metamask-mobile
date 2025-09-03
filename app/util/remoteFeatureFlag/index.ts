import compareVersions from 'compare-versions';
import { getVersion } from 'react-native-device-info';

/**
 * Checks if the current app version meets the minimum required version
 * @param {string} minRequiredVersion - The minimum version required in semver format
 * @returns {boolean} True if current version is greater than or equal to minimum required version, false otherwise
 */
export const hasMinimumRequiredVersion = (minRequiredVersion: string) => {
  if (!minRequiredVersion) return false;
  const currentVersion = getVersion();
  return compareVersions.compare(currentVersion, minRequiredVersion, '>=');
};
