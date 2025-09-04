import enContent from '../../../locales/languages/en.json';

/**
 * Text selectors for the Network List Modal component.
 * Contains localized text strings used to identify UI elements in end-to-end tests.
 */
export const NetworkListModalSelectorsText = {
  SELECT_NETWORK: enContent.networks.select_network,
  DELETE_NETWORK: enContent.app_settings.delete,
  ADD_POPULAR_NETWORK_BUTTON: enContent.networks.add,
};

/**
 * ID selectors for the Network List Modal component.
 * Contains test IDs and element identifiers used to locate UI elements in end-to-end tests.
 */
export const NetworkListModalSelectorsIDs = {
  SCROLL: 'other-networks-scroll',
  TEST_NET_TOGGLE: 'test-network-switch-id',
  DELETE_NETWORK: 'delete-network-button',
  OTHER_LIST: 'other-network-name',
  ADD_BUTTON: 'add-network-button',
  TOOLTIP: 'popular-networks-information-tooltip',
  CUSTOM_NETWORK_CELL: (customNetwork: string) =>
    `network-cell-${customNetwork}`,
};
