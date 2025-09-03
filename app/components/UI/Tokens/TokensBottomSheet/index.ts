/**
 * Navigation utilities for token bottom sheet components
 * Provides navigation details for token sorting and filtering bottom sheets
 */
import Routes from '../../../../constants/navigation/Routes';
import { createNavigationDetails } from '../../../../util/navigation/navUtils';

/**
 * Creates navigation details for the token sort bottom sheet
 * @returns {Object} Navigation details for token sorting modal
 */
export const createTokensBottomSheetNavDetails = createNavigationDetails(
  Routes.MODAL.ROOT_MODAL_FLOW,
  Routes.SHEET.TOKEN_SORT,
);

/**
 * Creates navigation details for the token filter bottom sheet
 * @returns {Object} Navigation details for token filtering modal
 */
export const createTokenBottomSheetFilterNavDetails = createNavigationDetails(
  Routes.MODAL.ROOT_MODAL_FLOW,
  Routes.SHEET.TOKEN_FILTER,
);

export { TokenSortBottomSheet } from './TokenSortBottomSheet';
export { TokenFilterBottomSheet } from './TokenFilterBottomSheet';
