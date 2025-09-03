import {
  NotificationServicesControllerMessenger,
  NotificationServicesControllerState,
  Controller as NotificationServicesController,
  defaultState,
} from '@metamask/notification-services-controller/notification-services';
import { ControllerInitFunction } from '../../types';
import Logger from '../../../../util/Logger';
import { createNotificationServicesController } from './create-notification-services-controller';

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
 * Initializes the NotificationServicesController for managing push notifications and notification services
 * Creates and configures the controller with proper state management and messenger integration
 * @param {Object} request - Controller initialization request object
 * @param {Object} request.controllerMessenger - Messenger for inter-controller communication
 * @param {Object} request.persistedState - Previously persisted controller states
 * @returns {Object} Object containing the initialized NotificationServicesController instance
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
