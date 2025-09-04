/**
 * Selector IDs for the Send Link View screen in end-to-end tests.
 * Contains element identifiers used for automated testing of the send link functionality.
 */
export const SendLinkViewSelectorsIDs = {
  /** Main container element for the send link screen */
  CONTAINER_ID: 'send-link-screen',
  /** Button to display QR code for payment request */
  QR_CODE_BUTTON: 'request-qrcode-button',
  /** Modal dialog containing the payment request QR code */
  QR_MODAL: 'payment-request-qrcode',
  /** Button to close the QR code modal dialog */
  CLOSE_QR_MODAL_BUTTON: 'payment-request-qrcode-close-button',
  /** Button to close the send link view screen */
  CLOSE_SEND_LINK_VIEW_BUTTON: 'send-link-close-button',
} as const;
