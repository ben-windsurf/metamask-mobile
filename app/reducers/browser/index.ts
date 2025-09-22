/* eslint-disable @typescript-eslint/default-param-last */
import { BrowserActionTypes } from '../../actions/browser/index.js';
import AppConstants from '../../core/AppConstants';
import { appendURLParams } from '../../util/browser';

export interface BrowserHistoryEntry {
  url: string;
  name: string;
}

export interface BrowserTab {
  url: string;
  id: number;
  linkType?: string;
  image?: string;
  isArchived?: boolean;
}

export interface BrowserFavicon {
  origin: string;
  url: string;
}

export interface BrowserState {
  history: BrowserHistoryEntry[];
  whitelist: string[];
  tabs: BrowserTab[];
  favicons: BrowserFavicon[];
  activeTab: number | null;
  visitedDappsByHostname: Record<string, boolean>;
}

interface AddToViewedDappAction {
  type: typeof BrowserActionTypes.ADD_TO_VIEWED_DAPP;
  hostname: string;
}

interface AddToBrowserHistoryAction {
  type: 'ADD_TO_BROWSER_HISTORY';
  url: string;
  name: string;
}

interface AddToBrowserWhitelistAction {
  type: 'ADD_TO_BROWSER_WHITELIST';
  url: string;
}

interface ClearBrowserHistoryAction {
  type: 'CLEAR_BROWSER_HISTORY';
  metricsEnabled: boolean;
  marketingEnabled: boolean;
  id: number;
}

interface CloseAllTabsAction {
  type: 'CLOSE_ALL_TABS';
}

interface CreateNewTabAction {
  type: 'CREATE_NEW_TAB';
  url: string;
  id: number;
  linkType?: string;
}

interface CloseTabAction {
  type: 'CLOSE_TAB';
  id: number;
}

interface SetActiveTabAction {
  type: 'SET_ACTIVE_TAB';
  id: number;
}

interface UpdateTabAction {
  type: 'UPDATE_TAB';
  id: number;
  data: Partial<BrowserTab>;
}

interface StoreFaviconUrlAction {
  type: 'STORE_FAVICON_URL';
  origin: string;
  url: string;
}

type BrowserAction =
  | AddToViewedDappAction
  | AddToBrowserHistoryAction
  | AddToBrowserWhitelistAction
  | ClearBrowserHistoryAction
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
      const { hostname } = action as AddToViewedDappAction;
      return {
        ...state,
        visitedDappsByHostname: {
          ...state.visitedDappsByHostname,
          [hostname]: true,
        },
      };
    }
    case 'ADD_TO_BROWSER_HISTORY': {
      const { url, name } = action as AddToBrowserHistoryAction;

      return {
        ...state,
        history: [...state.history, { url, name }].slice(-50),
      };
    }
    case 'ADD_TO_BROWSER_WHITELIST': {
      const { url } = action as AddToBrowserWhitelistAction;
      return {
        ...state,
        whitelist: [...state.whitelist, url],
      };
    }
    case 'CLEAR_BROWSER_HISTORY': {
      const { metricsEnabled, marketingEnabled, id } =
        action as ClearBrowserHistoryAction;
      return {
        ...state,
        history: [],
        favicons: [],
        tabs: [
          {
            url: appendURLParams(AppConstants.HOMEPAGE_URL, {
              metricsEnabled,
              marketingEnabled,
            }).href,
            id,
          },
        ],
        activeTab: id,
      };
    }
    case 'CLOSE_ALL_TABS':
      return {
        ...state,
        tabs: [],
      };
    case 'CREATE_NEW_TAB': {
      const { url, id, linkType } = action as CreateNewTabAction;
      return {
        ...state,
        tabs: [
          ...state.tabs,
          {
            url,
            ...(linkType && { linkType }),
            id,
          },
        ],
        activeTab: id,
      };
    }
    case 'CLOSE_TAB': {
      const { id } = action as CloseTabAction;
      return {
        ...state,
        tabs: state.tabs.filter((tab) => tab.id !== id),
        activeTab:
          state.activeTab === id
            ? state.tabs.length > 1
              ? state.tabs.filter((tab) => tab.id !== id)[0]?.id || null
              : null
            : state.activeTab,
      };
    }
    case 'SET_ACTIVE_TAB': {
      const { id } = action as SetActiveTabAction;
      return {
        ...state,
        activeTab: id,
      };
    }
    case 'UPDATE_TAB': {
      const { id, data } = action as UpdateTabAction;
      return {
        ...state,
        tabs: state.tabs.map((tab) => {
          if (tab.id === id) {
            return { ...tab, ...data };
          }
          return { ...tab };
        }),
      };
    }
    case 'STORE_FAVICON_URL': {
      const { origin, url } = action as StoreFaviconUrlAction;
      return {
        ...state,
        favicons: [{ origin, url }, ...state.favicons].slice(
          0,
          AppConstants.FAVICON_CACHE_MAX_SIZE,
        ),
      };
    }
    default:
      return state;
  }
};
export default browserReducer;
