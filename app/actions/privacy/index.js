/**
 * Creates an action to approve a host for privacy permissions
 * @param {string} hostname - The hostname to approve
 * @returns {Object} Redux action object with type and hostname
 */
export function approveHost(hostname) {
  return {
    type: 'APPROVE_HOST',
    hostname,
  };
}

/**
 * Creates an action to reject a host for privacy permissions
 * @param {string} hostname - The hostname to reject
 * @returns {Object} Redux action object with type and hostname
 */
export function rejectHost(hostname) {
  return {
    type: 'REJECT_HOST',
    hostname,
  };
}

/**
 * Creates an action to record when the Secret Recovery Phrase was revealed
 * @param {number} timestamp - The timestamp when SRP was revealed
 * @returns {Object} Redux action object with type and timestamp
 */
export function recordSRPRevealTimestamp(timestamp) {
  return {
    type: 'RECORD_SRP_REVEAL_TIMESTAMP',
    timestamp,
  };
}
