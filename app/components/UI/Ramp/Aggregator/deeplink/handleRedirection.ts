import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { RampType } from '../types';
import Routes from '../../../../../constants/navigation/Routes';

const RAMP_ACTIVITY = 'activity';

/**
 * Handles redirection for ramp aggregator deeplinks by navigating to appropriate screens
 * Processes deeplink paths and navigates to the transactions view when activity is requested
 * @param {string[]} paths - Array of path segments from the deeplink URL
 * @param {Record<string, string> | undefined} _pathParams - URL path parameters (unused)
 * @param {RampType} _rampType - Type of ramp operation (unused)
 * @param {NavigationProp<ParamListBase>} navigation - React Navigation object for screen navigation
 */
export default function handleRedirection(
  paths: string[],
  _pathParams: Record<string, string> | undefined,
  _rampType: RampType,
  navigation: NavigationProp<ParamListBase>,
) {
  switch (paths[0]) {
    case RAMP_ACTIVITY: {
      navigation.navigate(Routes.TRANSACTIONS_VIEW, {
        screen: Routes.TRANSACTIONS_VIEW,
        params: {
          redirectToOrders: true,
        },
      });
      break;
    }

    default: {
      break;
    }
  }
}
