/**
 * Portion of expected errors to track for analytics
 * In development mode, tracks all errors (1.0), in production tracks 1% (0.01)
 */
export const EXPECTED_ERRORS_PORTION_TO_TRACK: number = __DEV__ ? 1 : 0.01;
