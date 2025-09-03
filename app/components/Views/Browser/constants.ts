import { Dimensions } from 'react-native';
import Device from '../../../util/device';

const margin = 16;

/**
 * Width of browser tab thumbnails calculated based on screen width and margins
 * Used for displaying browser tab previews in the MetaMask Mobile browser interface
 */
export const THUMB_WIDTH = Dimensions.get('window').width / 2 - margin * 2;

/**
 * Height of browser tab thumbnails with platform-specific aspect ratios
 * iOS uses 1.81 ratio while Android uses 1.48 ratio for optimal display
 */
export const THUMB_HEIGHT = Device.isIos()
  ? THUMB_WIDTH * 1.81
  : THUMB_WIDTH * 1.48;

/**
 * Maximum idle time before browser tab becomes inactive (2.5 minutes)
 * Used to manage browser tab lifecycle and memory optimization
 */
export const IDLE_TIME_MAX = 1000 * 60 * 2.5; // 2.5 minutes

/**
 * Interval for calculating browser tab idle time (30 seconds)
 * Used to periodically check and update tab activity status
 */
export const IDLE_TIME_CALC_INTERVAL = 1000 * 30; // 30 seconds
