export interface BrowserTab {
  url: string;
  id: string | number;
  linkType?: string;
}

export interface BrowserFavicon {
  origin: string;
  url: string;
}

export interface BrowserHistoryItem {
  url: string;
  name: string;
}

export interface BrowserState {
  history: BrowserHistoryItem[];
  whitelist: string[];
  tabs: BrowserTab[];
  favicons: BrowserFavicon[];
  activeTab: string | number | null;
  visitedDappsByHostname: Record<string, boolean>;
}

export const BrowserActionTypes = {
  ADD_TO_VIEWED_DAPP: 'ADD_TO_VIEWED_DAPP',
  ADD_TO_BROWSER_HISTORY: 'ADD_TO_BROWSER_HISTORY',
  ADD_TO_BROWSER_WHITELIST: 'ADD_TO_BROWSER_WHITELIST',
  CLEAR_BROWSER_HISTORY: 'CLEAR_BROWSER_HISTORY',
  CLOSE_ALL_TABS: 'CLOSE_ALL_TABS',
  CREATE_NEW_TAB: 'CREATE_NEW_TAB',
  CLOSE_TAB: 'CLOSE_TAB',
  SET_ACTIVE_TAB: 'SET_ACTIVE_TAB',
  UPDATE_TAB: 'UPDATE_TAB',
  STORE_FAVICON_URL: 'STORE_FAVICON_URL',
} as const;

export interface AddToViewedDappAction {
  type: typeof BrowserActionTypes.ADD_TO_VIEWED_DAPP;
  hostname: string;
}

export interface AddToBrowserHistoryAction {
  type: typeof BrowserActionTypes.ADD_TO_BROWSER_HISTORY;
  url: string;
  name: string;
}

export interface AddToBrowserWhitelistAction {
  type: typeof BrowserActionTypes.ADD_TO_BROWSER_WHITELIST;
  url: string;
}

export interface ClearBrowserHistoryAction {
  type: typeof BrowserActionTypes.CLEAR_BROWSER_HISTORY;
  metricsEnabled: boolean;
  marketingEnabled: boolean;
  id: number;
}

export interface CloseAllTabsAction {
  type: typeof BrowserActionTypes.CLOSE_ALL_TABS;
}

export interface CreateNewTabAction {
  type: typeof BrowserActionTypes.CREATE_NEW_TAB;
  url: string;
  id: number;
  linkType?: string;
}

export interface CloseTabAction {
  type: typeof BrowserActionTypes.CLOSE_TAB;
  id: number;
}

export interface SetActiveTabAction {
  type: typeof BrowserActionTypes.SET_ACTIVE_TAB;
  id: number;
}

export interface UpdateTabAction {
  type: typeof BrowserActionTypes.UPDATE_TAB;
  id: number;
  data: Partial<BrowserTab>;
}

export interface StoreFaviconUrlAction {
  type: typeof BrowserActionTypes.STORE_FAVICON_URL;
  origin: string;
  url: string;
}

export type BrowserAction =
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
