import {
  INFURA_AVAILABILITY_BLOCKED,
  INFURA_AVAILABILITY_NOT_BLOCKED,
} from '../../reducers/infuraAvailability';

/**
 * Creates an action to mark Infura as blocked/unavailable
 * @returns {Object} Redux action object with INFURA_AVAILABILITY_BLOCKED type
 */
export function setInfuraAvailabilityBlocked() {
  return {
    type: INFURA_AVAILABILITY_BLOCKED,
  };
}

/**
 * Creates an action to mark Infura as available/not blocked
 * @returns {Object} Redux action object with INFURA_AVAILABILITY_NOT_BLOCKED type
 */
export function setInfuraAvailabilityNotBlocked() {
  return {
    type: INFURA_AVAILABILITY_NOT_BLOCKED,
  };
}
