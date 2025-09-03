import {
  CHAIN_IDS,
  TransactionType,
  type TransactionParams,
} from '@metamask/transaction-controller';
import { Hex } from '@metamask/utils';
import { toHex } from '@metamask/controller-utils';
import { ParseOutput } from 'eth-url-parser';

import { selectConfirmationRedesignFlagsFromRemoteFeatureFlags } from '../../../../selectors/featureFlagController/confirmations';
import { addTransaction } from '../../../../util/transaction-controller';
import { generateTransferData } from '../../../../util/transactions';
import { safeToChecksumAddress } from '../../../../util/address';
import { getGlobalNetworkClientId } from '../../../../util/networks/global-network';
import { ETH_ACTIONS } from '../../../../constants/deeplinks';
import Engine from '../../../../core/Engine';
import Logger from '../../../../util/Logger';

export type DeeplinkRequest = ParseOutput & { origin: string };

const getNetworkClientIdForChainId = (chainId: Hex) => {
  const { NetworkController } = Engine.context;
  const selectedNetworkClientId = getGlobalNetworkClientId();
  try {
    return (
      NetworkController.findNetworkClientIdByChainId(chainId) ??
      selectedNetworkClientId
    );
  } catch {
    return selectedNetworkClientId;
  }
};

/**
 * Checks if a deeplink function is compatible with the redesigned confirmation flow
 * Evaluates feature flags to determine if the new confirmation UI should be used
 * @param {string} [functionName] - The name of the deeplink function to check (e.g., 'transfer', 'approve')
 * @returns {boolean} True if the function is compatible with redesigned confirmations, false otherwise
 */
export function isDeeplinkRedesignedConfirmationCompatible(
  functionName?: string,
) {
  const { RemoteFeatureFlagController } = Engine.context;
  const { remoteFeatureFlags } = RemoteFeatureFlagController.state;

  const confirmationRedesignFlags =
    selectConfirmationRedesignFlagsFromRemoteFeatureFlags(remoteFeatureFlags);

  switch (functionName) {
    case ETH_ACTIONS.TRANSFER: {
      return confirmationRedesignFlags.transfer;
    }
    case ETH_ACTIONS.APPROVE: {
      return false;
    }
    default: {
      return confirmationRedesignFlags.transfer;
    }
  }
}

// This will prevent back to back deeplink requests
// It will be removed once `DeeplinkManager.parse` is called once per request
let isAddingDeeplinkTransaction = false;

/**
 * Adds a transaction to the transaction controller based on deeplink parameters
 * Handles both native ETH transfers and ERC20 token transfers from deeplink requests
 * Prevents duplicate transactions through a temporary locking mechanism
 * @param {DeeplinkRequest} request - The deeplink request object
 * @param {string} [request.chain_id] - The blockchain network chain ID
 * @param {string} [request.function_name] - The function name (e.g., 'transfer')
 * @param {Object} [request.parameters] - Transaction parameters including addresses and amounts
 * @param {string} request.target_address - The target contract or recipient address
 * @param {string} request.origin - The origin of the deeplink request
 * @returns {Promise<void>} Promise that resolves when the transaction is added
 */
export async function addTransactionForDeeplink({
  chain_id,
  function_name,
  parameters,
  target_address,
  origin,
}: DeeplinkRequest) {
  const { AccountsController } = Engine.context;

  // Temporary solution for preventing back to back deeplink requests
  if (isAddingDeeplinkTransaction) {
    Logger.error(new Error('Cannot add another deeplink transaction'));
    return;
  }

  isAddingDeeplinkTransaction = true;

  const selectedAccountAddress =
    AccountsController.getSelectedAccount().address;

  let chainId: Hex;
  if (chain_id) {
    chainId = toHex(chain_id as string);
  } else {
    // Deeplinks are fallback to mainnet rather than the selected network
    chainId = CHAIN_IDS.MAINNET;
  }

  const networkClientId = getNetworkClientIdForChainId(chainId);
  const from = safeToChecksumAddress(selectedAccountAddress) as string;
  const to = safeToChecksumAddress(target_address);
  const checkSummedParamAddress = safeToChecksumAddress(
    parameters?.address ?? '',
  );

  if (function_name === ETH_ACTIONS.TRANSFER) {
    // ERC20 transfer
    const txParams: TransactionParams = {
      from,
      to,
      data: generateTransferData('transfer', {
        toAddress: checkSummedParamAddress,
        amount: toHex(parameters?.uint256 as string),
      }),
    };

    await addTransaction(txParams, {
      networkClientId,
      origin,
      type: TransactionType.tokenMethodTransfer,
    });
  } else {
    // Native transfer
    const txParams: TransactionParams = {
      from,
      to,
      value: toHex(parameters?.value as string),
    };

    await addTransaction(txParams, {
      networkClientId,
      origin,
      type: TransactionType.simpleSend,
    });
  }

  isAddingDeeplinkTransaction = false;
}
