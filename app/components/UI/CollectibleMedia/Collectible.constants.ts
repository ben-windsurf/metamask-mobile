import Device from '../../../util/device';

/**
 * Width margin for collectible media display based on device size
 * Uses 32px margin for medium devices, 0px for other devices
 */
export const MEDIA_WIDTH_MARGIN = Device.isMediumDevice() ? 32 : 0;
