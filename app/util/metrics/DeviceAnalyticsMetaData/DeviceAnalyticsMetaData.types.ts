/**
 * Base interface for analytics properties with string key-value pairs.
 */
interface AnalyticsProperties {
  [key: string]: string;
}

/**
 * Device metadata interface for analytics tracking.
 * Contains device and application information used for telemetry.
 */
export interface DeviceMetaData extends AnalyticsProperties {
  /** The platform the app is running on (e.g., 'ios', 'android') */
  platform: string;
  /** Current build number of the application */
  currentBuildNumber: string;
  /** Version of the application */
  applicationVersion: string;
  /** Version of the operating system */
  operatingSystemVersion: string;
  /** Brand/manufacturer of the device */
  deviceBrand: string;
}
