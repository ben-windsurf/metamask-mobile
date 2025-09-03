/**
 * Toggles the network selection modal visibility
 * @param {boolean} shouldNetworkSwitchPopToWallet - Whether to pop to wallet view after network switch
 * @returns {Object} Redux action object with type and shouldNetworkSwitchPopToWallet flag
 */
export function toggleNetworkModal(shouldNetworkSwitchPopToWallet = true) {
  return {
    type: 'TOGGLE_NETWORK_MODAL',
    shouldNetworkSwitchPopToWallet,
  };
}

/**
 * Toggles the collectible contract modal visibility
 * @returns {Object} Redux action object with type TOGGLE_COLLECTIBLE_CONTRACT_MODAL
 */
export function toggleCollectibleContractModal() {
  return {
    type: 'TOGGLE_COLLECTIBLE_CONTRACT_MODAL',
  };
}

/**
 * Toggles the dApp transaction modal visibility
 * @param {boolean} show - Whether to show or hide the modal
 * @returns {Object} Redux action object with type and show flag
 */
export function toggleDappTransactionModal(show) {
  return {
    type: 'TOGGLE_DAPP_TRANSACTION_MODAL',
    show,
  };
}

/**
 * Toggles the network information modal visibility
 * @param {boolean} show - Whether to show or hide the modal
 * @returns {Object} Redux action object with type and show flag
 */
export function toggleInfoNetworkModal(show) {
  return {
    type: 'TOGGLE_INFO_NETWORK_MODAL',
    show,
  };
}

/**
 * Toggles the signature modal visibility
 * @param {boolean} show - Whether to show or hide the modal
 * @returns {Object} Redux action object with type and show flag
 */
export function toggleSignModal(show) {
  return {
    type: 'TOGGLE_SIGN_MODAL',
    show,
  };
}
