import {
  BrowserTab,
  BrowserHistoryItem,
  FaviconItem,
} from '../../actions/browser/types';

export interface BrowserState {
  history: BrowserHistoryItem[];
  whitelist: string[];
  tabs: BrowserTab[];
  favicons: FaviconItem[];
  activeTab: number | null;
  visitedDappsByHostname: Record<string, boolean>;
}
