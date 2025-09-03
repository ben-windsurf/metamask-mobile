import {
  SMALL_DATASET_GRAPH_INSET,
  SMALL_DATASET_SNAP_RATIO,
  SMALL_DATASET_THRESHOLD,
  STANDARD_DATASET_GRAPH_INSET,
} from './InteractiveTimespanChart.constants';

/**
 * Calculates the width of each segment in the chart based on total width and number of data points
 * @param {number} chartWidth - The total width of the chart
 * @param {number[]} dataPoints - Array of data points to determine segment count
 * @returns {number} The width of each chart segment, rounded to 6 decimal places
 */
export const getChartSegmentWidth = (
  chartWidth: number,
  dataPoints: number[],
) => parseFloat((chartWidth / dataPoints.length).toFixed(6));

/**
 * Calculates the center position of each chart segment for touch interaction
 * @param {number[] | string[]} dataPoints - Array of data points to map segment centers for
 * @param {number} segmentWidth - The width of each segment
 * @returns {number[]} Array of center positions for each segment
 */
export const calculateSegmentCenters = (
  dataPoints: number[] | string[],
  segmentWidth: number,
) =>
  dataPoints.map((_, index) => {
    /**
     * Ex. If each segment is 30px wide:
     * The start position of first segment (index: 0) = 0 * segmentWidth OR 0 * 30px = 0
     * The center position of the first segment (index: 0) = startPosition + segmentWidth / 2 OR 0 + 30 / 2 = 15
     */
    const startOfSegment = index * segmentWidth;
    const centerOfSegment = startOfSegment + segmentWidth / 2;
    return centerOfSegment;
  });

/**
 * Formats an ISO 8601 timestamp for chart display
 * Example ISO 8601 timestamp: '2024-11-30T00:00:00.000Z'
 * @param {string} iso8601Timestamp - ISO 8601 formatted timestamp string
 * @returns {string} Formatted date string for chart display
 */
export const formatChartDate = (iso8601Timestamp: string) =>
  new Date(iso8601Timestamp).toUTCString().split(' ').slice(0, 4).join(' ');

/**
 * Determines graph insets based on the number of data points
 * Uses smaller insets for datasets with 10 or fewer points for better visualization
 * @param {number} numDataPoints - The number of data points in the dataset
 * @returns {Object} Object containing insetTop and insetBottom values
 */
export const getGraphInsetsByDataPointLength = (numDataPoints: number) => {
  const graphInsets = {
    insetTop: STANDARD_DATASET_GRAPH_INSET,
    insetBottom: STANDARD_DATASET_GRAPH_INSET,
  };

  if (numDataPoints <= 10) {
    graphInsets.insetTop = SMALL_DATASET_GRAPH_INSET;
    graphInsets.insetBottom = SMALL_DATASET_GRAPH_INSET;
    return graphInsets;
  }

  return graphInsets;
};

/**
 * Calculates the snap threshold for touch interactions on the chart
 * Enables snapping only for small datasets to improve touch precision
 * @param {number} chartSegmentWidth - The width of each chart segment
 * @param {number} numDataPoints - The total number of data points
 * @returns {number} The snap threshold distance for touch interactions
 */
export const calculateSnapThreshold = (
  chartSegmentWidth: number,
  numDataPoints: number,
) =>
  chartSegmentWidth *
  // We only enable snapping for small datasets.
  (numDataPoints <= SMALL_DATASET_THRESHOLD ? SMALL_DATASET_SNAP_RATIO : 0);

/**
 * Finds the closest data point index based on touch position and snap threshold
 * Returns -1 when finger is lifted or when touch is outside snap threshold for small datasets
 * @param {number} x - The x-coordinate of the touch position (-1 when finger lifted)
 * @param {number[]} segmentCenters - Array of center positions for each segment
 * @param {number} snapThreshold - The snap threshold distance for touch interactions
 * @param {number} numDataPoints - The total number of data points
 * @returns {number} The index of the closest data point, or -1 if no point should be selected
 */
export const findClosestPointIndex = (
  x: number,
  segmentCenters: number[],
  snapThreshold: number,
  numDataPoints: number,
) => {
  // Deselect point when finger raised
  if (x === -1) {
    return -1;
  }

  // Find the closest segment center to the current touch position
  let closestIndex = 0;
  let minDistance = Infinity;

  segmentCenters.forEach((center, index) => {
    const distance = Math.abs(x - center);
    if (distance < minDistance) {
      closestIndex = index;
      minDistance = distance;
    }
  });

  /**
   * Ensure that small datasets respect snap threshold
   * Larger datasets can always update.
   */
  if (minDistance <= snapThreshold || numDataPoints > SMALL_DATASET_THRESHOLD) {
    return closestIndex;
  }

  return -1;
};
