import {
  InfuraAvailabilityState,
  InfuraAvailabilityAction,
  InfuraAvailabilityActionType,
} from './types';

const initialState: InfuraAvailabilityState = {
  isBlocked: false,
};

export const INFURA_AVAILABILITY_BLOCKED =
  InfuraAvailabilityActionType.INFURA_AVAILABILITY_BLOCKED;
export const INFURA_AVAILABILITY_NOT_BLOCKED =
  InfuraAvailabilityActionType.INFURA_AVAILABILITY_NOT_BLOCKED;

export const getInfuraBlockedSelector = (state: {
  infuraAvailability: InfuraAvailabilityState;
}) => state.infuraAvailability?.isBlocked;

const infuraAvailabilityReducer = (
  action: InfuraAvailabilityAction,
  state: InfuraAvailabilityState = initialState,
): InfuraAvailabilityState => {
  switch (action.type) {
    case InfuraAvailabilityActionType.INFURA_AVAILABILITY_BLOCKED:
      return {
        ...state,
        isBlocked: true,
      };
    case InfuraAvailabilityActionType.INFURA_AVAILABILITY_NOT_BLOCKED:
      return {
        ...state,
        isBlocked: false,
      };
    default:
      return state;
  }
};
export default infuraAvailabilityReducer;
