import {
  TraceContext,
  TraceName,
  TraceOperation,
  trace,
} from '../../util/trace';

let UIStartupSpan: TraceContext;

/**
 * Gets or creates a UI startup trace span for performance monitoring.
 * Creates a new trace span on first call and returns the cached span on subsequent calls.
 *
 * @param startTime - Optional start time for the trace span in milliseconds
 * @returns The UI startup trace context for performance tracking
 */
const getUIStartupSpan = (startTime?: number) => {
  if (!UIStartupSpan) {
    UIStartupSpan = trace({
      name: TraceName.UIStartup,
      startTime,
      op: TraceOperation.UIStartup,
    });
  }

  return UIStartupSpan;
};

export default getUIStartupSpan;
