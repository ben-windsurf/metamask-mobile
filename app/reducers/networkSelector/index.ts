export interface NetworkOnboardedState {
  networkOnboardedState: { [key: string]: boolean };
  networkState: {
    showNetworkOnboarding: boolean;
    nativeToken: string;
    networkType: string;
    networkUrl: string;
  };
  switchedNetwork: {
    networkUrl: string;
    networkStatus: boolean;
  };
}

export const initialState: NetworkOnboardedState = {
  networkOnboardedState: {},
  networkState: {
    showNetworkOnboarding: false,
    nativeToken: '',
    networkType: '',
    networkUrl: '',
  },
  switchedNetwork: {
    networkUrl: '',
    networkStatus: false,
  },
};

/**
 *
 * Network onboarding reducer
 * @returns
 */

export interface NetworkOnboardAction {
  nativeToken?: string;
  networkType?: string;
  networkUrl?: string;
  networkStatus?: boolean;
  showNetworkOnboarding?: boolean;
  type: string;
  payload?: string;
}

function networkOnboardReducer(
  state: NetworkOnboardedState = initialState,
  action: NetworkOnboardAction = {
    type: '',
  },
): NetworkOnboardedState {
  switch (action.type) {
    case 'SHOW_NETWORK_ONBOARDING':
      return {
        ...state,
        networkState: {
          showNetworkOnboarding: action.showNetworkOnboarding ?? false,
          nativeToken: action.nativeToken || '',
          networkType: action.networkType || '',
          networkUrl: action.networkUrl || '',
        },
      };
    case 'NETWORK_SWITCHED':
      return {
        ...state,
        switchedNetwork: {
          networkUrl: action.networkUrl || '',
          networkStatus: action.networkStatus ?? false,
        },
      };
    case 'NETWORK_ONBOARDED':
      return {
        ...state,
        networkState: {
          showNetworkOnboarding: false,
          nativeToken: '',
          networkType: '',
          networkUrl: '',
        },
        networkOnboardedState: {
          ...state.networkOnboardedState,
          [action.payload || '']: true,
        },
      };
    default:
      return state;
  }
}

export default networkOnboardReducer;
