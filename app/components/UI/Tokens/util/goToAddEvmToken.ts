import { StackNavigationProp } from '@react-navigation/stack';
import {
  IMetaMetricsEvent,
  ITrackingEvent,
} from '../../../../core/Analytics/MetaMetrics.types';
import { MetricsEventBuilder } from '../../../../core/Analytics/MetricsEventBuilder';
import { MetaMetricsEvents } from '../../../hooks/useMetrics';

interface TokenListNavigationParamList {
  AddAsset: { assetType: string };
  [key: string]: undefined | object;
}

interface GoToAddEvmTokenProps {
  navigation: StackNavigationProp<TokenListNavigationParamList, 'AddAsset'>;
  trackEvent: (event: ITrackingEvent, saveDataRecording?: boolean) => void;
  createEventBuilder: (event: IMetaMetricsEvent) => MetricsEventBuilder;
  getDecimalChainId: (chainId: string) => number;
  currentChainId: string;
}

/**
 * Navigates to the Add Asset screen for adding EVM tokens and tracks the action
 * @param {GoToAddEvmTokenProps} params - Navigation and tracking parameters
 * @param {StackNavigationProp} params.navigation - Navigation prop for screen transitions
 * @param {Function} params.trackEvent - Function to track analytics events
 * @param {Function} params.createEventBuilder - Function to create metrics event builders
 * @param {Function} params.getDecimalChainId - Function to convert chain ID to decimal format
 * @param {string} params.currentChainId - Current blockchain chain ID
 */
export const goToAddEvmToken = ({
  navigation,
  trackEvent,
  createEventBuilder,
  getDecimalChainId,
  currentChainId,
}: GoToAddEvmTokenProps) => {
  navigation.push('AddAsset', { assetType: 'token' });

  trackEvent(
    createEventBuilder(MetaMetricsEvents.TOKEN_IMPORT_CLICKED)
      .addProperties({
        source: 'manual',
        chain_id: getDecimalChainId(currentChainId),
      })
      .build(),
  );
};
