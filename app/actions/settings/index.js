/**
 * Sets the search engine preference in the application settings
 * @param {string} searchEngine - The search engine to set as default
 * @returns {Object} Redux action object with type and searchEngine payload
 */
export function setSearchEngine(searchEngine) {
  return {
    type: 'SET_SEARCH_ENGINE',
    searchEngine,
  };
}

/**
 * Sets the preference for showing hexadecimal data in transactions
 * @param {boolean} showHexData - Whether to show hex data in transaction details
 * @returns {Object} Redux action object with type and showHexData payload
 */
export function setShowHexData(showHexData) {
  return {
    type: 'SET_SHOW_HEX_DATA',
    showHexData,
  };
}

/**
 * Sets the preference for showing custom nonce field in transactions
 * @param {boolean} showCustomNonce - Whether to show custom nonce input in transaction forms
 * @returns {Object} Redux action object with type and showCustomNonce payload
 */
export function setShowCustomNonce(showCustomNonce) {
  return {
    type: 'SET_SHOW_CUSTOM_NONCE',
    showCustomNonce,
  };
}

/**
 * Sets the preference for displaying fiat currency values on test networks
 * @param {boolean} showFiatOnTestnets - Whether to show fiat values on testnets
 * @returns {Object} Redux action object with type and showFiatOnTestnets payload
 */
export function setShowFiatOnTestnets(showFiatOnTestnets) {
  return {
    type: 'SET_SHOW_FIAT_ON_TESTNETS',
    showFiatOnTestnets,
  };
}

/**
 * Sets the preference for hiding tokens with zero balance from the token list
 * @param {boolean} hideZeroBalanceTokens - Whether to hide tokens with zero balance
 * @returns {Object} Redux action object with type and hideZeroBalanceTokens payload
 */
export function setHideZeroBalanceTokens(hideZeroBalanceTokens) {
  return {
    type: 'SET_HIDE_ZERO_BALANCE_TOKENS',
    hideZeroBalanceTokens,
  };
}

/**
 * Sets the auto-lock timeout duration for the application
 * @param {number} lockTime - Time in milliseconds before the app auto-locks
 * @returns {Object} Redux action object with type and lockTime payload
 */
export function setLockTime(lockTime) {
  return {
    type: 'SET_LOCK_TIME',
    lockTime,
  };
}

/**
 * Sets the primary currency for displaying balances and values
 * @param {string} primaryCurrency - The currency code to use as primary (e.g., 'ETH', 'USD')
 * @returns {Object} Redux action object with type and primaryCurrency payload
 */
export function setPrimaryCurrency(primaryCurrency) {
  return {
    type: 'SET_PRIMARY_CURRENCY',
    primaryCurrency,
  };
}

export function setUseBlockieIcon(useBlockieIcon) {
  return {
    type: 'SET_USE_BLOCKIE_ICON',
    useBlockieIcon,
  };
}

export function toggleBasicFunctionality(basicFunctionalityEnabled) {
  return {
    type: 'TOGGLE_BASIC_FUNCTIONALITY',
    basicFunctionalityEnabled,
  };
}

export function toggleDeviceNotification(deviceNotificationEnabled) {
  return {
    type: 'TOGGLE_DEVICE_NOTIFICATIONS',
    deviceNotificationEnabled,
  };
}

export function setTokenSortConfig(tokenSortConfig) {
  return {
    type: 'SET_TOKEN_SORT_CONFIG',
    tokenSortConfig,
  };
}

export function setDeepLinkModalDisabled(deepLinkModalDisabled) {
  return {
    type: 'SET_DEEP_LINK_MODAL_DISABLED',
    deepLinkModalDisabled,
  };
}
