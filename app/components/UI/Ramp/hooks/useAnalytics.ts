import { useCallback } from 'react';
import { AnalyticsEvents as AggregatorEvents } from '../Aggregator/types';
import { AnalyticsEvents as DepositEvents } from '../Deposit/types';

import { MetaMetrics, MetaMetricsEvents } from '../../../../core/Analytics';
import { MetricsEventBuilder } from '../../../../core/Analytics/MetricsEventBuilder';

interface MergedRampEvents extends AggregatorEvents, DepositEvents {}

/**
 * Tracks a ramp-related analytics event with the specified parameters
 * @param eventType - The type of event to track from merged ramp events
 * @param params - Event parameters specific to the event type
 */
export function trackEvent<T extends keyof MergedRampEvents>(
  eventType: T,
  params: MergedRampEvents[T],
) {
  const metrics = MetaMetrics.getInstance();
  metrics.trackEvent(
    MetricsEventBuilder.createEventBuilder(MetaMetricsEvents[eventType])
      .addProperties({ ...params })
      .build(),
  );
}

/**
 * Custom hook for tracking ramp analytics events
 * @returns A memoized callback function for tracking events
 */
function useAnalytics() {
  return useCallback(
    <T extends keyof MergedRampEvents>(
      eventType: T,
      params: MergedRampEvents[T],
    ) => {
      trackEvent(eventType, params);
    },
    [],
  );
}

export default useAnalytics;
