import {
  NotificationServicesControllerMessenger,
  NotificationServicesControllerState,
  Controller as NotificationServicesController,
  defaultState,
} from '@metamask/notification-services-controller/notification-services';
import { ControllerInitFunction } from '../../types';
import Logger from '../../../../util/Logger';
import { createNotificationServicesController } from './create-notification-services-controller';

/**
 * Logs the creation of the NotificationServicesController with appropriate state information.
 *
 * @param initialState - Optional partial initial state for the controller
 */
const logControllerCreation = (
  initialState?: Partial<NotificationServicesControllerState>,
) => {
  if (!initialState) {
    Logger.log('Creating NotificationServicesController with default state', {
      defaultState,
    });
  } else {
    Logger.log('Creating NotificationServicesController with initial state');
  }
};

/**
 * Initializes the NotificationServicesController with the provided configuration.
 * Creates and configures the controller instance with persisted state or default state.
 *
 * @param request - Controller initialization request containing messenger and persisted state
 * @returns Object containing the initialized NotificationServicesController instance
 */
export const notificationServicesControllerInit: ControllerInitFunction<
  NotificationServicesController,
  NotificationServicesControllerMessenger
> = (request) => {
  const { controllerMessenger, persistedState } = request;

  const initialState = persistedState.NotificationServicesController;
  logControllerCreation(initialState);

  const state = persistedState.NotificationServicesController ?? defaultState;

  const controller = createNotificationServicesController({
    messenger: controllerMessenger,
    initialState: state,
  });

  return { controller };
};
