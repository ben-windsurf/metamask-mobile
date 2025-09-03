/**
 * Utility functions for responsive scaling based on device dimensions
 * Provides consistent scaling across different iPhone models and screen sizes
 */
import { Dimensions, PixelRatio } from 'react-native';

const IPHONE_6_WIDTH = 375;
const IPHONE_6_HEIGHT = 667;

const IPHONE_11_PRO_WIDTH = 375;
const IPHONE_11_PRO_HEIGHT = 812;

const IPHONE_11_PRO_MAX_WIDTH = 414;
const IPHONE_11_PRO_MAX_HEIGHT = 896;

/**
 * Gets the base dimensions for a specific iPhone model
 * @param {number} baseModel - The base model identifier (0: iPhone 6, 1: iPhone 11 Pro, 2: iPhone 11 Pro Max)
 * @returns {Object} Object containing width and height dimensions for the specified model
 */
const getBaseModel = (baseModel) => {
  if (baseModel === 1) {
    return { width: IPHONE_11_PRO_WIDTH, height: IPHONE_11_PRO_HEIGHT };
  } else if (baseModel === 2) {
    return { width: IPHONE_11_PRO_MAX_WIDTH, height: IPHONE_11_PRO_MAX_HEIGHT };
  }

  return { width: IPHONE_6_WIDTH, height: IPHONE_6_HEIGHT };
};

/**
 * Internal helper function to get current and base screen sizes for scaling calculations
 * @param {boolean} scaleVertical - Whether to use vertical dimensions for scaling
 * @param {number} baseModel - The base model identifier for reference dimensions
 * @returns {Object} Object containing currSize and baseScreenSize for scaling calculations
 */
const _getSizes = (scaleVertical, baseModel) => {
  const { width, height } = Dimensions.get('window');
  const CURR_WIDTH = width < height ? width : height;
  const CURR_HEIGHT = height > width ? height : width;

  let currSize = CURR_WIDTH;
  let baseScreenSize = getBaseModel(baseModel).width;

  if (scaleVertical) {
    currSize = CURR_HEIGHT;
    baseScreenSize = getBaseModel(baseModel).height;
  }

  return { currSize, baseScreenSize };
};

/**
 * Scales a size value based on device dimensions and scaling options
 * @param {number} size - The base size to scale
 * @param {Object} options - Scaling configuration options
 * @param {number} options.factor - Scaling factor applied to the difference (default: 1)
 * @param {boolean} options.scaleVertical - Whether to scale based on vertical dimensions (default: false)
 * @param {boolean} options.scaleUp - Whether to allow scaling up beyond original size (default: false)
 * @param {number} options.baseSize - Custom base size for scaling calculations (default: current screen size)
 * @param {number} options.baseModel - Base device model for scaling reference
 * @returns {number} The scaled size value, rounded to nearest pixel
 */
const scale = (
  size,
  {
    factor = 1,
    scaleVertical = false,
    scaleUp = false,
    baseSize = undefined,
    baseModel,
  } = {},
) => {
  const { currSize, baseScreenSize } = _getSizes(scaleVertical, baseModel);
  const sizeScaled = ((baseSize || currSize) / baseScreenSize) * size;

  if (sizeScaled <= size || scaleUp) {
    return PixelRatio.roundToNearestPixel(size + (sizeScaled - size) * factor);
  }

  return size;
};

/**
 * Convenience function for vertical scaling
 * @param {number} size - The base size to scale
 * @param {Object} options - Scaling configuration options (same as scale function)
 * @returns {number} The vertically scaled size value
 */
const scaleVertical = (size, options) =>
  scale(size, { scaleVertical: true, ...options });

export default { scale, scaleVertical, IPHONE_6_WIDTH, IPHONE_6_HEIGHT };
