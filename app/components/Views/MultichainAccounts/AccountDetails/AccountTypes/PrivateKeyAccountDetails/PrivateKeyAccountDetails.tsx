import React from 'react';
import { InternalAccount } from '@metamask/keyring-internal-api';
import { BaseAccountDetails } from '../BaseAccountDetails';
import RemoveAccount from '../../components/RemoveAccount';
import ExportCredentials from '../../components/ExportCredentials';
import SmartAccount from '../../components/SmartAccount';

interface PrivateKeyAccountDetailsProps {
  account: InternalAccount;
}

/**
 * PrivateKeyAccountDetails component displays account management options for private key accounts
 * Renders account details with options to export credentials, manage smart account features, and remove the account
 * @param {PrivateKeyAccountDetailsProps} props - Component props
 * @param {InternalAccount} props.account - The private key account to display details for
 * @returns {JSX.Element} The rendered private key account details component
 */
export const PrivateKeyAccountDetails = ({
  account,
}: PrivateKeyAccountDetailsProps) => (
  <BaseAccountDetails account={account}>
    <ExportCredentials account={account} />
    <SmartAccount account={account} />
    <RemoveAccount account={account} />
  </BaseAccountDetails>
);
