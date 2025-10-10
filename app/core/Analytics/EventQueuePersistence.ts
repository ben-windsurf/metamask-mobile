import StorageWrapper from '../../store/storage-wrapper';
import Logger from '../../util/Logger';
import type { TrackEventType } from '@segment/analytics-react-native';
import { ANALYTICS_PENDING_EVENTS } from '../../constants/storage';

export class EventQueuePersistence {
  private static instance: EventQueuePersistence | null = null;

  static getInstance(): EventQueuePersistence {
    if (!EventQueuePersistence.instance) {
      EventQueuePersistence.instance = new EventQueuePersistence();
    }
    return EventQueuePersistence.instance;
  }

  async saveEvents(events: TrackEventType[]): Promise<void> {
    try {
      const serialized = JSON.stringify(events);
      await StorageWrapper.setItem(ANALYTICS_PENDING_EVENTS, serialized);

      if (__DEV__) {
        Logger.log(`EventQueuePersistence: Saved ${events.length} events to storage`);
      }
    } catch (error) {
      Logger.error(error as Error, 'EventQueuePersistence: Error saving events');
    }
  }

  async loadEvents(): Promise<TrackEventType[]> {
    try {
      const serialized = await StorageWrapper.getItem(ANALYTICS_PENDING_EVENTS);
      if (!serialized) {
        return [];
      }

      const events = JSON.parse(serialized) as TrackEventType[];

      if (__DEV__) {
        Logger.log(`EventQueuePersistence: Loaded ${events.length} events from storage`);
      }

      return events;
    } catch (error) {
      Logger.error(error as Error, 'EventQueuePersistence: Error loading events');
      return [];
    }
  }

  async clearEvents(): Promise<void> {
    try {
      await StorageWrapper.removeItem(ANALYTICS_PENDING_EVENTS);

      if (__DEV__) {
        Logger.log('EventQueuePersistence: Cleared all persisted events');
      }
    } catch (error) {
      Logger.error(error as Error, 'EventQueuePersistence: Error clearing events');
    }
  }

  async addEvent(event: TrackEventType): Promise<void> {
    try {
      const existingEvents = await this.loadEvents();
      existingEvents.push(event);
      await this.saveEvents(existingEvents);
    } catch (error) {
      Logger.error(error as Error, 'EventQueuePersistence: Error adding event');
    }
  }
}
