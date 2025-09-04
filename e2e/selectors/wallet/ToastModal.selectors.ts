import enContent from '../../../locales/languages/en.json';

/**
 * Text selectors for toast modal elements using localized content.
 * Contains text-based selectors that reference localized strings for UI automation.
 */
export const ToastSelectorsText = {
  CLOSE_BUTTON: enContent.privacy_policy.toast_action_button,
};

/**
 * ID-based selectors for toast modal elements.
 * Contains element IDs used for locating toast notification components in E2E tests.
 */
export const ToastSelectorsIDs = {
  CONTAINER: 'toast',
  NOTIFICATION_TITLE: 'notification-title',
};
