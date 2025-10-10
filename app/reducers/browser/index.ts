import { BrowserActionTypes } from '../../actions/browser';
import AppConstants from '../../core/AppConstants';
import { appendURLParams } from '../../util/browser';

export interface Tab {
  id: number;
  url: string;
  linkType?: string;
  image?: string;
  isArchived?: boolean;
}

export interface HistoryEntry {
  url: string;
  name: string;
}

export interface Favicon {
  origin: string;
  url: string;
}

export interface BrowserState {
  history: HistoryEntry[];
  whitelist: string[];
  tabs: Tab[];
  favicons: Favicon[];
  activeTab: number | null;
  visitedDappsByHostname: Record<string, boolean>;
}

interface AddToViewedDappAction {
  type: BrowserActionTypes.ADD_TO_VIEWED_DAPP;
  hostname: string;
}

interface AddToBrowserHistoryAction {
  type: BrowserActionTypes.ADD_TO_BROWSER_HISTORY;
  url: string;
  name: string;
}

interface ClearBrowserHistoryAction {
  type: BrowserActionTypes.CLEAR_BROWSER_HISTORY;
  id: number;
  metricsEnabled: boolean;
  marketingEnabled: boolean;
}

interface AddToBrowserWhitelistAction {
  type: BrowserActionTypes.ADD_TO_BROWSER_WHITELIST;
  url: string;
}

interface CloseAllTabsAction {
  type: BrowserActionTypes.CLOSE_ALL_TABS;
}

interface CreateNewTabAction {
  type: BrowserActionTypes.CREATE_NEW_TAB;
  url: string;
  linkType?: string;
  id: number;
}

interface CloseTabAction {
  type: BrowserActionTypes.CLOSE_TAB;
  id: number;
}

interface SetActiveTabAction {
  type: BrowserActionTypes.SET_ACTIVE_TAB;
  id: number;
}

interface UpdateTabAction {
  type: BrowserActionTypes.UPDATE_TAB;
  id: number;
  data: Partial<Tab>;
}

interface StoreFaviconUrlAction {
  type: BrowserActionTypes.STORE_FAVICON_URL;
  origin: string;
  url: string;
}

type BrowserAction =
  | AddToViewedDappAction
  | AddToBrowserHistoryAction
  | ClearBrowserHistoryAction
  | AddToBrowserWhitelistAction
  | CloseAllTabsAction
  | CreateNewTabAction
  | CloseTabAction
  | SetActiveTabAction
  | UpdateTabAction
  | StoreFaviconUrlAction;

const initialState: BrowserState = {
  history: [],
  whitelist: [],
  tabs: [],
  favicons: [],
  activeTab: null,
  visitedDappsByHostname: {},
};

const browserReducer = (
  state: BrowserState = initialState,
  action: BrowserAction,
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
    case BrowserActionTypes.ADD_TO_BROWSER_HISTORY: {
      const { url, name } = action;

      return {
        ...state,
        history: [...state.history, { url, name }].slice(-50),
      };
    }
    case BrowserActionTypes.ADD_TO_BROWSER_WHITELIST:
      return {
        ...state,
        whitelist: [...state.whitelist, action.url],
      };
    case BrowserActionTypes.CLEAR_BROWSER_HISTORY:
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
    case BrowserActionTypes.CLOSE_ALL_TABS:
      return {
        ...state,
        tabs: [],
      };
    case BrowserActionTypes.CREATE_NEW_TAB:
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
    case BrowserActionTypes.CLOSE_TAB:
      return {
        ...state,
        tabs: state.tabs.filter((tab) => tab.id !== action.id),
      };
    case BrowserActionTypes.SET_ACTIVE_TAB:
      return {
        ...state,
        activeTab: action.id,
      };
    case BrowserActionTypes.UPDATE_TAB:
      return {
        ...state,
        tabs: state.tabs.map((tab) => {
          if (tab.id === action.id) {
            return { ...tab, ...action.data };
          }
          return { ...tab };
        }),
      };
    case BrowserActionTypes.STORE_FAVICON_URL:
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
