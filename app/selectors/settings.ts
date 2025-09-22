import { RootState } from '../reducers';
import { createSelector } from 'reselect';
import { createDeepEqualSelector } from './util';

const selectSettings = (state: RootState) => state.settings;

export const selectShowFiatInTestnets = createSelector(
  selectSettings,
  (settingsState) =>
    (settingsState as unknown as Record<string, unknown>)
      .showFiatOnTestnets as boolean,
);

export const selectPrimaryCurrency = createSelector(
  selectSettings,
  (settingsState) => settingsState.primaryCurrency,
);
export const selectShowCustomNonce = createSelector(
  selectSettings,
  (settingsState) =>
    (settingsState as unknown as Record<string, unknown>).showCustomNonce,
);

export const selectBasicFunctionalityEnabled = createSelector(
  selectSettings,
  (settingsState) => settingsState.basicFunctionalityEnabled as boolean,
);

export const selectHideZeroBalanceTokens = createSelector(
  selectSettings,
  (settingsState) => Boolean(settingsState.hideZeroBalanceTokens),
);

export const selectDeepLinkModalDisabled = createSelector(
  selectSettings,
  (settingsState) => Boolean(settingsState.deepLinkModalDisabled),
);

export const selectUseBlockieIcon = createDeepEqualSelector(
  selectSettings,
  (settingsState) => Boolean(settingsState.useBlockieIcon),
);
