import { Platform } from 'react-native';
import { getBuildNumber, getVersion, getBrand } from 'react-native-device-info';
import { DeviceMetaData } from './DeviceAnalyticsMetaData.types';

/**
 * Generates device analytics metadata for tracking and analytics purposes.
 * Collects platform information, build details, and device characteristics.
 *
 * @returns Device metadata object containing platform, version, and device information
 */
const generateDeviceAnalyticsMetaData = (): DeviceMetaData => ({
  platform: Platform.OS,
  currentBuildNumber: getBuildNumber(),
  applicationVersion: getVersion(),
  operatingSystemVersion: Platform.Version.toString(),
  deviceBrand: getBrand(),
});

export default generateDeviceAnalyticsMetaData;
