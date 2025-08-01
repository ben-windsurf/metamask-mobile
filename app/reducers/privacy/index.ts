export interface PrivacyState {
  approvedHosts?: Record<string, boolean>;
  revealSRPTimestamps?: number[];
}

export enum PrivacyActionType {
  APPROVE_HOST = 'APPROVE_HOST',
  REJECT_HOST = 'REJECT_HOST',
  CLEAR_HOSTS = 'CLEAR_HOSTS',
  RECORD_SRP_REVEAL_TIMESTAMP = 'RECORD_SRP_REVEAL_TIMESTAMP',
}

interface PrivacyAction {
  type: string;
  hostname?: string;
  timestamp?: number;
}

const initialState: PrivacyState = {
  approvedHosts: {},
  revealSRPTimestamps: [],
};

const privacyReducer = (
  state: PrivacyState,
  action: PrivacyAction = { type: '' },
): PrivacyState => {
  if (!state) state = initialState;
  const newHosts = {
    ...((state.approvedHosts as Record<string, boolean>) || {}),
  };
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
      if (action.hostname) {
        delete newHosts[action.hostname];
      }
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
          ...(state.revealSRPTimestamps || []),
          action.timestamp || 0,
        ],
      };
    default:
      return state;
  }
};

export default privacyReducer;
