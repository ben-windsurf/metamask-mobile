'use strict';

import { Dimensions, Platform } from 'react-native';
import { hasNotch, getApiLevel } from 'react-native-device-info';

/**
 * Device utility class providing static methods for device detection and dimension queries.
 * This class helps determine device characteristics like screen size, platform, and device type.
 */
export default class Device {
  /**
   * Gets the current device window width in points.
   *
   * @returns The device window width
   */
  static getDeviceWidth(): number {
    return Dimensions.get('window').width;
  }

  /**
   * Gets the current device window height in points.
   *
   * @returns The device window height
   */
  static getDeviceHeight(): number {
    return Dimensions.get('window').height;
  }

  /**
   * Checks if the current platform is iOS.
   *
   * @returns True if running on iOS, false otherwise
   */
  static isIos(): boolean {
    return Platform.OS === 'ios';
  }

  /**
   * Checks if the current platform is Android.
   *
   * @returns True if running on Android, false otherwise
   */
  static isAndroid(): boolean {
    return Platform.OS === 'android';
  }

  /**
   * Checks if the device is an iPad based on screen dimensions.
   * Considers a device an iPad if either dimension is >= 1000 points.
   *
   * @returns True if the device appears to be an iPad, false otherwise
   */
  static isIpad(): boolean {
    return this.getDeviceWidth() >= 1000 || this.getDeviceHeight() >= 1000;
  }

  /**
   * Checks if the device is currently in landscape orientation.
   *
   * @returns True if width is greater than height, false otherwise
   */
  static isLandscape(): boolean {
    return this.getDeviceWidth() > this.getDeviceHeight();
  }

  /**
   * Checks if the device has iPhone 5 screen width (320 points).
   *
   * @returns True if device width matches iPhone 5, false otherwise
   */
  static isIphone5(): boolean {
    return this.getDeviceWidth() === 320;
  }

  /**
   * Checks if the device has iPhone 5S screen width (320 points).
   *
   * @returns True if device width matches iPhone 5S, false otherwise
   */
  static isIphone5S(): boolean {
    return this.getDeviceWidth() === 320;
  }

  /**
   * Checks if the device has iPhone 6 screen width (375 points).
   *
   * @returns True if device width matches iPhone 6, false otherwise
   */
  static isIphone6(): boolean {
    return this.getDeviceWidth() === 375;
  }

  /**
   * Checks if the device has iPhone 6 Plus screen width (414 points).
   *
   * @returns True if device width matches iPhone 6 Plus, false otherwise
   */
  static isIphone6Plus(): boolean {
    return this.getDeviceWidth() === 414;
  }

  /**
   * Checks if the device has iPhone 6S Plus screen width (414 points).
   *
   * @returns True if device width matches iPhone 6S Plus, false otherwise
   */
  static isIphone6SPlus(): boolean {
    return this.getDeviceWidth() === 414;
  }

  /**
   * Checks if the device has iPhone X or newer dimensions (375x812 or larger).
   *
   * @returns True if device dimensions match iPhone X or newer, false otherwise
   */
  static isIphoneX(): boolean {
    return this.getDeviceWidth() >= 375 && this.getDeviceHeight() >= 812;
  }

  /**
   * Checks if the device is an iPad 9.7" in portrait orientation.
   *
   * @returns True if dimensions match iPad 9.7" portrait, false otherwise
   */
  static isIpadPortrait9_7(): boolean {
    return this.getDeviceHeight() === 1024 && this.getDeviceWidth() === 736;
  }

  /**
   * Checks if the device is an iPad 9.7" in landscape orientation.
   *
   * @returns True if dimensions match iPad 9.7" landscape, false otherwise
   */
  static isIpadLandscape9_7(): boolean {
    return this.getDeviceHeight() === 736 && this.getDeviceWidth() === 1024;
  }

  /**
   * Checks if the device is an iPad 10.5" in portrait orientation.
   *
   * @returns True if dimensions match iPad 10.5" portrait, false otherwise
   */
  static isIpadPortrait10_5(): boolean {
    return this.getDeviceHeight() === 1112 && this.getDeviceWidth() === 834;
  }

  /**
   * Checks if the device is an iPad 10.5" in landscape orientation.
   *
   * @returns True if dimensions match iPad 10.5" landscape, false otherwise
   */
  static isIpadLandscape10_5(): boolean {
    return this.getDeviceWidth() === 1112 && this.getDeviceHeight() === 834;
  }

  /**
   * Checks if the device is an iPad 12.9" in portrait orientation.
   *
   * @returns True if dimensions match iPad 12.9" portrait, false otherwise
   */
  static isIpadPortrait12_9(): boolean {
    return this.getDeviceWidth() === 1024 && this.getDeviceHeight() === 1366;
  }

  /**
   * Checks if the device is an iPad 12.9" in landscape orientation.
   *
   * @returns True if dimensions match iPad 12.9" landscape, false otherwise
   */
  static isIpadLandscape12_9(): boolean {
    return this.getDeviceWidth() === 1366 && this.getDeviceHeight() === 1024;
  }

  /**
   * Checks if the device has a small screen (height < 600 points).
   *
   * @returns True if device height is less than 600, false otherwise
   */
  static isSmallDevice(): boolean {
    return this.getDeviceHeight() < 600;
  }

  /**
   * Checks if the device has a medium screen (height < 736 points).
   *
   * @returns True if device height is less than 736, false otherwise
   */
  static isMediumDevice(): boolean {
    return this.getDeviceHeight() < 736;
  }

  /**
   * Checks if the device has a large screen (height > 736 points).
   *
   * @returns True if device height is greater than 736, false otherwise
   */
  static isLargeDevice(): boolean {
    return this.getDeviceHeight() > 736;
  }

  /**
   * Checks if the device has a notch (e.g., iPhone X and newer).
   *
   * @returns True if the device has a notch, false otherwise
   */
  static hasNotch(): boolean {
    return hasNotch();
  }

  /**
   * Gets the Android API level of the device.
   * This is only meaningful on Android devices.
   *
   * @returns A promise that resolves to the Android API level
   */
  static async getDeviceAPILevel(): Promise<number> {
    const apiLevel = await getApiLevel();
    return apiLevel;
  }
}
