import { Dimensions, PixelRatio } from 'react-native';

/** iPhone 6 screen width in points (baseModel 0) */
const IPHONE_6_WIDTH = 375;
/** iPhone 6 screen height in points (baseModel 0) */
const IPHONE_6_HEIGHT = 667;

/** iPhone 11 Pro screen width in points (baseModel 1) */
const IPHONE_11_PRO_WIDTH = 375;
/** iPhone 11 Pro screen height in points (baseModel 1) */
const IPHONE_11_PRO_HEIGHT = 812;

/** iPhone 11 Pro Max screen width in points (baseModel 2) */
const IPHONE_11_PRO_MAX_WIDTH = 414;
/** iPhone 11 Pro Max screen height in points (baseModel 2) */
const IPHONE_11_PRO_MAX_HEIGHT = 896;

/**
 * Get the base screen dimensions for a specific iPhone model
 * @param {number} baseModel - The base model identifier (0: iPhone 6, 1: iPhone 11 Pro, 2: iPhone 11 Pro Max)
 * @returns {Object} Object containing width and height dimensions
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
 * Get current and base screen sizes for scaling calculations
 * @param {boolean} scaleVertical - Whether to use vertical (height) or horizontal (width) dimensions
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

const scaleVertical = (size, options) =>
  scale(size, { scaleVertical: true, ...options });

export default { scale, scaleVertical, IPHONE_6_WIDTH, IPHONE_6_HEIGHT };
