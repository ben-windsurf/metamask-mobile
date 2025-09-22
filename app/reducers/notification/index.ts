import { createSelector } from 'reselect';
import { NotificationTypes } from '../../util/notifications';
const { TRANSACTION, SIMPLE } = NotificationTypes;

export interface TransactionNotification {
  id: string;
  isVisible: boolean;
  autodismiss: number;
  transaction: unknown;
  status: string;
  type: typeof TRANSACTION;
}

export interface SimpleNotification {
  id: string;
  isVisible: boolean;
  autodismiss: number;
  title: string;
  description: string;
  status: string;
  type: typeof SIMPLE;
}

export type Notification = TransactionNotification | SimpleNotification;

/* eslint-disable @typescript-eslint/default-param-last */
export interface NotificationState {
  notifications: Notification[];
}

export const initialState: NotificationState = {
  notifications: [],
};

export const ACTIONS = {
  HIDE_CURRENT_NOTIFICATION: 'HIDE_CURRENT_NOTIFICATION',
  HIDE_NOTIFICATION_BY_ID: 'HIDE_NOTIFICATION_BY_ID',
  MODIFY_OR_SHOW_TRANSACTION_NOTIFICATION:
    'MODIFY_OR_SHOW_TRANSACTION_NOTIFICATION',
  MODIFY_OR_SHOW_SIMPLE_NOTIFICATION: 'MODIFY_OR_SHOW_SIMPLE_NOTIFICATION',
  REPLACE_NOTIFICATION_BY_ID: 'REPLACE_NOTIFICATION_BY_ID',
  REMOVE_NOTIFICATION_BY_ID: 'REMOVE_NOTIFICATION_BY_ID',
  REMOVE_CURRENT_NOTIFICATION: 'REMOVE_CURRENT_NOTIFICATION',
  REMOVE_NOT_VISIBLE_NOTIFICATIONS: 'REMOVE_NOT_VISIBLE_NOTIFICATIONS',
  SHOW_SIMPLE_NOTIFICATION: 'SHOW_SIMPLE_NOTIFICATION',
  SHOW_TRANSACTION_NOTIFICATION: 'SHOW_TRANSACTION_NOTIFICATION',
  UPDATE_NOTIFICATION_STATUS: 'UPDATE_NOTIFICATION_STATUS',
};

const enqueue = (notifications: Notification[], notification: Notification) => [
  ...notifications,
  notification,
];
const dequeue = (notifications: Notification[]) => notifications.slice(1);

export const currentNotificationSelector = createSelector(
  (
    /** @type {import('..').RootState} */
    state,
  ) => state?.notifications,
  (notifications) => notifications[0] || {},
);

interface HideCurrentNotificationAction {
  type: typeof ACTIONS.HIDE_CURRENT_NOTIFICATION;
}

interface HideNotificationByIdAction {
  type: typeof ACTIONS.HIDE_NOTIFICATION_BY_ID;
  id: string;
}

interface ModifyOrShowTransactionNotificationAction {
  type: typeof ACTIONS.MODIFY_OR_SHOW_TRANSACTION_NOTIFICATION;
  id: string;
  transaction: unknown;
  autodismiss: number;
  status: string;
}

interface ModifyOrShowSimpleNotificationAction {
  type: typeof ACTIONS.MODIFY_OR_SHOW_SIMPLE_NOTIFICATION;
  id: string;
  autodismiss: number;
  title: string;
  description: string;
  status: string;
}

interface ReplaceNotificationByIdAction {
  type: typeof ACTIONS.REPLACE_NOTIFICATION_BY_ID;
  id: string;
  notification: Notification;
}

interface RemoveNotificationByIdAction {
  type: typeof ACTIONS.REMOVE_NOTIFICATION_BY_ID;
  id: string;
}

interface RemoveCurrentNotificationAction {
  type: typeof ACTIONS.REMOVE_CURRENT_NOTIFICATION;
}

interface ShowSimpleNotificationAction {
  type: typeof ACTIONS.SHOW_SIMPLE_NOTIFICATION;
  id: string;
  autodismiss?: number;
  title: string;
  description: string;
  status: string;
}

interface ShowTransactionNotificationAction {
  type: typeof ACTIONS.SHOW_TRANSACTION_NOTIFICATION;
  transaction: unknown;
  autodismiss?: number;
  status: string;
}

interface RemoveNotVisibleNotificationsAction {
  type: typeof ACTIONS.REMOVE_NOT_VISIBLE_NOTIFICATIONS;
}

