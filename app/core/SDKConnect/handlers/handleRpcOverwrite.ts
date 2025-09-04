import { RPC_METHODS } from '../SDKConnectConstants';
import DevLogger from '../utils/DevLogger';

/**
 * Overwrites RPC method parameters with the selected account address and chain ID.
 * Handles specific RPC methods like personal_sign, eth_sendTransaction, and eth_signTypedData variants
 * by modifying their parameters to use the currently selected account and chain.
 *
 * @param params - The parameters object
 * @param params.rpc - The RPC request object containing method and parameters
 * @param params.accountAddress - The currently selected account address to use
 * @param params.selectedChainId - The currently selected chain ID to use
 * @returns The modified RPC object with updated parameters
 */
export const overwriteRPCWith = ({
  rpc,
  accountAddress,
  selectedChainId,
}: {
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  rpc: { method: string; params: any; [key: string]: any };
  accountAddress: string;
  selectedChainId: string;
}) => {
  DevLogger.log(`overwriteRPCWith:: method=${rpc?.method}`, rpc);
  // Handle
  if (rpc.method.toLowerCase() === RPC_METHODS.PERSONAL_SIGN.toLowerCase()) {
    // Replace address value with the selected address
    rpc.params = [rpc.params[0], accountAddress];
  } else if (
    rpc.method.toLowerCase() === RPC_METHODS.ETH_SENDTRANSACTION.toLowerCase()
  ) {
    const originalParams = rpc.params[0];
    const { from, ...rest } = originalParams;
    rpc.params = [{ ...rest, from: accountAddress }];
  } else if (
    rpc.method.toLowerCase() === RPC_METHODS.ETH_SIGNTYPEDEATA.toLowerCase()
  ) {
    const originalParams = rpc.params[1];
    // overwrite domain.chainId
    originalParams.domain.chainId = selectedChainId;
    rpc.params = [accountAddress, originalParams];
  } else if (
    [
      RPC_METHODS.ETH_SIGNTYPEDEATAV4.toLowerCase(),
      RPC_METHODS.ETH_SIGNTYPEDEATAV3.toLowerCase(),
    ].includes(rpc.method.toLowerCase())
  ) {
    const originalParams = rpc.params[1];
    // overwrite domain.chainId
    originalParams.domain.chainId = selectedChainId;
    rpc.params = [accountAddress, JSON.stringify(originalParams)];
  } else {
    DevLogger.log(`overwriteRPCWith:: method=${rpc.method} not handled`);
  }

  return rpc;
};

export default overwriteRPCWith;
