import AppConstants from '../../../../../../core/AppConstants';

/**
 * Deeplink origin constants extracted from AppConstants for transaction approval flows
 * Used to identify the source of transaction requests in the approval header
 */
export const { ORIGIN_DEEPLINK, ORIGIN_QR_CODE } = AppConstants.DEEPLINKS;

/**
 * Test ID constant for the approve transaction origin pill component
 * Used for UI testing and component identification in transaction approval flows
 */
export const APPROVE_TRANSACTION_ORIGIN_PILL =
  'approve_transaction_origin_pill';
