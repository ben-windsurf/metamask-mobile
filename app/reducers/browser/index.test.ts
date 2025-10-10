import browserReducer, {
  BrowserState,
  Tab,
  HistoryEntry,
  Favicon,
} from './index';
import { BrowserActionTypes } from '../../actions/browser';
import AppConstants from '../../core/AppConstants';

describe('browserReducer', () => {
  const initialState: BrowserState = {
    history: [],
    whitelist: [],
    tabs: [],
    favicons: [],
    activeTab: null,
    visitedDappsByHostname: {},
  };

  it('should return the initial state', () => {
    const action = { type: 'UNKNOWN_ACTION' } as any;
    expect(browserReducer(undefined, action)).toEqual(initialState);
  });

  describe('ADD_TO_VIEWED_DAPP', () => {
    it('should add a hostname to visitedDappsByHostname', () => {
      const hostname = 'metamask.io';
      const action = {
        type: BrowserActionTypes.ADD_TO_VIEWED_DAPP,
        hostname,
      } as const;

      const newState = browserReducer(initialState, action);

      expect(newState.visitedDappsByHostname).toEqual({
        [hostname]: true,
      });
      expect(newState).not.toBe(initialState);
    });

    it('should add multiple hostnames to visitedDappsByHostname', () => {
      const state: BrowserState = {
        ...initialState,
        visitedDappsByHostname: { 'ethereum.org': true },
      };

      const hostname = 'metamask.io';
      const action = {
        type: BrowserActionTypes.ADD_TO_VIEWED_DAPP,
        hostname,
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.visitedDappsByHostname).toEqual({
        'ethereum.org': true,
        'metamask.io': true,
      });
    });

    it('should overwrite existing hostname entry', () => {
      const state: BrowserState = {
        ...initialState,
        visitedDappsByHostname: { 'metamask.io': true },
      };

      const hostname = 'metamask.io';
      const action = {
        type: BrowserActionTypes.ADD_TO_VIEWED_DAPP,
        hostname,
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.visitedDappsByHostname).toEqual({
        'metamask.io': true,
      });
    });
  });

  describe('ADD_TO_BROWSER_HISTORY', () => {
    it('should add an entry to browser history', () => {
      const entry: HistoryEntry = {
        url: 'https://metamask.io',
        name: 'MetaMask',
      };

      const action = {
        type: BrowserActionTypes.ADD_TO_BROWSER_HISTORY,
        url: entry.url,
        name: entry.name,
      } as const;

      const newState = browserReducer(initialState, action);

      expect(newState.history).toEqual([entry]);
      expect(newState.history.length).toBe(1);
    });

    it('should maintain history limit of 50 items', () => {
      const existingHistory: HistoryEntry[] = Array.from(
        { length: 50 },
        (_, i) => ({
          url: `https://example${i}.com`,
          name: `Example ${i}`,
        }),
      );

      const state: BrowserState = {
        ...initialState,
        history: existingHistory,
      };

      const newEntry: HistoryEntry = {
        url: 'https://metamask.io',
        name: 'MetaMask',
      };

      const action = {
        type: BrowserActionTypes.ADD_TO_BROWSER_HISTORY,
        url: newEntry.url,
        name: newEntry.name,
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.history.length).toBe(50);
      expect(newState.history[0]).toEqual(existingHistory[1]);
      expect(newState.history[49]).toEqual(newEntry);
    });

    it('should add multiple history entries', () => {
      const state: BrowserState = {
        ...initialState,
        history: [{ url: 'https://ethereum.org', name: 'Ethereum' }],
      };

      const action = {
        type: BrowserActionTypes.ADD_TO_BROWSER_HISTORY,
        url: 'https://metamask.io',
        name: 'MetaMask',
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.history.length).toBe(2);
      expect(newState.history[1]).toEqual({
        url: 'https://metamask.io',
        name: 'MetaMask',
      });
    });
  });

  describe('ADD_TO_BROWSER_WHITELIST', () => {
    it('should add a URL to the whitelist', () => {
      const url = 'https://metamask.io';
      const action = {
        type: BrowserActionTypes.ADD_TO_BROWSER_WHITELIST,
        url,
      } as const;

      const newState = browserReducer(initialState, action);

      expect(newState.whitelist).toEqual([url]);
    });

    it('should add multiple URLs to the whitelist', () => {
      const state: BrowserState = {
        ...initialState,
        whitelist: ['https://ethereum.org'],
      };

      const action = {
        type: BrowserActionTypes.ADD_TO_BROWSER_WHITELIST,
        url: 'https://metamask.io',
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.whitelist).toEqual([
        'https://ethereum.org',
        'https://metamask.io',
      ]);
    });

    it('should allow duplicate URLs in whitelist', () => {
      const state: BrowserState = {
        ...initialState,
        whitelist: ['https://metamask.io'],
      };

      const action = {
        type: BrowserActionTypes.ADD_TO_BROWSER_WHITELIST,
        url: 'https://metamask.io',
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.whitelist).toEqual([
        'https://metamask.io',
        'https://metamask.io',
      ]);
    });
  });

  describe('CLEAR_BROWSER_HISTORY', () => {
    it('should clear history and favicons', () => {
      const state: BrowserState = {
        ...initialState,
        history: [{ url: 'https://metamask.io', name: 'MetaMask' }],
        favicons: [{ origin: 'https://metamask.io', url: 'favicon.png' }],
        tabs: [{ id: 123, url: 'https://example.com' }],
        activeTab: 123,
      };

      const id = Date.now();
      const action = {
        type: BrowserActionTypes.CLEAR_BROWSER_HISTORY,
        id,
        metricsEnabled: true,
        marketingEnabled: false,
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.history).toEqual([]);
      expect(newState.favicons).toEqual([]);
      expect(newState.tabs.length).toBe(1);
      expect(newState.activeTab).toBe(id);
    });

    it('should create new tab with correct URL params', () => {
      const id = Date.now();
      const action = {
        type: BrowserActionTypes.CLEAR_BROWSER_HISTORY,
        id,
        metricsEnabled: true,
        marketingEnabled: false,
      } as const;

      const newState = browserReducer(initialState, action);

      expect(newState.tabs[0].id).toBe(id);
      expect(newState.tabs[0].url).toContain('portfolio.metamask.io/explore');
      expect(newState.tabs[0].url).toContain('metricsEnabled=true');
      expect(newState.tabs[0].url).toContain('marketingEnabled=false');
    });

    it('should handle different metrics and marketing settings', () => {
      const id = Date.now();
      const action = {
        type: BrowserActionTypes.CLEAR_BROWSER_HISTORY,
        id,
        metricsEnabled: false,
        marketingEnabled: true,
      } as const;

      const newState = browserReducer(initialState, action);

      expect(newState.tabs[0].url).toContain('metricsEnabled=false');
      expect(newState.tabs[0].url).toContain('marketingEnabled=true');
    });
  });

  describe('CLOSE_ALL_TABS', () => {
    it('should close all tabs', () => {
      const state: BrowserState = {
        ...initialState,
        tabs: [
          { id: 1, url: 'https://metamask.io' },
          { id: 2, url: 'https://ethereum.org' },
        ],
        activeTab: 1,
      };

      const action = {
        type: BrowserActionTypes.CLOSE_ALL_TABS,
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.tabs).toEqual([]);
      expect(newState.activeTab).toBe(1);
    });

    it('should not affect other state properties', () => {
      const state: BrowserState = {
        ...initialState,
        tabs: [{ id: 1, url: 'https://metamask.io' }],
        history: [{ url: 'https://metamask.io', name: 'MetaMask' }],
        whitelist: ['https://metamask.io'],
      };

      const action = {
        type: BrowserActionTypes.CLOSE_ALL_TABS,
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.tabs).toEqual([]);
      expect(newState.history).toEqual(state.history);
      expect(newState.whitelist).toEqual(state.whitelist);
    });
  });

  describe('CREATE_NEW_TAB', () => {
    it('should create a new tab', () => {
      const id = Date.now();
      const action = {
        type: BrowserActionTypes.CREATE_NEW_TAB,
        url: 'https://metamask.io',
        id,
      } as const;

      const newState = browserReducer(initialState, action);

      expect(newState.tabs.length).toBe(1);
      expect(newState.tabs[0]).toEqual({
        url: 'https://metamask.io',
        id,
      });
    });

    it('should create a new tab with linkType', () => {
      const id = Date.now();
      const action = {
        type: BrowserActionTypes.CREATE_NEW_TAB,
        url: 'https://metamask.io',
        linkType: 'external',
        id,
      } as const;

      const newState = browserReducer(initialState, action);

      expect(newState.tabs[0]).toEqual({
        url: 'https://metamask.io',
        linkType: 'external',
        id,
      });
    });

    it('should add tab to existing tabs', () => {
      const state: BrowserState = {
        ...initialState,
        tabs: [{ id: 1, url: 'https://ethereum.org' }],
      };

      const id = Date.now();
      const action = {
        type: BrowserActionTypes.CREATE_NEW_TAB,
        url: 'https://metamask.io',
        id,
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.tabs.length).toBe(2);
      expect(newState.tabs[1].id).toBe(id);
    });

    it('should not include linkType if not provided', () => {
      const id = Date.now();
      const action = {
        type: BrowserActionTypes.CREATE_NEW_TAB,
        url: 'https://metamask.io',
        id,
      } as const;

      const newState = browserReducer(initialState, action);

      expect(newState.tabs[0]).not.toHaveProperty('linkType');
    });
  });

  describe('CLOSE_TAB', () => {
    it('should close a specific tab', () => {
      const state: BrowserState = {
        ...initialState,
        tabs: [
          { id: 1, url: 'https://metamask.io' },
          { id: 2, url: 'https://ethereum.org' },
        ],
      };

      const action = {
        type: BrowserActionTypes.CLOSE_TAB,
        id: 1,
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.tabs.length).toBe(1);
      expect(newState.tabs[0].id).toBe(2);
    });

    it('should handle closing non-existent tab', () => {
      const state: BrowserState = {
        ...initialState,
        tabs: [{ id: 1, url: 'https://metamask.io' }],
      };

      const action = {
        type: BrowserActionTypes.CLOSE_TAB,
        id: 999,
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.tabs).toEqual(state.tabs);
    });

    it('should close last remaining tab', () => {
      const state: BrowserState = {
        ...initialState,
        tabs: [{ id: 1, url: 'https://metamask.io' }],
      };

      const action = {
        type: BrowserActionTypes.CLOSE_TAB,
        id: 1,
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.tabs).toEqual([]);
    });
  });

  describe('SET_ACTIVE_TAB', () => {
    it('should set the active tab', () => {
      const action = {
        type: BrowserActionTypes.SET_ACTIVE_TAB,
        id: 123,
      } as const;

      const newState = browserReducer(initialState, action);

      expect(newState.activeTab).toBe(123);
    });

    it('should update existing active tab', () => {
      const state: BrowserState = {
        ...initialState,
        activeTab: 1,
      };

      const action = {
        type: BrowserActionTypes.SET_ACTIVE_TAB,
        id: 2,
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.activeTab).toBe(2);
    });

    it('should set active tab to null if id is null', () => {
      const state: BrowserState = {
        ...initialState,
        activeTab: 123,
      };

      const action = {
        type: BrowserActionTypes.SET_ACTIVE_TAB,
        id: null as any,
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.activeTab).toBe(null);
    });
  });

  describe('UPDATE_TAB', () => {
    it('should update tab with new data', () => {
      const state: BrowserState = {
        ...initialState,
        tabs: [
          { id: 1, url: 'https://metamask.io' },
          { id: 2, url: 'https://ethereum.org' },
        ],
      };

      const action = {
        type: BrowserActionTypes.UPDATE_TAB,
        id: 1,
        data: { url: 'https://updated.com' },
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.tabs[0].url).toBe('https://updated.com');
      expect(newState.tabs[1]).toEqual(state.tabs[1]);
    });

    it('should update tab with image data', () => {
      const state: BrowserState = {
        ...initialState,
        tabs: [{ id: 1, url: 'https://metamask.io' }],
      };

      const action = {
        type: BrowserActionTypes.UPDATE_TAB,
        id: 1,
        data: { image: 'screenshot.png' },
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.tabs[0].image).toBe('screenshot.png');
      expect(newState.tabs[0].url).toBe('https://metamask.io');
    });

    it('should update tab with isArchived flag', () => {
      const state: BrowserState = {
        ...initialState,
        tabs: [{ id: 1, url: 'https://metamask.io' }],
      };

      const action = {
        type: BrowserActionTypes.UPDATE_TAB,
        id: 1,
        data: { isArchived: true },
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.tabs[0].isArchived).toBe(true);
    });

    it('should update tab with multiple properties', () => {
      const state: BrowserState = {
        ...initialState,
        tabs: [{ id: 1, url: 'https://metamask.io' }],
      };

      const action = {
        type: BrowserActionTypes.UPDATE_TAB,
        id: 1,
        data: {
          url: 'https://updated.com',
          image: 'screenshot.png',
          isArchived: true,
        },
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.tabs[0]).toEqual({
        id: 1,
        url: 'https://updated.com',
        image: 'screenshot.png',
        isArchived: true,
      });
    });

    it('should not update non-matching tabs', () => {
      const state: BrowserState = {
        ...initialState,
        tabs: [
          { id: 1, url: 'https://metamask.io' },
          { id: 2, url: 'https://ethereum.org' },
        ],
      };

      const action = {
        type: BrowserActionTypes.UPDATE_TAB,
        id: 999,
        data: { url: 'https://updated.com' },
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.tabs).toEqual(state.tabs);
    });

    it('should preserve other tab properties when updating', () => {
      const state: BrowserState = {
        ...initialState,
        tabs: [
          { id: 1, url: 'https://metamask.io', linkType: 'external' },
        ],
      };

      const action = {
        type: BrowserActionTypes.UPDATE_TAB,
        id: 1,
        data: { image: 'screenshot.png' },
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.tabs[0]).toEqual({
        id: 1,
        url: 'https://metamask.io',
        linkType: 'external',
        image: 'screenshot.png',
      });
    });
  });

  describe('STORE_FAVICON_URL', () => {
    it('should store a favicon', () => {
      const action = {
        type: BrowserActionTypes.STORE_FAVICON_URL,
        origin: 'https://metamask.io',
        url: 'favicon.png',
      } as const;

      const newState = browserReducer(initialState, action);

      expect(newState.favicons).toEqual([
        { origin: 'https://metamask.io', url: 'favicon.png' },
      ]);
    });

    it('should add favicon to beginning of list', () => {
      const state: BrowserState = {
        ...initialState,
        favicons: [{ origin: 'https://ethereum.org', url: 'eth-favicon.png' }],
      };

      const action = {
        type: BrowserActionTypes.STORE_FAVICON_URL,
        origin: 'https://metamask.io',
        url: 'favicon.png',
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.favicons[0]).toEqual({
        origin: 'https://metamask.io',
        url: 'favicon.png',
      });
      expect(newState.favicons[1]).toEqual({
        origin: 'https://ethereum.org',
        url: 'eth-favicon.png',
      });
    });

    it('should respect favicon cache size limit', () => {
      const maxSize = AppConstants.FAVICON_CACHE_MAX_SIZE;
      const existingFavicons: Favicon[] = Array.from(
        { length: maxSize },
        (_, i) => ({
          origin: `https://example${i}.com`,
          url: `favicon${i}.png`,
        }),
      );

      const state: BrowserState = {
        ...initialState,
        favicons: existingFavicons,
      };

      const action = {
        type: BrowserActionTypes.STORE_FAVICON_URL,
        origin: 'https://metamask.io',
        url: 'favicon.png',
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.favicons.length).toBe(maxSize);
      expect(newState.favicons[0]).toEqual({
        origin: 'https://metamask.io',
        url: 'favicon.png',
      });
      expect(newState.favicons[maxSize - 1]).toEqual(existingFavicons[maxSize - 2]);
    });

    it('should handle duplicate origins', () => {
      const state: BrowserState = {
        ...initialState,
        favicons: [
          { origin: 'https://metamask.io', url: 'old-favicon.png' },
        ],
      };

      const action = {
        type: BrowserActionTypes.STORE_FAVICON_URL,
        origin: 'https://metamask.io',
        url: 'new-favicon.png',
      } as const;

      const newState = browserReducer(state, action);

      expect(newState.favicons.length).toBe(2);
      expect(newState.favicons[0]).toEqual({
        origin: 'https://metamask.io',
        url: 'new-favicon.png',
      });
    });
  });

  describe('Complex state transitions', () => {
    it('should handle multiple actions on the same state', () => {
      let state = initialState;

      state = browserReducer(state, {
        type: BrowserActionTypes.CREATE_NEW_TAB,
        url: 'https://metamask.io',
        id: 1,
      } as const);

      state = browserReducer(state, {
        type: BrowserActionTypes.SET_ACTIVE_TAB,
        id: 1,
      } as const);

      state = browserReducer(state, {
        type: BrowserActionTypes.ADD_TO_BROWSER_HISTORY,
        url: 'https://metamask.io',
        name: 'MetaMask',
      } as const);

      expect(state.tabs.length).toBe(1);
      expect(state.activeTab).toBe(1);
      expect(state.history.length).toBe(1);
    });

    it('should maintain immutability', () => {
      const action = {
        type: BrowserActionTypes.CREATE_NEW_TAB,
        url: 'https://metamask.io',
        id: Date.now(),
      } as const;

      const newState = browserReducer(initialState, action);

      expect(newState).not.toBe(initialState);
      expect(newState.tabs).not.toBe(initialState.tabs);
    });
  });
});
