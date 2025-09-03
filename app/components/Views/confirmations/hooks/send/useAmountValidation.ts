import { AccountInformation } from '@metamask/assets-controllers';
import { Hex } from '@metamask/utils';
import { useMemo } from 'react';
import { useSelector } from 'react-redux';

import { strings } from '../../../../../../locales/i18n';
import {
  hexToBN,
  isDecimal,
  toTokenMinimalUnit,
  toWei,
} from '../../../../../util/number';
import { selectAccounts } from '../../../../../selectors/accountTrackerController';
import { selectContractBalances } from '../../../../../selectors/tokenBalancesController';
import { AssetType } from '../../types/token';
import { isNativeToken } from '../../utils/generic';
import { useSendContext } from '../../context/send-context';

export interface ValidateAmountArgs {
  accounts: Record<Hex, AccountInformation>;
  amount?: string;
  asset?: AssetType;
  contractBalances: Record<Hex, Hex>;
  from: Hex;
}

/**
 * Validates the amount for a transaction by checking balance sufficiency and format
 * Handles both native tokens and ERC-20 tokens with appropriate balance checks
 * @param {ValidateAmountArgs} params - The validation parameters
 * @param {Record<Hex, AccountInformation>} params.accounts - Account information mapping
 * @param {string} params.amount - The amount to validate
 * @param {AssetType} params.asset - The asset being sent
 * @param {Record<Hex, Hex>} params.contractBalances - Token contract balances
 * @param {Hex} params.from - The sender's address
 * @returns {string|undefined} Error message if validation fails, undefined if valid
 */
export const validateAmountFn = ({
  accounts,
  amount,
  asset,
  contractBalances,
  from,
}: ValidateAmountArgs) => {
  if (!asset) {
    return;
  }
  if (amount === undefined || amount === null || amount === '') {
    return;
  }
  if (!isDecimal(amount) || Number(amount) < 0) {
    return strings('transaction.invalid_amount');
  }
  let weiValue;
  let weiBalance;
  if (isNativeToken(asset)) {
    const accountAddress = Object.keys(accounts).find(
      (address) => address.toLowerCase() === from.toLowerCase(),
    ) as Hex;
    const account = accounts[accountAddress];
    // toWei can throw error if input is not a number: Error: while converting number to string, invalid number value
    try {
      weiValue = toWei(amount);
    } catch (error) {
      return strings('transaction.invalid_amount');
    }
    weiBalance = hexToBN(account?.balance ?? '0');
  } else {
    weiValue = toTokenMinimalUnit(amount, asset.decimals);
    weiBalance = hexToBN(contractBalances[asset.address as Hex]);
  }
  if (weiBalance.cmp(weiValue) === -1) {
    return strings('transaction.insufficient');
  }
  return undefined;
};

/**
 * Custom hook that validates transaction amounts in the send flow
 * Provides real-time validation for both native and token transfers
 * @returns {Object} Object containing amountError string or undefined
 */
const useAmountValidation = () => {
  const accounts = useSelector(selectAccounts);
  const contractBalances = useSelector(selectContractBalances);
  const { asset, from, value } = useSendContext();

  const amountError = useMemo(
    () =>
      validateAmountFn({
        accounts,
        amount: value,
        asset,
        contractBalances,
        from: from as Hex,
      }),
    [accounts, asset, contractBalances, from, value],
  );

  return { amountError };
};

export default useAmountValidation;
