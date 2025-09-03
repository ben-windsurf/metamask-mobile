import { Caveat, ValidPermission } from '@metamask/permission-controller';
import { Json } from '@metamask/utils';

/**
 * Extracts approved account addresses from a WalletConnect permission object
 * Used to determine which accounts have been approved for a WalletConnect session
 * @param {ValidPermission<any, Caveat<any, any> | Caveat<any, Json>> | undefined} accountPermission - The account permission object containing caveats with approved accounts
 * @returns {string[]} Array of approved account addresses
 */
export const extractApprovedAccounts = (
  accountPermission: // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ValidPermission<any, Caveat<any, any> | Caveat<any, Json>> | undefined,
) => {
  const approvedAccounts = accountPermission?.caveats
    ?.map((caveat) => {
      if (Array.isArray(caveat?.value)) {
        return caveat.value;
      }
      return undefined;
    })
    .flat() as string[];
  return approvedAccounts;
};

export default extractApprovedAccounts;
