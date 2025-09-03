import React from 'react';
import { useSelector } from 'react-redux';
import { BaseWalletDetails } from './BaseWalletDetails';
import { selectWalletById } from '../../../../multichain-accounts/selectors/accountTreeController';
import { AccountWalletId } from '@metamask/account-api';

interface WalletDetailsProps {
  route: {
    params: {
      walletId: AccountWalletId;
    };
  };
}

/**
 * WalletDetails component displays detailed information for a specific wallet
 * Retrieves wallet data by ID and renders it using the BaseWalletDetails component
 * Returns null if the wallet is not found, providing graceful error handling
 * @param {WalletDetailsProps} props - Component props containing route parameters
 * @param {Object} props.route - Navigation route object
 * @param {Object} props.route.params - Route parameters
 * @param {AccountWalletId} props.route.params.walletId - The ID of the wallet to display
 * @returns {JSX.Element | null} The wallet details component or null if wallet not found
 */
export const WalletDetails = (props: WalletDetailsProps) => {
  const { walletId } = props.route.params;
  const selectWallet = useSelector(selectWalletById);
  const wallet = selectWallet?.(walletId);

  if (!wallet) {
    return null;
  }

  return <BaseWalletDetails wallet={wallet} />;
};
