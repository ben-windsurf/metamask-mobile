import Routes from '../../../constants/navigation/Routes';
import { createNavigationDetails } from '../../../util/navigation/navUtils';
import { AccountConnectParams } from './AccountConnect.types';

export { default } from './AccountConnect';

/**
 * Creates navigation details for the Account Connect modal flow
 * Used to configure navigation parameters for connecting accounts to dApps
 * @returns {Object} Navigation details object containing modal and sheet route configuration
 */
export const createAccountConnectNavDetails =
  createNavigationDetails<AccountConnectParams>(
    Routes.MODAL.ROOT_MODAL_FLOW,
    Routes.SHEET.ACCOUNT_CONNECT,
  );
export type {
  AccountConnectProps,
  NetworkAvatarProps,
} from './AccountConnect.types';
