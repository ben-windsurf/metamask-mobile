export interface BrowserTab {
  url: string;
  id: string | number;
  linkType?: string;
  image?: string;
  isArchived?: boolean;
}

export interface BrowserHistoryItem {
  url: string;
  name: string;
}

export interface BrowserFavicon {
  origin: string;
  url: string;
}

export interface BrowserState {
  history: BrowserHistoryItem[];
  whitelist: string[];
  tabs: BrowserTab[];
  favicons: BrowserFavicon[];
  activeTab: string | number | null;
  visitedDappsByHostname: { [hostname: string]: boolean };
}

export enum BrowserActionType {
  ADD_TO_VIEWED_DAPP = 'ADD_TO_VIEWED_DAPP',
  ADD_TO_BROWSER_HISTORY = 'ADD_TO_BROWSER_HISTORY',
  ADD_TO_BROWSER_WHITELIST = 'ADD_TO_BROWSER_WHITELIST',
  CLEAR_BROWSER_HISTORY = 'CLEAR_BROWSER_HISTORY',
  CLOSE_ALL_TABS = 'CLOSE_ALL_TABS',
  CREATE_NEW_TAB = 'CREATE_NEW_TAB',
  CLOSE_TAB = 'CLOSE_TAB',
  SET_ACTIVE_TAB = 'SET_ACTIVE_TAB',
  UPDATE_TAB = 'UPDATE_TAB',
  STORE_FAVICON_URL = 'STORE_FAVICON_URL',
}

export interface BrowserAction {
  type: BrowserActionType | string;
  hostname?: string;
  url?: string;
  name?: string;
  metricsEnabled?: boolean;
  marketingEnabled?: boolean;
  id?: string;
  linkType?: string;
  data?: unknown;
  origin?: string;
}
