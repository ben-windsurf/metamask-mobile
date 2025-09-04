import {
  ActionConstraint,
  Messenger,
  EventConstraint,
  ExtractEventHandler,
} from '@metamask/base-controller';

/**
 * Extended controller messenger that provides additional utility methods
 * for conditional event subscription and safe unsubscription.
 *
 * @template Action - The action constraint type
 * @template Event - The event constraint type
 */
export class ExtendedControllerMessenger<
  Action extends ActionConstraint,
  Event extends EventConstraint,
> extends Messenger<Action, Event> {
  /**
   * Subscribes to an event once, but only if the criteria function returns true.
   * The subscription is automatically removed after the first matching event.
   *
   * @param eventType - The type of event to subscribe to
   * @param handler - The event handler function to call
   * @param criteria - Function that determines if the event should trigger the handler
   * @returns The internal handler function that was registered
   */
  subscribeOnceIf<EventType extends Event['type']>(
    eventType: EventType,
    handler: ExtractEventHandler<Event, EventType>,
    criteria: (
      ...args: Parameters<ExtractEventHandler<Event, EventType>>
    ) => boolean,
  ): typeof handler {
    const internalHandler = ((...data: Parameters<typeof handler>) => {
      if (!criteria || criteria(...data)) {
        this.tryUnsubscribe(eventType, internalHandler);
        handler(...data);
      }
    }) as typeof handler;

    this.subscribe(eventType, internalHandler);

    return internalHandler;
  }

  /**
   * Attempts to unsubscribe from an event, ignoring any errors that occur.
   * This is useful for cleanup operations where the subscription may have
   * already been removed.
   *
   * @param eventType - The type of event to unsubscribe from
   * @param handler - The event handler function to remove (optional)
   */
  tryUnsubscribe<EventType extends Event['type']>(
    eventType: EventType,
    handler?: ExtractEventHandler<Event, EventType>,
  ) {
    if (!handler) {
      return;
    }

    try {
      this.unsubscribe(eventType, handler);
    } catch (e) {
      // Ignore
    }
  }
}
