import { useMemo } from 'react';
import { useAccounts } from '../../../hooks/useAccounts';
import { Account } from './../../../hooks/useAccounts/useAccounts.types';

/**
 * Custom hook to get the currently selected account from the accounts list
 * @returns {Account | undefined} The selected account object, or undefined if no account is selected
 */
const useSelectedAccount = (): Account | undefined => {
  const { evmAccounts: accounts } = useAccounts();

  const selectedAccount = useMemo(
    () => accounts.find((account: Account) => account.isSelected),
    [accounts],
  );

  return selectedAccount;
};

export default useSelectedAccount;
