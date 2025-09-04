import {
  generateOpt,
  EVENT_NAME as METRICS_EVENT_NAME,
} from '../../MetaMetrics.events';

/**
 * Event names for confirmation-related analytics tracking.
 * These events are used to track user interactions within confirmation screens.
 */
enum EVENT_NAME {
  ADVANCED_DETAILS_CLICKED = 'Confirmation Advanced Details Clicked',
  BLOCKAID_ALERT_LINK_CLICKED = 'Blockaid Alert Link Clicked',
  TOOLTIP_CLICKED = 'Confirmation Tooltip Clicked',
  SCREEN_VIEWED = 'Confirmation Screen Viewed',
}

/**
 * Event names for transaction lifecycle analytics tracking.
 * These events track the various states and actions of transactions.
 */
enum TRANSACTION_EVENT_NAMES {
  TRANSACTION_ADDED = 'Transaction Added',
  TRANSACTION_APPROVED = 'Transaction Approved',
  // Finalized is the unified event that is triggered
  // when the transaction is confirmed, dropped or failed
  TRANSACTION_FINALIZED = 'Transaction Finalized',
  TRANSACTION_REJECTED = 'Transaction Rejected',
  TRANSACTION_SUBMITTED = 'Transaction Submitted',
}

/**
 * Creates a MetaMetrics event object from an event name.
 * This function helps prevent repeat of type conversions.
 *
 * @param name - The event name from either EVENT_NAME or TRANSACTION_EVENT_NAMES enum
 * @returns A MetaMetrics event object ready for tracking
 */
const createEvent = (name: EVENT_NAME | TRANSACTION_EVENT_NAMES) =>
  generateOpt(name as unknown as METRICS_EVENT_NAME);

/**
 * Pre-configured confirmation events for MetaMetrics tracking.
 * These events track user interactions within confirmation screens.
 */
export const CONFIRMATION_EVENTS = {
  ADVANCED_DETAILS_CLICKED: createEvent(EVENT_NAME.ADVANCED_DETAILS_CLICKED),
  BLOCKAID_ALERT_LINK_CLICKED: createEvent(
    EVENT_NAME.BLOCKAID_ALERT_LINK_CLICKED,
  ),
  SCREEN_VIEWED: createEvent(EVENT_NAME.SCREEN_VIEWED),
  TOOLTIP_CLICKED: createEvent(EVENT_NAME.TOOLTIP_CLICKED),
};

/**
 * Pre-configured transaction events for MetaMetrics tracking.
 * These events track the lifecycle and state changes of transactions.
 */
export const TRANSACTION_EVENTS = {
  TRANSACTION_ADDED: createEvent(TRANSACTION_EVENT_NAMES.TRANSACTION_ADDED),
  TRANSACTION_APPROVED: createEvent(
    TRANSACTION_EVENT_NAMES.TRANSACTION_APPROVED,
  ),
  TRANSACTION_FINALIZED: createEvent(
    TRANSACTION_EVENT_NAMES.TRANSACTION_FINALIZED,
  ),
  TRANSACTION_REJECTED: createEvent(
    TRANSACTION_EVENT_NAMES.TRANSACTION_REJECTED,
  ),
  TRANSACTION_SUBMITTED: createEvent(
    TRANSACTION_EVENT_NAMES.TRANSACTION_SUBMITTED,
  ),
};
