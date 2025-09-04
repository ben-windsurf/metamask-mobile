'use strict';

// eslint-disable-next-line import/no-nodejs-modules
import { EventEmitter } from 'events';

/**
 * Event hub for drawer status changes
 */
const hub = new EventEmitter();

/**
 * Tracks the open/closed status of a drawer component and emits events on status changes
 */
class DrawerStatusTracker {
  open = false;

  /**
   * Sets the drawer status and emits corresponding events
   * @param {string} status - The drawer status ('open' or 'closed')
   */
  setStatus(status) {
    if (status === 'open') {
      this.open = true;
    } else {
      this.open = false;
    }

    hub.emit(`drawer::${status}`);
  }
}

let instance = null;

/**
 * Singleton wrapper for DrawerStatusTracker that provides shared access across the application
 */
const SharedDrawerStatusTracker = {
  /**
   * Initializes the shared drawer status tracker instance
   */
  init: () => {
    instance = new DrawerStatusTracker();
  },

  /**
   * Sets the drawer status via the shared instance
   * @param {string} status - The drawer status ('open' or 'closed')
   */
  setStatus: (status) => {
    instance.setStatus(status);
  },

  /**
   * Gets the current drawer status
   * @returns {string} The current status ('open' or 'closed')
   */
  getStatus: () => (instance.open ? 'open' : 'closed'),
  hub,
};

export default SharedDrawerStatusTracker;
