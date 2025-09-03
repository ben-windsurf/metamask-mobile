import React from 'react';
import { InternalAccount } from '@metamask/keyring-internal-api';
import { isHDOrFirstPartySnapAccount } from '../../../../../../util/address';
import { BaseAccountDetails } from '../BaseAccountDetails';
import ExportCredentials from '../../components/ExportCredentials';
import RemoveAccount from '../../components/RemoveAccount';

interface SnapAccountDetailsProps {
  account: InternalAccount;
}

/**
 * SnapAccountDetails component displays account details for Snap-based accounts
 * Shows export credentials for first-party Snaps and remove account option for removable accounts
 * Renders different action buttons based on whether the account is a first-party Snap or removable
 * @param {SnapAccountDetailsProps} props - The component props
 * @param {InternalAccount} props.account - The Snap account to display details for
 * @returns {JSX.Element} The rendered Snap account details component
 */
export const SnapAccountDetails = ({ account }: SnapAccountDetailsProps) => {
  const isFirstPartySnap = isHDOrFirstPartySnapAccount(account);
  const isRemovable = !isFirstPartySnap;

  return (
    <BaseAccountDetails account={account}>
      {isFirstPartySnap && <ExportCredentials account={account} />}
      {isRemovable && <RemoveAccount account={account} />}
    </BaseAccountDetails>
  );
};
