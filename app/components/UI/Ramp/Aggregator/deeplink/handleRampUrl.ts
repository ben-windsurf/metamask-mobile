import { NavigationProp, ParamListBase } from '@react-navigation/native';
import handleRedirection from './handleRedirection';
import getRedirectPathsAndParams from './utils/getRedirectPathAndParams';
import { RampType } from '../types';
import parseRampIntent from '../utils/parseRampIntent';
import {
  createBuyNavigationDetails,
  createSellNavigationDetails,
} from '../routes/utils';
import Logger from '../../../../../util/Logger';

interface RampUrlOptions {
  rampPath: string;
  rampType: RampType;
  navigation: NavigationProp<ParamListBase>;
}

/**
 * Handles ramp URL navigation by parsing the path and redirecting to appropriate screens
 * Processes buy/sell ramp URLs and navigates to the correct flow based on the ramp type
 * @param {RampUrlOptions} options - The ramp URL handling options
 * @param {string} options.rampPath - The ramp URL path to process
 * @param {RampType} options.rampType - The type of ramp operation (buy or sell)
 * @param {NavigationProp<ParamListBase>} options.navigation - React Navigation object for screen navigation
 */
export default function handleRampUrl({
  rampPath,
  rampType,
  navigation,
}: RampUrlOptions) {
  try {
    const [redirectPaths, pathParams] = getRedirectPathsAndParams(rampPath);

    if (redirectPaths.length > 0) {
      return handleRedirection(redirectPaths, pathParams, rampType, navigation);
    }

    let rampIntent;
    if (pathParams) {
      rampIntent = parseRampIntent(pathParams);
    }

    switch (rampType) {
      case RampType.BUY:
        navigation.navigate(...createBuyNavigationDetails(rampIntent));
        break;
      case RampType.SELL:
        navigation.navigate(...createSellNavigationDetails(rampIntent));
        break;
    }
  } catch (error) {
    Logger.error(
      error as Error,
      `Error in handleRampUrl. rampPath: ${rampPath}`,
    );
  }
}
