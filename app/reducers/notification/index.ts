import { createSelector } from 'reselect';
import { NotificationTypes } from '../../util/notifications';
import {
  NotificationState,
  NotificationAction,
  NotificationActionType,
  Notification,
} from './types';

const { TRANSACTION, SIMPLE } = NotificationTypes;

export const initialState: NotificationState = {
  notifications: [],
};

export const ACTIONS = {
  HIDE_CURRENT_NOTIFICATION: NotificationActionType.HIDE_CURRENT_NOTIFICATION,
  HIDE_NOTIFICATION_BY_ID: NotificationActionType.HIDE_NOTIFICATION_BY_ID,
  MODIFY_OR_SHOW_TRANSACTION_NOTIFICATION:
    NotificationActionType.MODIFY_OR_SHOW_TRANSACTION_NOTIFICATION,
  MODIFY_OR_SHOW_SIMPLE_NOTIFICATION:
    NotificationActionType.MODIFY_OR_SHOW_SIMPLE_NOTIFICATION,
  REPLACE_NOTIFICATION_BY_ID: NotificationActionType.REPLACE_NOTIFICATION_BY_ID,
  REMOVE_NOTIFICATION_BY_ID: NotificationActionType.REMOVE_NOTIFICATION_BY_ID,
  REMOVE_CURRENT_NOTIFICATION:
    NotificationActionType.REMOVE_CURRENT_NOTIFICATION,
  REMOVE_NOT_VISIBLE_NOTIFICATIONS:
    NotificationActionType.REMOVE_NOT_VISIBLE_NOTIFICATIONS,
  SHOW_SIMPLE_NOTIFICATION: NotificationActionType.SHOW_SIMPLE_NOTIFICATION,
  SHOW_TRANSACTION_NOTIFICATION:
    NotificationActionType.SHOW_TRANSACTION_NOTIFICATION,
  UPDATE_NOTIFICATION_STATUS: NotificationActionType.UPDATE_NOTIFICATION_STATUS,
};

const enqueue = (
  notifications: Notification[],
  notification: Notification,
): Notification[] => [...notifications, notification];
const dequeue = (notifications: Notification[]): Notification[] =>
  notifications.slice(1);

export const currentNotificationSelector = createSelector(
  (state: { notifications: NotificationState }) => state?.notifications,
  (notifications: NotificationState) => notifications.notifications[0] || {},
);

const notificationReducer = (
  action: NotificationAction,
  state: NotificationState = initialState,
): NotificationState => {
  const { notifications } = state;
  switch (action.type) {
    // make current notification isVisible props false
    case NotificationActionType.HIDE_CURRENT_NOTIFICATION: {
      if (notifications[0]) {
        return {
          ...state,
          notifications: [
            { ...notifications[0], isVisible: false },
            ...notifications.slice(1),
          ],
        };
      }
      return state;
    }
    case NotificationActionType.HIDE_NOTIFICATION_BY_ID: {
      const index = notifications.findIndex(({ id }) => id === action.id);
      if (index === -1) {
        return state;
      }
      return {
        ...state,
        notifications: [
          ...notifications.slice(0, index),
          { ...notifications[index], isVisible: false },
          ...notifications.slice(index + 1),
        ],
      };
    }
    case NotificationActionType.MODIFY_OR_SHOW_TRANSACTION_NOTIFICATION: {
      const index = notifications.findIndex(({ id }) => id === action.id);
      if (index >= 0) {
        return {
          ...state,
          notifications: [
            ...notifications.slice(0, index),
            {
              ...notifications[index],
              ...{
                id: action.transaction?.id || '',
                isVisible: true,
                autodismiss: action.autodismiss,
                transaction: action.transaction || undefined,
                status: action.status || '',
                type: TRANSACTION,
              },
            },
            ...notifications.slice(index + 1),
          ],
        };
      }
      return {
        ...state,
        notifications: enqueue(notifications, {
          id: action.transaction?.id || '',
          isVisible: true,
          autodismiss: action.autodismiss,
          transaction: action.transaction || undefined,
          status: action.status || '',
          type: TRANSACTION,
        } as Notification),
      };
    }
    case NotificationActionType.MODIFY_OR_SHOW_SIMPLE_NOTIFICATION: {
      const index = notifications.findIndex(({ id }) => id === action.id);
      if (index >= 0) {
        return {
          ...state,
          notifications: [
            ...notifications.slice(0, index),
            {
              ...notifications[index],
              ...{
                id: action.id || '',
                isVisible: true,
                autodismiss: action.autodismiss,
                title: action.title || '',
                description: action.description || '',
                status: action.status || '',
                type: SIMPLE,
              },
            },
            ...notifications.slice(index + 1),
          ],
        };
      }
      return {
        ...state,
        notifications: enqueue(notifications, {
          id: action.id || '',
          isVisible: true,
          autodismiss: action.autodismiss,
          title: action.title || '',
          description: action.description || '',
          status: action.status || '',
          type: SIMPLE,
        }),
      };
    }
    case NotificationActionType.REPLACE_NOTIFICATION_BY_ID: {
      const index = notifications.findIndex(({ id }) => id === action.id);
      if (index === -1) {
        return state;
      }
      return {
        ...state,
        notifications: [
          ...notifications.slice(0, index),
          action.notification || ({} as Notification),
          ...notifications.slice(index + 1),
        ],
      };
    }
    case NotificationActionType.REMOVE_NOTIFICATION_BY_ID: {
      return {
        ...state,
        notifications: notifications.filter(({ id }) => id !== action.id),
      };
    }
    case NotificationActionType.REMOVE_CURRENT_NOTIFICATION: {
      return {
        ...state,
        notifications: dequeue(notifications),
      };
    }
    case NotificationActionType.SHOW_SIMPLE_NOTIFICATION: {
      return {
        ...state,
        notifications: enqueue(notifications, {
          id: action.id || '',
          isVisible: true,
          autodismiss: action.autodismiss || 5000,
          title: action.title || '',
          description: action.description || '',
          status: action.status || '',
          type: SIMPLE,
        }),
      };
    }
    case NotificationActionType.SHOW_TRANSACTION_NOTIFICATION: {
      return {
        ...state,
        notifications: enqueue(notifications, {
          id: action.transaction?.id || '',
          isVisible: true,
          autodismiss: action.autodismiss || 5000,
          transaction: action.transaction || undefined,
          status: action.status || '',
          type: TRANSACTION,
        } as Notification),
      };
    }
    case NotificationActionType.REMOVE_NOT_VISIBLE_NOTIFICATIONS: {
      const visibleNotifications =
        notifications?.filter((notification) => notification.isVisible) || [];
      return {
        ...state,
        notifications: visibleNotifications,
      };
    }
    default:
      return state;
  }
};
export default notificationReducer;
