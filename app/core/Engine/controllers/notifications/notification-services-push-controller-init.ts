import {
  NotificationServicesPushControllerMessenger,
  NotificationServicesPushControllerState,
  Controller as NotificationServicesPushController,
  defaultState,
} from '@metamask/notification-services-controller/push-services';
import { ControllerInitFunction } from '../../types';
import Logger from '../../../../util/Logger';
import { createNotificationServicesPushController } from './create-notification-services-push-controller';

/**
 * Logs the creation of the NotificationServicesPushController with appropriate state information.
 *
 * @param initialState - Optional partial state to initialize the controller with
 */
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
 * Initializes the NotificationServicesPushController with the provided configuration.
 * Creates and configures the controller instance for handling push notification services.
 *
 * @param request - Controller initialization request containing messenger and persisted state
 * @returns Object containing the initialized NotificationServicesPushController instance
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
