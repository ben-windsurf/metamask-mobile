export const BrowserActionTypes = {
  ADD_TO_VIEWED_DAPP: 'ADD_TO_VIEWED_DAPP',
} as const;

export enum ActionType {
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

interface AddToViewedDappAction {
  type: ActionType.ADD_TO_VIEWED_DAPP;
  hostname: string;
}

interface AddToHistoryAction {
  type: ActionType.ADD_TO_BROWSER_HISTORY;
  url: string;
  name: string;
}

interface AddToWhitelistAction {
  type: ActionType.ADD_TO_BROWSER_WHITELIST;
  url: string;
}

interface ClearHistoryAction {
  type: ActionType.CLEAR_BROWSER_HISTORY;
  id: number;
  metricsEnabled: boolean;
  marketingEnabled: boolean;
}

interface CloseAllTabsAction {
  type: ActionType.CLOSE_ALL_TABS;
}

interface CreateNewTabAction {
  type: ActionType.CREATE_NEW_TAB;
  url: string;
  linkType?: string;
  id: number;
}

interface CloseTabAction {
  type: ActionType.CLOSE_TAB;
  id: number;
}

interface SetActiveTabAction {
  type: ActionType.SET_ACTIVE_TAB;
  id: number;
}

interface UpdateTabAction {
  type: ActionType.UPDATE_TAB;
  id: number;
  data: {
    isArchived?: boolean;
    url?: string;
    image?: string;
  };
}

interface StoreFaviconAction {
  type: ActionType.STORE_FAVICON_URL;
  origin: string;
  url: string;
}

export type Action =
  | AddToViewedDappAction
  | AddToHistoryAction
  | AddToWhitelistAction
  | ClearHistoryAction
  | CloseAllTabsAction
  | CreateNewTabAction
  | CloseTabAction
  | SetActiveTabAction
  | UpdateTabAction
  | StoreFaviconAction;

export function addToViewedDapp(hostname: string): AddToViewedDappAction {
  return {
    type: ActionType.ADD_TO_VIEWED_DAPP,
    hostname,
  };
}

export function addToHistory({
  url,
  name,
}: {
  url: string;
  name: string;
}): AddToHistoryAction {
  return {
    type: ActionType.ADD_TO_BROWSER_HISTORY,
    url,
    name,
  };
}

export function clearHistory(
  metricsEnabled: boolean,
  marketingEnabled: boolean | null,
): ClearHistoryAction {
  return {
    type: ActionType.CLEAR_BROWSER_HISTORY,
    id: Date.now(),
    metricsEnabled,
    marketingEnabled: marketingEnabled ?? false,
  };
}

export function addToWhitelist(url: string): AddToWhitelistAction {
  return {
    type: ActionType.ADD_TO_BROWSER_WHITELIST,
    url,
  };
}

export function closeAllTabs(): CloseAllTabsAction {
  return {
    type: ActionType.CLOSE_ALL_TABS,
  };
}

export function createNewTab(
  url: string,
  linkType?: string,
): CreateNewTabAction {
  return {
    type: ActionType.CREATE_NEW_TAB,
    url,
    linkType,
    id: Date.now(),
  };
}

export function closeTab(id: number): CloseTabAction {
  return {
    type: ActionType.CLOSE_TAB,
    id,
  };
}

export function setActiveTab(id: number): SetActiveTabAction {
  return {
    type: ActionType.SET_ACTIVE_TAB,
    id,
  };
}

export function updateTab(
  id: number,
  data: { isArchived?: boolean; url?: string; image?: string },
): UpdateTabAction {
  return {
    type: ActionType.UPDATE_TAB,
    id,
    data,
  };
}

export function storeFavicon({
  origin,
  url,
}: {
  origin: string;
  url: string;
}): StoreFaviconAction {
  return {
    type: ActionType.STORE_FAVICON_URL,
    origin,
    url,
  };
}
