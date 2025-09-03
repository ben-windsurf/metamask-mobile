import {
  ActionConstraint,
  Messenger,
  EventConstraint,
  ExtractEventHandler,
} from '@metamask/base-controller';

/**
 * Extended controller messenger that provides additional event handling capabilities
 * beyond the base Messenger class. Adds conditional subscription and safe unsubscription
 * methods for more robust event management in MetaMask Mobile's controller architecture.
 * @template Action - The action constraint type for the messenger
 * @template Event - The event constraint type for the messenger
 */
export class ExtendedControllerMessenger<
  Action extends ActionConstraint,
  Event extends EventConstraint,
> extends Messenger<Action, Event> {
  /**
   * Subscribes to an event with a condition, automatically unsubscribing after the first
   * time the condition is met. Useful for waiting for specific state changes or events.
   * @param eventType - The type of event to subscribe to
   * @param handler - The event handler function to call when criteria is met
   * @param criteria - Function that determines if the handler should be called and unsubscribed
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
   * Safely attempts to unsubscribe an event handler, ignoring any errors that occur.
   * This prevents crashes when trying to unsubscribe handlers that may have already
   * been removed or were never properly subscribed.
   * @param eventType - The type of event to unsubscribe from
   * @param handler - The event handler function to unsubscribe (optional)
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
