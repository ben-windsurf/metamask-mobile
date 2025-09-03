import React from 'react';
import { InternalAccount } from '@metamask/keyring-internal-api';
import { BaseAccountDetails } from '../BaseAccountDetails';
import RemoveAccount from '../../components/RemoveAccount';
import SmartAccount from '../../components/SmartAccount';

interface HardwareAccountDetailsProps {
  account: InternalAccount;
}

/**
 * HardwareAccountDetails component displays account details for hardware wallet accounts
 * Renders account information with smart account features and removal options
 * Used in the multichain account management interface for hardware-connected accounts
 * @param {HardwareAccountDetailsProps} props - Component props
 * @param {InternalAccount} props.account - The hardware account to display details for
 * @returns {JSX.Element} The rendered hardware account details component
 */
export const HardwareAccountDetails = ({
  account,
}: HardwareAccountDetailsProps) => (
  <BaseAccountDetails account={account}>
    <SmartAccount account={account} />
    <RemoveAccount account={account} />
  </BaseAccountDetails>
);
