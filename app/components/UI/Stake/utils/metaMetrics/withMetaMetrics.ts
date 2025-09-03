import {
  IMetaMetricsEvent,
  JsonMap,
} from '../../../../../core/Analytics/MetaMetrics.types';
import { MetricsEventBuilder } from '../../../../../core/Analytics/MetricsEventBuilder';
import { MetaMetrics } from '../../../../../core/Analytics';

export interface WithMetaMetricsEvent {
  event: IMetaMetricsEvent;
  properties?: JsonMap;
}

const createEventBuilder = MetricsEventBuilder.createEventBuilder;

/**
 * Type guard to check if properties object has any keys
 * @param {JsonMap} properties - Optional properties object to check
 * @returns {boolean} True if properties exists and has keys, false otherwise
 */
const shouldAddProperties = (properties?: JsonMap): properties is JsonMap => {
  if (!properties) return false;
  return Object.keys(properties).length > 0;
};

/**
 * Builds a MetaMetrics event from a WithMetaMetricsEvent object
 * @param {WithMetaMetricsEvent} e - Event configuration with event type and optional properties
 * @returns {Object} Built MetaMetrics event ready for tracking
 */
const buildEvent = (e: WithMetaMetricsEvent) => {
  const eventBuilder = createEventBuilder(e.event);

  if (shouldAddProperties(e?.properties)) {
    eventBuilder.addProperties(e.properties);
  }

  return eventBuilder.build();
};

/**
 * Higher-order function that wraps a function with MetaMetrics event tracking
 * Automatically tracks specified events when the wrapped function is called
 * @param {Function} func - The function to wrap with MetaMetrics tracking
 * @param {WithMetaMetricsEvent | WithMetaMetricsEvent[]} events - Event(s) to track when function is called
 * @returns {Function} Wrapped function that tracks MetaMetrics events on execution
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const withMetaMetrics = <T extends (...args: any[]) => any>(
  func: T,
  events: WithMetaMetricsEvent | WithMetaMetricsEvent[],
) => {
  if (!Array.isArray(events)) {
    events = [events];
  }

  const builtEvents = events.map((event) => buildEvent(event));

  return (...args: Parameters<T>): ReturnType<T> | Promise<ReturnType<T>> => {
    const result = func(...args);

    if (result instanceof Promise) {
      return result.then((res) => {
        builtEvents.forEach((event) =>
          MetaMetrics.getInstance().trackEvent(event),
        );
        return res;
      }) as Promise<ReturnType<T>>;
    }

    builtEvents.forEach((event) => MetaMetrics.getInstance().trackEvent(event));

    return result as ReturnType<T>;
  };
};
