import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Dispatch } from 'redux';
import DevLogger from '../SDKConnect/utils/DevLogger';
import DeeplinkManager from './DeeplinkManager';

let instance: DeeplinkManager;

/**
 * Shared singleton manager for handling deep links throughout the application.
 * Provides a centralized interface for initializing, parsing, and managing deep link navigation.
 */
const SharedDeeplinkManager = {
  /**
   * Gets the current DeeplinkManager instance.
   * @returns The singleton DeeplinkManager instance
   */
  getInstance: () => instance,

  /**
   * Initializes the DeeplinkManager singleton with navigation and dispatch dependencies.
   * @param params - Configuration object
   * @param params.navigation - React Navigation instance for handling navigation
   * @param params.dispatch - Redux dispatch function for state updates
   */
  init: ({
    navigation,
    dispatch,
  }: {
    navigation: NavigationProp<ParamListBase>;
    // TODO: Replace "any" with type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    dispatch: Dispatch<any>;
  }) => {
    if (instance) {
      return;
    }
    instance = new DeeplinkManager({
      navigation,
      dispatch,
    });
    DevLogger.log(`DeeplinkManager initialized`);
  },

  /**
   * Parses and handles a deep link URL.
   * @param url - The deep link URL to parse
   * @param args - Configuration object for parsing
   * @param args.browserCallBack - Optional callback function for browser navigation
   * @param args.origin - The origin of the deep link request
   * @param args.onHandled - Optional callback executed after the deep link is handled
   */
  parse: (
    url: string,
    args: {
      browserCallBack?: (url: string) => void;
      origin: string;
      onHandled?: () => void;
    },
  ) => instance.parse(url, args),

  /**
   * Sets a deep link URL to be processed later.
   * @param url - The deep link URL to store
   */
  setDeeplink: (url: string) => instance.setDeeplink(url),

  /**
   * Retrieves any pending deep link that hasn't been processed yet.
   * @returns The pending deep link URL or undefined if none exists
   */
  getPendingDeeplink: () => instance.getPendingDeeplink(),

  /**
   * Expires and clears any pending deep link.
   */
  expireDeeplink: () => instance.expireDeeplink(),
};

export default SharedDeeplinkManager;
