import enContent from '../../../locales/languages/en.json';

/**
 * Text selectors for contract approval bottom sheet elements.
 * Contains localized text strings used to identify UI elements during testing.
 */
export const ContractApprovalBottomSheetSelectorsText = {
  ADD_NICKNAME: enContent.nickname.add_nickname,
  EDIT_NICKNAME: enContent.nickname.edit_nickname,
  APPROVE: enContent.transactions.tx_review_approve,
  REJECT: enContent.transaction.reject,
  NEXT: enContent.transaction.next,
  CONFIRM: enContent.transaction.confirm,
};

/**
 * ID selectors for contract approval bottom sheet elements.
 * Contains test IDs used to identify UI elements during automated testing.
 */
export const ContractApprovalBottomSheetSelectorsIDs = {
  CONTAINER: 'approve-modal-test-id',
  CONTRACT_ADDRESS: 'contract-address',
  APPROVE_TOKEN_AMOUNT: 'custom-spend-cap-input-input-id',
};
