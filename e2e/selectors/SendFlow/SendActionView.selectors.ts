/**
 * Selector IDs for the Send Action View in end-to-end tests.
 * Contains test identifiers for various UI elements in the send flow.
 */
export const SendActionViewSelectorsIDs = {
  /** Input field for entering Solana address */
  SOLANA_INPUT_ADDRESS_FIELD: 'send-to-snap-ui-input',
  /** Input field for entering Solana amount */
  SOLANA_INPUT_AMOUNT_FIELD: 'send-amount-input-snap-ui-input',
  /** Error message displayed for invalid addresses */
  INVALID_ADDRESS_ERROR: 'helptext',
  /** Confirmation view for SOL transactions */
  SOL_CONFIRM_SEND_VIEW: 'snaps-ui-image',
  /** Button to submit/send the transaction */
  SEND_TRANSACTION_BUTTON:
    'transaction-confirmation-submit-button-snap-footer-button',
  /** Button to cancel the send transaction */
  CANCEL_SEND_TRANSACTION_BUTTON:
    'transaction-confirmation-cancel-button-snap-footer-button',
  /** Button to continue with the send flow */
  CONTINUE_BUTTON: 'send-submit-button-snap-footer-button',
  /** Button to cancel the send flow */
  CANCEL_BUTTON: 'send-cancel-button-snap-footer-button',
  /** Button to close the send view */
  CLOSE_BUTTON: 'default-snap-footer-button',
};
