import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import {
  IMetaMetricsEvent,
  JsonMap,
} from '../../../../../core/Analytics/MetaMetrics.types';
import { useMetrics } from '../../../../hooks/useMetrics';
import {
  CONFIRMATION_EVENTS,
  TOOLTIP_TYPES,
} from '../../../../../core/Analytics/events/confirmations';
import {
  ConfirmationMetrics,
  updateConfirmationMetric,
} from '../../../../../core/redux/slices/confirmationMetrics';
import { useConfirmationLocation } from './useConfirmationLocation';
import { useTransactionMetadataRequest } from '../transactions/useTransactionMetadataRequest';
import { useSignatureRequest } from '../signatures/useSignatureRequest';

/**
 * Custom hook that provides metric event tracking functions for confirmation screens
 * Manages analytics events for user interactions during transaction and signature confirmations
 * @returns {Object} Object containing event tracking functions and metric setters
 */
export function useConfirmationMetricEvents() {
  const { createEventBuilder, trackEvent } = useMetrics();
  const location = useConfirmationLocation();
  const dispatch = useDispatch();
  const transactionMeta = useTransactionMetadataRequest();
  const signatureRequest = useSignatureRequest();

  const events = useMemo(() => {
    const trackAdvancedDetailsToggledEvent = ({ isExpanded }: JsonMap) => {
      const event = generateEvent({
        createEventBuilder,
        metametricsEvent: CONFIRMATION_EVENTS.ADVANCED_DETAILS_CLICKED,
        properties: {
          location,
          is_expanded: isExpanded,
        },
      });

      trackEvent(event);
    };

    const trackTooltipClickedEvent = ({
      tooltip,
    }: {
      tooltip: TOOLTIP_TYPES;
    }) => {
      const event = generateEvent({
        createEventBuilder,
        metametricsEvent: CONFIRMATION_EVENTS.TOOLTIP_CLICKED,
        properties: {
          location,
          tooltip,
        },
      });

      trackEvent(event);
    };

    const trackPageViewedEvent = () => {
      const event = generateEvent({
        createEventBuilder,
        metametricsEvent: CONFIRMATION_EVENTS.SCREEN_VIEWED,
        properties: {
          location,
        },
      });

      trackEvent(event);
    };

    const trackBlockaidAlertLinkClickedEvent = () => {
      const signatureType = signatureRequest?.type;
      const signatureFromAddress = signatureRequest?.messageParams?.from;
      const transactionType = transactionMeta?.type;
      const transactionFromAddress = transactionMeta?.txParams?.from;

      const type = transactionType ?? signatureType;
      const fromAddress = transactionFromAddress ?? signatureFromAddress;

      const event = generateEvent({
        createEventBuilder,
        metametricsEvent: CONFIRMATION_EVENTS.BLOCKAID_ALERT_LINK_CLICKED,
        properties: {
          external_link_clicked: 'security_alert_support_link',
          from_address: fromAddress,
          location,
          type,
        },
      });
      trackEvent(event);
    };

    const setConfirmationMetric = (metricParams: ConfirmationMetrics) => {
      if (!transactionMeta && !signatureRequest) {
        return;
      }
      dispatch(
        updateConfirmationMetric({
          id: (transactionMeta?.id || signatureRequest?.id) as string,
          params: metricParams,
        }),
      );
    };

    return {
      trackAdvancedDetailsToggledEvent,
      trackBlockaidAlertLinkClickedEvent,
      trackTooltipClickedEvent,
      trackPageViewedEvent,
      setConfirmationMetric,
    };
  }, [
    createEventBuilder,
    dispatch,
    location,
    trackEvent,
    transactionMeta,
    signatureRequest,
  ]);

  return { ...events };
}

/**
 * Generates a MetaMetrics event with the specified properties and sensitive data
 * @param {Object} params - Event generation parameters
 * @param {Function} params.createEventBuilder - Event builder function from useMetrics hook
 * @param {IMetaMetricsEvent} params.metametricsEvent - The MetaMetrics event type to track
 * @param {JsonMap} [params.properties] - Optional event properties to include
 * @param {JsonMap} [params.sensitiveProperties] - Optional sensitive properties to include
 * @returns {Object} Built MetaMetrics event ready for tracking
 */
function generateEvent({
  createEventBuilder,
  metametricsEvent,
  properties,
  sensitiveProperties,
}: {
  createEventBuilder: ReturnType<typeof useMetrics>['createEventBuilder'];
  metametricsEvent: IMetaMetricsEvent;
  properties?: JsonMap;
  sensitiveProperties?: JsonMap;
}) {
  return createEventBuilder(metametricsEvent)
    .addProperties(properties ?? {})
    .addSensitiveProperties(sensitiveProperties ?? {})
    .build();
}
