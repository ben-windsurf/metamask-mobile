import { Messenger } from '@metamask/base-controller';
import {
  WebSocketServiceEvents,
  WebSocketServiceAllowedActions,
} from '@metamask/snaps-controllers';

/**
 * Type definition for the WebSocket service messenger.
 * Represents a restricted messenger scoped to WebSocket service actions and events.
 */
export type WebSocketServiceMessenger = ReturnType<
  typeof getWebSocketServiceMessenger
>;

/**
 * Get a restricted messenger for the WebSocket service. This is scoped to the
 * actions and events that the WebSocket service is allowed to handle.
 *
 * @param messenger - The messenger to restrict.
 * @returns The restricted messenger.
 */
export function getWebSocketServiceMessenger(
  messenger: Messenger<WebSocketServiceAllowedActions, WebSocketServiceEvents>,
) {
  return messenger.getRestricted({
    name: 'WebSocketService',
    allowedActions: ['SnapController:handleRequest'],
    allowedEvents: [
      'SnapController:snapUpdated',
      'SnapController:snapUninstalled',
      'SnapController:snapInstalled',
    ],
  });
}
