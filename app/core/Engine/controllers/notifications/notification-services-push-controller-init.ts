import {
  NotificationServicesPushControllerMessenger,
  NotificationServicesPushControllerState,
  Controller as NotificationServicesPushController,
  defaultState,
} from '@metamask/notification-services-controller/push-services';
import { ControllerInitFunction } from '../../types';
import Logger from '../../../../util/Logger';
import { createNotificationServicesPushController } from './create-notification-services-push-controller';

const logControllerCreation = (
  initialState?: Partial<NotificationServicesPushControllerState>,
) => {
  if (!initialState) {
    Logger.log(
      'Creating NotificationServicesPushController with default state',
      {
        defaultState,
      },
    );
  } else {
    Logger.log(
      'Creating NotificationServicesPushController with initial state',
    );
  }
};

/**
 * Initializes the NotificationServicesPushController for managing push notification services
 * in MetaMask Mobile. This controller handles push notification registration, delivery,
 * and management for various notification types including transaction updates and security alerts.
 * @param {Object} request - Controller initialization request object
 * @param {Object} request.controllerMessenger - Messenger for inter-controller communication
 * @param {Object} request.persistedState - Previously persisted controller state
 * @returns {Object} Object containing the initialized NotificationServicesPushController instance
 */
export const notificationServicesPushControllerInit: ControllerInitFunction<
  NotificationServicesPushController,
  NotificationServicesPushControllerMessenger
> = (request) => {
  const { controllerMessenger, persistedState } = request;

  const initialState = persistedState.NotificationServicesPushController;
  logControllerCreation(initialState);

  const state =
    persistedState.NotificationServicesPushController ?? defaultState;

  const controller = createNotificationServicesPushController({
    messenger: controllerMessenger,
    initialState: state,
  });

  return { controller };
};
