export interface PrivacyState {
  approvedHosts: { [hostname: string]: boolean };
  revealSRPTimestamps: number[];
}

const initialState: PrivacyState = {
  approvedHosts: {},
  revealSRPTimestamps: [],
};

interface PrivacyAction {
  type: string;
  hostname: string;
  timestamp: number;
}

const privacyReducer = (
  action: PrivacyAction,
  state: PrivacyState = initialState,
): PrivacyState => {
  const newHosts = { ...state.approvedHosts };
  switch (action.type) {
    case 'APPROVE_HOST':
      if (!action.hostname) return state;
      return {
        ...state,
        approvedHosts: {
          ...state.approvedHosts,
          [action.hostname]: true,
        },
      };
    case 'REJECT_HOST':
      if (!action.hostname) return state;
      delete newHosts[action.hostname];
      return {
        ...state,
        approvedHosts: newHosts,
      };
    case 'CLEAR_HOSTS':
      return {
        ...state,
        approvedHosts: {},
      };
    case 'RECORD_SRP_REVEAL_TIMESTAMP':
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
