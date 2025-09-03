/**
 * Dismisses the currently displayed alert
 * @returns {Object} Redux action object with type HIDE_ALERT
 */
export function dismissAlert() {
  return {
    type: 'HIDE_ALERT',
  };
}

/**
 * Shows an alert with the specified configuration
 * @param {Object} alertConfig - Alert configuration object
 * @param {boolean} alertConfig.isVisible - Whether the alert should be visible
 * @param {number|null} alertConfig.autodismiss - Time in milliseconds to auto-dismiss the alert, or null for manual dismissal
 * @param {React.ReactNode} alertConfig.content - The content to display in the alert
 * @param {Object} alertConfig.data - Additional data associated with the alert
 * @returns {Object} Redux action object with type SHOW_ALERT and alert configuration
 */
export function showAlert({ isVisible, autodismiss, content, data }) {
  return {
    type: 'SHOW_ALERT',
    isVisible,
    autodismiss,
    content,
    data,
  };
}
