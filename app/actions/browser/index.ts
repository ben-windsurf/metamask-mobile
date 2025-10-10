/**
 * Browser actions for Redux
 */
export enum BrowserActionTypes {
  ADD_TO_VIEWED_DAPP = 'ADD_TO_VIEWED_DAPP',
  ADD_TO_BROWSER_HISTORY = 'ADD_TO_BROWSER_HISTORY',
  CLEAR_BROWSER_HISTORY = 'CLEAR_BROWSER_HISTORY',
  ADD_TO_BROWSER_WHITELIST = 'ADD_TO_BROWSER_WHITELIST',
  CLOSE_ALL_TABS = 'CLOSE_ALL_TABS',
  CREATE_NEW_TAB = 'CREATE_NEW_TAB',
  CLOSE_TAB = 'CLOSE_TAB',
  SET_ACTIVE_TAB = 'SET_ACTIVE_TAB',
  UPDATE_TAB = 'UPDATE_TAB',
  STORE_FAVICON_URL = 'STORE_FAVICON_URL',
}

/**
 * Adds a new entry to viewed dapps
 *
 * @param hostname - Dapp hostname
 */
export function addToViewedDapp(hostname: string) {
  return {
    type: BrowserActionTypes.ADD_TO_VIEWED_DAPP,
    hostname,
  } as const;
}

/**
 * Adds a new entry to the browser history
 *
 * @param website - The website that has been visited
 */
export function addToHistory({
  url,
  name,
}: {
  url: string;
  name: string;
}) {
  return {
    type: BrowserActionTypes.ADD_TO_BROWSER_HISTORY,
    url,
    name,
  } as const;
}

/**
 * Clears the entire browser history
 */
export function clearHistory(
  metricsEnabled: boolean,
  marketingEnabled: boolean,
) {
  return {
    type: BrowserActionTypes.CLEAR_BROWSER_HISTORY,
    id: Date.now(),
    metricsEnabled,
    marketingEnabled,
  } as const;
}

/**
 * Adds a new entry to the whitelist
 *
 * @param url - The website's url
 */
export function addToWhitelist(url: string) {
  return {
    type: BrowserActionTypes.ADD_TO_BROWSER_WHITELIST,
    url,
  } as const;
}

/**
 * Closes all the opened tabs
 */
export function closeAllTabs() {
  return {
    type: BrowserActionTypes.CLOSE_ALL_TABS,
  } as const;
}

/**
 * Creates a new tab
 *
 * @param url - The website's url
 * @param linkType - optional link type
 */
export function createNewTab(url: string, linkType?: string) {
  return {
    type: BrowserActionTypes.CREATE_NEW_TAB,
    url,
    linkType,
    id: Date.now(),
  } as const;
}

/**
 * Closes an exiting tab
 *
 * @param id - The Tab ID
 */
export function closeTab(id: number) {
  return {
    type: BrowserActionTypes.CLOSE_TAB,
    id,
  } as const;
}

/**
 * Selects an exiting tab
 *
 * @param id - The Tab ID
 */
export function setActiveTab(id: number) {
  return {
    type: BrowserActionTypes.SET_ACTIVE_TAB,
    id,
  } as const;
}

/**
 * Updates an existing tab
 *
 * @param id - The Tab ID
 * @param data - Tab update data
 */
export function updateTab(
  id: number,
  data: Partial<{ url: string; image: string; isArchived: boolean }>,
) {
  return {
    type: BrowserActionTypes.UPDATE_TAB,
    id,
    data,
  } as const;
}

/**
 * Stores the favicon url using the origin as key
 *
 * @param favicon - favicon to store
 */
export function storeFavicon({
  origin,
  url,
}: {
  origin: string;
  url: string;
}) {
  return {
    type: BrowserActionTypes.STORE_FAVICON_URL,
    origin,
    url,
  } as const;
}
