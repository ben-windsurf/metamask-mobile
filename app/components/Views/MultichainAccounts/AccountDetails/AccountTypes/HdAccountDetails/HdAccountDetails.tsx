import React from 'react';

import { BaseAccountDetails } from '../BaseAccountDetails';
import { InternalAccount } from '@metamask/keyring-internal-api';
import ExportCredentials from '../../components/ExportCredentials';
import SmartAccount from '../../components/SmartAccount';

interface HdAccountDetailsProps {
  account: InternalAccount;
}

/**
 * HdAccountDetails component displays account details for HD (Hierarchical Deterministic) accounts
 * Renders base account information along with export credentials and smart account features
 * @param {HdAccountDetailsProps} props - The component props
 * @param {InternalAccount} props.account - The HD account to display details for
 * @returns {JSX.Element} The rendered HD account details component
 */
export const HdAccountDetails = ({ account }: HdAccountDetailsProps) => (
  <BaseAccountDetails account={account}>
    <ExportCredentials account={account} />
    <SmartAccount account={account} />
  </BaseAccountDetails>
);
