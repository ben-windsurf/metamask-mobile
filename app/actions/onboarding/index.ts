import { ITrackingEvent } from '../../core/Analytics/MetaMetrics.types';

export const SAVE_EVENT = 'SAVE_EVENT';
export const CLEAR_EVENTS = 'CLEAR_EVENTS';
export const SET_COMPLETED_ONBOARDING = 'SET_COMPLETED_ONBOARDING';

interface SaveEventAction {
  type: typeof SAVE_EVENT;
  event: [ITrackingEvent];
}

interface ClearEventsAction {
  type: typeof CLEAR_EVENTS;
}

export interface SetCompletedOnboardingAction {
  type: typeof SET_COMPLETED_ONBOARDING;
  completedOnboarding: boolean;
}

export type OnboardingActionTypes =
  | SaveEventAction
  | ClearEventsAction
  | SetCompletedOnboardingAction;

/**
 * Saves an onboarding event for analytics tracking
 * @param {[ITrackingEvent]} eventArgs - Array containing the tracking event to save
 * @returns {SaveEventAction} Redux action object with type and event data
 */
export function saveOnboardingEvent(
  eventArgs: [ITrackingEvent],
): SaveEventAction {
  return {
    type: SAVE_EVENT,
    event: eventArgs,
  };
}

/**
 * Clears all stored onboarding events from the Redux store
 * @returns {ClearEventsAction} Redux action object to clear onboarding events
 */
export function clearOnboardingEvents(): ClearEventsAction {
  return {
    type: CLEAR_EVENTS,
  };
}

/**
 * Sets the onboarding completion status in the Redux store
 * @param {boolean} completedOnboarding - Whether the user has completed onboarding
 * @returns {SetCompletedOnboardingAction} Redux action object with completion status
 */
export function setCompletedOnboarding(
  completedOnboarding: boolean,
): SetCompletedOnboardingAction {
  return {
    type: SET_COMPLETED_ONBOARDING,
    completedOnboarding,
  };
}
