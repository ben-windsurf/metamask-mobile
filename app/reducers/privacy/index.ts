import { PrivacyState, PrivacyAction, PrivacyActionType } from './types';

const initialState: PrivacyState = {
  approvedHosts: {},
  revealSRPTimestamps: [],
};

const privacyReducer = (
  action: PrivacyAction,
  state: PrivacyState = initialState,
): PrivacyState => {
  const newHosts = { ...state.approvedHosts } as Record<string, boolean>;
  switch (action.type) {
    case PrivacyActionType.APPROVE_HOST:
      return {
        ...state,
        approvedHosts: {
          ...state.approvedHosts,
          [action.hostname || '']: true,
        },
      };
    case PrivacyActionType.REJECT_HOST:
      if (action.hostname) delete newHosts[action.hostname];
      return {
        ...state,
        approvedHosts: newHosts,
      };
    case PrivacyActionType.CLEAR_HOSTS:
      return {
        ...state,
        approvedHosts: {},
      };
    case PrivacyActionType.RECORD_SRP_REVEAL_TIMESTAMP:
      return {
        ...state,
        revealSRPTimestamps: [
          ...state.revealSRPTimestamps,
          action.timestamp || Date.now(),
        ],
      };
    default:
      return state;
  }
};

export default privacyReducer;
