import extractURLParams from './DeeplinkManager/ParseManager/extractURLParams';
import { RootState } from '../reducers';
import { Store } from 'redux';
import Logger from '../util/Logger';
import DevLogger from './SDKConnect/utils/DevLogger';

/**
 * Parameters for processing attribution data from deeplinks
 * @interface ProcessAttributionParams
 * @property currentDeeplink - The current deeplink URL to extract attribution from, or null if none
 * @property store - Redux store instance containing application state
 */
interface ProcessAttributionParams {
  currentDeeplink: string | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  store: Store<RootState, any>;
}

/**
 * Result object containing extracted attribution and UTM parameters
 * @interface AttributionResult
 * @property attributionId - Unique identifier for attribution tracking
 * @property utm - Raw UTM parameter string from the deeplink
 * @property utm_source - UTM source parameter identifying the traffic source
 * @property utm_medium - UTM medium parameter identifying the marketing medium
 * @property utm_campaign - UTM campaign parameter identifying the specific campaign
 * @property utm_term - UTM term parameter identifying paid search keywords
 * @property utm_content - UTM content parameter identifying specific ad content
 */
interface AttributionResult {
  attributionId?: string;
  utm?: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

/**
 * Processes attribution data from deeplinks to extract marketing and tracking parameters.
 * Only processes attribution when data collection for marketing is enabled in security settings.
 *
 * @param params - Object containing deeplink and store parameters
 * @param params.currentDeeplink - The current deeplink URL to extract attribution from
 * @param params.store - Redux store instance to access security settings
 * @returns Attribution result object with extracted parameters, or undefined if processing is disabled or no deeplink provided
 *
 * @example
 * ```typescript
 * const result = processAttribution({
 *   currentDeeplink: 'metamask://example?attributionId=123&utm={"source":"google","medium":"cpc"}',
 *   store: reduxStore
 * });
 * // Returns: { attributionId: '123', utm_source: 'google', utm_medium: 'cpc', ... }
 * ```
 */
export function processAttribution({
  currentDeeplink,
  store,
}: ProcessAttributionParams): AttributionResult | undefined {
  const { security } = store.getState();
  if (!security.dataCollectionForMarketing) {
    return undefined;
  }

  if (currentDeeplink) {
    const { params } = extractURLParams(currentDeeplink);
    const attributionId = params.attributionId || undefined;
    const utm = params.utm || undefined;
    let utm_source, utm_medium, utm_campaign, utm_term, utm_content;

    if (utm) {
      try {
        const utmParams = JSON.parse(utm);
        DevLogger.log('processAttribution:: UTM params', utmParams);
        utm_source = utmParams.source;
        utm_medium = utmParams.medium;
        utm_campaign = utmParams.campaign;
        utm_term = utmParams.term;
        utm_content = utmParams.content;
      } catch (error) {
        Logger.error(new Error('Error parsing UTM params'), error);
      }
    }

    return {
      attributionId,
      utm,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_term,
      utm_content,
    };
  }

  return undefined;
}
