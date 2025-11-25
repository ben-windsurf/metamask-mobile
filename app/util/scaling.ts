import { Dimensions, PixelRatio } from 'react-native';

/** iPhone 6 screen width in points */
const IPHONE_6_WIDTH = 375;
/** iPhone 6 screen height in points */
const IPHONE_6_HEIGHT = 667;

/** iPhone 11 Pro screen width in points */
const IPHONE_11_PRO_WIDTH = 375;
/** iPhone 11 Pro screen height in points */
const IPHONE_11_PRO_HEIGHT = 812;

/** iPhone 11 Pro Max screen width in points */
const IPHONE_11_PRO_MAX_WIDTH = 414;
/** iPhone 11 Pro Max screen height in points */
const IPHONE_11_PRO_MAX_HEIGHT = 896;

/**
 * Base model identifiers for scaling calculations
 */
type BaseModel = 0 | 1 | 2;

/**
 * Dimensions object containing width and height
 */
interface BaseDimensions {
  width: number;
  height: number;
}

/**
 * Options for the scale function
 */
interface ScaleOptions {
  /** Factor to apply to the scaling calculation (default: 1) */
  factor?: number;
  /** Whether to scale based on vertical dimension (default: false) */
  scaleVertical?: boolean;
  /** Whether to allow scaling up beyond the original size (default: false) */
  scaleUp?: boolean;
  /** Custom base size to use instead of current screen size */
  baseSize?: number;
  /** Base model to use for scaling reference (0: iPhone 6, 1: iPhone 11 Pro, 2: iPhone 11 Pro Max) */
  baseModel?: BaseModel;
}

/**
 * Internal sizes object returned by _getSizes
 */
interface SizesResult {
  currSize: number;
  baseScreenSize: number;
}

/**
 * Gets the base dimensions for a given model identifier.
 *
 * @param baseModel - The base model identifier (0, 1, or 2)
 * @returns The width and height dimensions for the specified base model
 */
const getBaseModel = (baseModel?: BaseModel): BaseDimensions => {
  if (baseModel === 1) {
    return { width: IPHONE_11_PRO_WIDTH, height: IPHONE_11_PRO_HEIGHT };
  } else if (baseModel === 2) {
    return { width: IPHONE_11_PRO_MAX_WIDTH, height: IPHONE_11_PRO_MAX_HEIGHT };
  }

  return { width: IPHONE_6_WIDTH, height: IPHONE_6_HEIGHT };
};

/**
 * Gets the current and base screen sizes for scaling calculations.
 *
 * @param scaleVertical - Whether to use vertical dimension for scaling
 * @param baseModel - The base model to use for reference dimensions
 * @returns Object containing current size and base screen size
 */
const _getSizes = (
  scaleVertical?: boolean,
  baseModel?: BaseModel,
): SizesResult => {
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
 * Scales a size value based on the current device dimensions relative to a base model.
 * This function helps maintain consistent UI proportions across different device sizes.
 *
 * @param size - The size value to scale
 * @param options - Optional configuration for scaling behavior
 * @returns The scaled size value, rounded to the nearest pixel
 */
const scale = (size: number, options: ScaleOptions = {}): number => {
  const {
    factor = 1,
    scaleVertical = false,
    scaleUp = false,
    baseSize = undefined,
    baseModel,
  } = options;

  const { currSize, baseScreenSize } = _getSizes(scaleVertical, baseModel);
  const sizeScaled = ((baseSize ?? currSize) / baseScreenSize) * size;

  if (sizeScaled <= size || scaleUp) {
    return PixelRatio.roundToNearestPixel(size + (sizeScaled - size) * factor);
  }

  return size;
};

/**
 * Scales a size value based on the vertical dimension of the device.
 * This is a convenience wrapper around the scale function with scaleVertical set to true.
 *
 * @param size - The size value to scale
 * @param options - Optional configuration for scaling behavior (scaleVertical is automatically set to true)
 * @returns The scaled size value, rounded to the nearest pixel
 */
const scaleVertical = (
  size: number,
  options?: Omit<ScaleOptions, 'scaleVertical'>,
): number => scale(size, { scaleVertical: true, ...options });

export default { scale, scaleVertical, IPHONE_6_WIDTH, IPHONE_6_HEIGHT };
