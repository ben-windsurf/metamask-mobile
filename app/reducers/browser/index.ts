import { BrowserActionTypes } from '../../actions/browser';
import AppConstants from '../../core/AppConstants';
import { appendURLParams } from '../../util/browser';

export interface BrowserState {
  history?: {
    url?: string;
    name?: string;
  }[];
  whitelist?: string[];
  tabs?: {
    url?: string;
    id?: string | number;
    linkType?: string;
    image?: string;
    isArchived?: boolean;
  }[];
  favicons?: {
    origin?: string;
    url?: string;
  }[];
  activeTab?: string | number | null;
  visitedDappsByHostname?: Record<string, boolean>;
}

interface BrowserAction {
  type: string;
  hostname?: string;
  url?: string;
  name?: string;
  metricsEnabled?: boolean;
  marketingEnabled?: boolean;
  id?: string;
  linkType?: string;
  data?: Record<string, unknown>;
  origin?: string;
}

const initialState: BrowserState = {
  history: [],
  whitelist: [],
  tabs: [],
  favicons: [],
  activeTab: null,
  visitedDappsByHostname: {},
};

const browserReducer = (
  state: BrowserState,
  action: BrowserAction = { type: '' },
): BrowserState => {
  if (!state) state = initialState;
  switch (action.type) {
    case BrowserActionTypes.ADD_TO_VIEWED_DAPP: {
      const { hostname } = action;
      if (!hostname) return state;
      return {
        ...state,
        visitedDappsByHostname: {
          ...state.visitedDappsByHostname,
          [hostname]: true,
        },
      };
    }
    case 'ADD_TO_BROWSER_HISTORY': {
      const { url, name } = action;

      if (!url || !name) return state;
      return {
        ...state,
        history: [...(state.history || []), { url, name }].slice(-50),
      };
    }
    case 'ADD_TO_BROWSER_WHITELIST':
      return {
        ...state,
        whitelist: [...(state.whitelist || []), action.url || ''],
      };
    case 'CLEAR_BROWSER_HISTORY':
      return {
        ...state,
        history: [],
        favicons: [],
        tabs: [
          {
            url: appendURLParams(AppConstants.HOMEPAGE_URL, {
              metricsEnabled: action.metricsEnabled || false,
              marketingEnabled: action.marketingEnabled || false,
            }).href,
            id: action.id || '',
          },
        ],
        activeTab: action.id || '',
      };
    case 'CLOSE_ALL_TABS':
      return {
        ...state,
        tabs: [],
      };
    case 'CREATE_NEW_TAB':
      return {
        ...state,
        tabs: [
          ...(state.tabs || []),
          {
            url: action.url || '',
            ...(action.linkType && { linkType: action.linkType }),
            id: action.id || '',
          },
        ],
      };
    case 'CLOSE_TAB':
      return {
        ...state,
        tabs: (state.tabs || []).filter((tab) => tab.id !== action.id),
      };
    case 'SET_ACTIVE_TAB':
      return {
        ...state,
        activeTab: action.id || '',
      };
    case 'UPDATE_TAB':
      return {
        ...state,
        tabs: (state.tabs || []).map((tab) => {
          if (tab.id === action.id) {
            return { ...tab, ...action.data };
          }
          return { ...tab };
        }),
      };
    case 'STORE_FAVICON_URL':
      return {
        ...state,
        favicons: [
          { origin: action.origin || '', url: action.url || '' },
          ...(state.favicons || []),
        ].slice(0, AppConstants.FAVICON_CACHE_MAX_SIZE),
      };
    default:
      return state;
  }
};

export default browserReducer;
