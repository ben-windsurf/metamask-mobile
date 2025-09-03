import Routes from '../../../constants/navigation/Routes';
import { createNavigationDetails } from '../../../util/navigation/navUtils';
import { AccountSelectorParams } from './AccountSelector.types';

/**
 * Creates navigation details for the Account Selector modal
 * Used to navigate to the account selection sheet within the modal flow
 * @returns {Object} Navigation details object for the Account Selector
 */
export const createAccountSelectorNavDetails =
  createNavigationDetails<AccountSelectorParams>(
    Routes.MODAL.ROOT_MODAL_FLOW,
    Routes.SHEET.ACCOUNT_SELECTOR,
  );
export { default } from './AccountSelector';
