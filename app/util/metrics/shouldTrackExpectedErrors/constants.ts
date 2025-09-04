/**
 * Portion of expected errors to track for metrics collection.
 * In development mode, all errors are tracked (1.0), while in production
 * only 1% of errors are tracked to reduce noise and performance impact.
 */
export const EXPECTED_ERRORS_PORTION_TO_TRACK: number = __DEV__ ? 1 : 0.01;
