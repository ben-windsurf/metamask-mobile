/**
 * Utility functions for tracking tooltip-related metrics in the staking feature
 * Provides standardized event creation and property generation for tooltip analytics
 */
import { MetricsEventBuilder } from '../../../../../core/Analytics/MetricsEventBuilder';
import { MetaMetricsEvents } from '../../../../hooks/useMetrics';
import { EVENT_PROVIDERS } from '../../constants/events';

/**
 * Generates standardized properties for tooltip metrics events
 * @param {string} location - The location where the tooltip was opened
 * @param {string} tooltipName - The name/identifier of the tooltip
 * @returns {Object} Object containing metric properties for tooltip events
 */
export const getTooltipMetricProperties = (
  location: string,
  tooltipName: string,
) => ({
  selected_provider: EVENT_PROVIDERS.CONSENSYS,
  text: 'Tooltip Opened',
  location,
  tooltip_name: tooltipName,
});

/**
 * Creates a metrics event for tooltip opened interactions
 * @param {string} location - The location where the tooltip was opened
 * @param {string} tooltipName - The name/identifier of the tooltip
 * @returns {Object} Built metrics event object ready for tracking
 */
export const createTooltipOpenedEvent = (
  location: string,
  tooltipName: string,
) => {
  const createEventBuilder = MetricsEventBuilder.createEventBuilder;

  return createEventBuilder(MetaMetricsEvents.TOOLTIP_OPENED)
    .addProperties(getTooltipMetricProperties(location, tooltipName))
    .build();
};
