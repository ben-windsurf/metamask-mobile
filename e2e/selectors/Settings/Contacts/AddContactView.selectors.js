import enContent from '../../../../locales/languages/en.json';

/**
 * Selector IDs for the Add Contact View screen elements.
 * Contains test automation identifiers for various UI components.
 */
export const AddContactViewSelectorsIDs = {
  ADD_BUTTON: 'add-contact-add-contact-button',
  ADDRESS_INPUT: 'add-contact-address-input',
  DELETE_BUTTON: 'add-contact-delete-contact-button',
  MEMO_INPUT: 'add-contact-memo-input',
  NAME_INPUT: 'add-contact-name-input',
  NETWORK_INPUT: 'add-contact-network-input',
  CONTAINER: 'add-contacts-screen',
  EDIT_BUTTON: 'edit-button',
};

/**
 * Text-based selectors for the Add Contact View screen elements.
 * Contains localized text strings used for element identification.
 */
export const AddContactViewSelectorsText = {
  EDIT_BUTTON: enContent.address_book.edit,
  EDIT_CONTACT: enContent.address_book.edit_contact,
  MEMO: enContent.address_book.memo,
};
