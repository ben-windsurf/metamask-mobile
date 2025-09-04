/* eslint-disable @typescript-eslint/default-param-last */
import { BrowserActionTypes, ActionType, Action } from '../../actions/browser';
import AppConstants from '../../core/AppConstants';
import { appendURLParams } from '../../util/browser';

export interface BrowserTabState {
  url: string;
  id: number;
  linkType?: string;
  isArchived?: boolean;
  image?: string;
}

export interface BrowserHistoryEntry {
  url: string;
  name: string;
}

export interface BrowserFavicon {
  origin: string;
  url: string;
}

export interface BrowserState {
  history: BrowserHistoryEntry[];
  whitelist: string[];
  tabs: BrowserTabState[];
  favicons: BrowserFavicon[];
  activeTab: number | null;
  visitedDappsByHostname: Record<string, boolean>;
}

export const initialState: Readonly<BrowserState> = {
  history: [],
  whitelist: [],
  tabs: [],
  favicons: [],
  activeTab: null,
  visitedDappsByHostname: {},
};

const browserReducer = (
  state: BrowserState = initialState,
  action: Action,
): BrowserState => {
  switch (action.type) {
    case BrowserActionTypes.ADD_TO_VIEWED_DAPP: {
      const { hostname } = action;
      return {
        ...state,
        visitedDappsByHostname: {
          ...state.visitedDappsByHostname,
          [hostname]: true,
        },
      };
    }
    case ActionType.ADD_TO_BROWSER_HISTORY: {
      const { url, name } = action;

      return {
        ...state,
        history: [...state.history, { url, name }].slice(-50),
      };
    }
    case ActionType.ADD_TO_BROWSER_WHITELIST:
      return {
        ...state,
        whitelist: [...state.whitelist, action.url],
      };
    case ActionType.CLEAR_BROWSER_HISTORY:
      return {
        ...state,
        history: [],
        favicons: [],
        tabs: [
          {
            url: appendURLParams(AppConstants.HOMEPAGE_URL, {
              metricsEnabled: action.metricsEnabled,
              marketingEnabled: action.marketingEnabled,
            }).href,
            id: action.id,
          },
        ],
        activeTab: action.id,
      };
    case ActionType.CLOSE_ALL_TABS:
      return {
        ...state,
        tabs: [],
      };
    case ActionType.CREATE_NEW_TAB:
      return {
        ...state,
        tabs: [
          ...state.tabs,
          {
            url: action.url,
            ...(action.linkType && { linkType: action.linkType }),
            id: action.id,
          },
        ],
      };
    case ActionType.CLOSE_TAB:
      return {
        ...state,
        tabs: state.tabs.filter((tab) => tab.id !== action.id),
      };
    case ActionType.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.id,
      };
    case ActionType.UPDATE_TAB:
      return {
        ...state,
        tabs: state.tabs.map((tab) => {
          if (tab.id === action.id) {
            return { ...tab, ...action.data };
          }
          return { ...tab };
        }),
      };
    case ActionType.STORE_FAVICON_URL:
      return {
        ...state,
        favicons: [
          { origin: action.origin, url: action.url },
          ...state.favicons,
        ].slice(0, AppConstants.FAVICON_CACHE_MAX_SIZE),
      };
    default:
      return state;
  }
};

export default browserReducer;