type NotificationAction =
  | HideCurrentNotificationAction
  | HideNotificationByIdAction
  | ModifyOrShowTransactionNotificationAction
  | ModifyOrShowSimpleNotificationAction
  | ReplaceNotificationByIdAction
  | RemoveNotificationByIdAction
  | RemoveCurrentNotificationAction
  | ShowSimpleNotificationAction
  | ShowTransactionNotificationAction
  | RemoveNotVisibleNotificationsAction;

const notificationReducer = (
  state = initialState,
  action: NotificationAction,
): NotificationState => {
  const { notifications } = state;
  switch (action.type) {
    // make current notification isVisible props false
    case ACTIONS.HIDE_CURRENT_NOTIFICATION: {
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
    case ACTIONS.HIDE_NOTIFICATION_BY_ID: {
      const hideAction = action as HideNotificationByIdAction;
      const index = notifications.findIndex(({ id }) => id === hideAction.id);
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
    case ACTIONS.MODIFY_OR_SHOW_TRANSACTION_NOTIFICATION: {
      const modifyAction = action as ModifyOrShowTransactionNotificationAction;
      const index = notifications.findIndex(({ id }) => id === modifyAction.id);
      if (index >= 0) {
        return {
          ...state,
          notifications: [
            ...notifications.slice(0, index),
            {
              ...notifications[index],
              ...{
                id: (modifyAction.transaction as Record<string, unknown>)
                  ?.id as string,
                isVisible: true,
                autodismiss: modifyAction.autodismiss,
                transaction: modifyAction.transaction,
                status: modifyAction.status,
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
          id: (modifyAction.transaction as Record<string, unknown>)
            ?.id as string,
          isVisible: true,
          autodismiss: modifyAction.autodismiss,
          transaction: modifyAction.transaction,
          status: modifyAction.status,
          type: TRANSACTION,
        }),
      };
    }
    case ACTIONS.MODIFY_OR_SHOW_SIMPLE_NOTIFICATION: {
      const simpleAction = action as ModifyOrShowSimpleNotificationAction;
      const index = notifications.findIndex(({ id }) => id === simpleAction.id);
      if (index >= 0) {
        return {
          ...state,
          notifications: [
            ...notifications.slice(0, index),
            {
              ...notifications[index],
              ...{
                id: simpleAction.id,
                isVisible: true,
                autodismiss: simpleAction.autodismiss,
                title: simpleAction.title,
                description: simpleAction.description,
                status: simpleAction.status,
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
          id: simpleAction.id,
          isVisible: true,
          autodismiss: simpleAction.autodismiss,
          title: simpleAction.title,
          description: simpleAction.description,
          status: simpleAction.status,
          type: SIMPLE,
        }),
      };
    }
    case ACTIONS.REPLACE_NOTIFICATION_BY_ID: {
      const replaceAction = action as ReplaceNotificationByIdAction;
      const index = notifications.findIndex(
        ({ id }) => id === replaceAction.id,
      );
      if (index === -1) {
        return state;
      }
      return {
        ...state,
        notifications: [
          ...notifications.slice(0, index),
          replaceAction.notification,
          ...notifications.slice(index + 1),
        ],
      };
    }
    case ACTIONS.REMOVE_NOTIFICATION_BY_ID: {
      const removeAction = action as RemoveNotificationByIdAction;
      return {
        ...state,
        notifications: notifications.filter(({ id }) => id !== removeAction.id),
      };
    }
    case ACTIONS.REMOVE_CURRENT_NOTIFICATION: {
      return {
        ...state,
        notifications: dequeue(notifications),
      };
    }
    case ACTIONS.SHOW_SIMPLE_NOTIFICATION: {
      const showSimpleAction = action as ShowSimpleNotificationAction;
      return {
        ...state,
        notifications: enqueue(notifications, {
          id: showSimpleAction.id,
          isVisible: true,
          autodismiss: showSimpleAction.autodismiss || 5000,
          title: showSimpleAction.title,
          description: showSimpleAction.description,
          status: showSimpleAction.status,
          type: SIMPLE,
        }),
      };
    }
    case ACTIONS.SHOW_TRANSACTION_NOTIFICATION: {
      const showTransactionAction = action as ShowTransactionNotificationAction;
      return {
        ...state,
        notifications: enqueue(notifications, {
          id: (showTransactionAction.transaction as Record<string, unknown>)
            ?.id as string,
          isVisible: true,
          autodismiss: showTransactionAction.autodismiss || 5000,
          transaction: showTransactionAction.transaction,
          status: showTransactionAction.status,
          type: TRANSACTION,
        }),
      };
    }
    case ACTIONS.REMOVE_NOT_VISIBLE_NOTIFICATIONS: {
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
