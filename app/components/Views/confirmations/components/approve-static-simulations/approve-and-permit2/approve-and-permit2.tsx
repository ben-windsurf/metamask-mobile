import React from 'react';
import { View } from 'react-native';
import { TransactionMeta } from '@metamask/transaction-controller';

import { strings } from '../../../../../../../locales/i18n';
import { useStyles } from '../../../../../../component-library/hooks';
import { ApproveComponentIDs } from '../../../../../../../e2e/selectors/Confirmation/ConfirmationView.selectors';
import { useTransactionMetadataRequest } from '../../../hooks/transactions/useTransactionMetadataRequest';
import { useApproveTransactionData } from '../../../hooks/useApproveTransactionData';
import { useApproveTransactionActions } from '../../../hooks/useApproveTransactionActions';
import { TokenStandard } from '../../../types/token';
import InfoRow from '../../UI/info-row/info-row';
import Address from '../../UI/info-row/info-value/address';
import { Pill } from '../../UI/pill';
import { ApproveMethod } from '../../../types/approve';
import { EditSpendingCapButton } from '../../edit-spending-cap-button';
import styleSheet from '../shared-styles';

/**
 * ApproveAndPermit2 component displays approval transaction details for ERC20 and ERC721 tokens
 * Handles both approve and revoke operations, showing spending caps, spender information, and token details
 * Supports editing spending caps for ERC20 tokens and displays appropriate UI based on token standard
 * @returns {JSX.Element|null} The rendered approval component or null if token standard is not supported
 */
export const ApproveAndPermit2 = () => {
  const { styles } = useStyles(styleSheet, {});
  const {
    approveMethod,
    amount,
    decimals,
    isRevoke,
    tokenBalance,
    tokenId,
    tokenStandard,
    tokenSymbol,
    rawAmount,
    spender,
  } = useApproveTransactionData();
  const { onSpendingCapUpdate } = useApproveTransactionActions();

  const transactionMetadata =
    useTransactionMetadataRequest() as TransactionMeta;
  const isERC20 = tokenStandard === TokenStandard.ERC20;
  const isERC721 = tokenStandard === TokenStandard.ERC721;
  const shouldShow = isERC20 || isERC721;

  if (!shouldShow) {
    return null;
  }

  if (isRevoke) {
    return (
      <>
        <InfoRow
          label={
            isERC20 ? strings('confirm.spending_cap') : strings('confirm.nfts')
          }
        >
          <View style={styles.amountAndAddressContainer}>
            <Address
              address={transactionMetadata?.txParams?.to as string}
              chainId={transactionMetadata.chainId}
            />
          </View>
        </InfoRow>
        {isERC20 && (
          <InfoRow label={strings('confirm.permission_from')}>
            <Address
              address={spender ?? ''}
              chainId={transactionMetadata.chainId}
            />
          </InfoRow>
        )}
      </>
    );
  }

  return (
    <>
      <InfoRow
        label={
          isERC20
            ? strings('confirm.spending_cap')
            : strings('confirm.withdraw')
        }
      >
        <View style={styles.amountAndAddressContainer}>
          {isERC20 && (
            <EditSpendingCapButton
              spendingCapProps={{
                approveMethod: approveMethod as ApproveMethod,
                balance: tokenBalance ?? '0',
                decimals: decimals ?? 1,
                onSpendingCapUpdate,
                spendingCap: rawAmount ?? '',
                tokenSymbol,
              }}
            >
              <PillAndAddress
                amount={amount}
                isERC20
                tokenId={tokenId}
                transactionMetadata={transactionMetadata}
              />
            </EditSpendingCapButton>
          )}
          {!isERC20 && (
            <PillAndAddress
              isERC20={isERC20}
              tokenId={tokenId}
              transactionMetadata={transactionMetadata}
            />
          )}
        </View>
      </InfoRow>
      <InfoRow label={strings('confirm.spender')}>
        <Address
          address={spender ?? ''}
          chainId={transactionMetadata.chainId}
        />
      </InfoRow>
    </>
  );
};

interface PillAndAddressProps {
  amount?: string;
  isERC20: boolean;
  tokenId?: string;
  transactionMetadata: TransactionMeta;
}

/**
 * PillAndAddress component displays token amount/ID in a pill format alongside the contract address
 * Shows either token amount for ERC20 tokens or token ID for NFTs, with the target contract address
 * @param {PillAndAddressProps} props - The component props
 * @param {string} [props.amount] - Token amount for ERC20 tokens
 * @param {boolean} props.isERC20 - Whether the token is an ERC20 token
 * @param {string} [props.tokenId] - Token ID for NFT tokens
 * @param {TransactionMeta} props.transactionMetadata - Transaction metadata containing contract address and chain info
 * @returns {JSX.Element} The rendered pill and address component
 */
function PillAndAddress({
  amount,
  isERC20,
  tokenId,
  transactionMetadata,
}: PillAndAddressProps) {
  return (
    <>
      <Pill
        testID={ApproveComponentIDs.SPENDING_CAP_VALUE}
        text={isERC20 ? amount ?? '' : `#${tokenId}`}
      />
      <Address
        address={transactionMetadata?.txParams?.to as string}
        chainId={transactionMetadata.chainId}
      />
    </>
  );
}
