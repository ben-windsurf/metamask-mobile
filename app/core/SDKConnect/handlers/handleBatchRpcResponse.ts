import BackgroundBridge from '../../BackgroundBridge/BackgroundBridge';
import BatchRPCManager, { BatchRPCState } from '../BatchRPCManager';
import DevLogger from '../utils/DevLogger';
import { wait } from '../utils/wait.util';

/**
 * Handles batch RPC response processing for SDK Connect.
 * Manages the sequential execution of batched RPC calls and aggregates responses.
 *
 * @param params - Configuration object for batch RPC response handling
 * @param params.chainRpcs - Current state of the batch RPC chain
 * @param params.batchRPCManager - Manager instance for batch RPC operations
 * @param params.backgroundBridge - Optional background bridge for message handling
 * @param params.msg - The RPC response message to process
 * @param params.sendMessage - Function to send messages back to the client
 * @returns Promise that resolves to true if this was the last RPC or an error occurred
 *
 * @example
 * ```typescript
 * const isComplete = await handleBatchRpcResponse({
 *   chainRpcs: batchState,
 *   batchRPCManager: manager,
 *   backgroundBridge: bridge,
 *   msg: responseMessage,
 *   sendMessage: ({ msg }) => sendToClient(msg)
 * });
 * ```
 */
export const handleBatchRpcResponse = async ({
  chainRpcs,
  batchRPCManager,
  backgroundBridge,
  msg,
  sendMessage,
}: {
  chainRpcs: BatchRPCState;
  batchRPCManager: BatchRPCManager;
  backgroundBridge?: BackgroundBridge;
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendMessage: ({ msg }: { msg: any }) => Promise<void>;
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  msg: any;
}): Promise<boolean> => {
  const isLastRpc = chainRpcs.index === chainRpcs.rpcs.length - 1;
  const hasError = !!msg?.data?.error;
  const origRpcId = parseInt(chainRpcs.baseId);
  const result = chainRpcs.rpcs
    .filter((rpc) => rpc.response !== undefined)
    .map((rpc) => rpc.response);
  result.push(msg?.data?.result);

  DevLogger.log(
    `handleBatchRpcResponse origRpcId=${origRpcId} isLastRpc=${isLastRpc} hasError=${hasError}`,
    chainRpcs,
  );

  if (hasError) {
    // Cancel the whole chain if any of the rpcs fails, send previous responses with current error
    const data = {
      id: `${origRpcId}`,
      jsonrpc: '2.0',
      result,
      error: msg?.data?.error,
    };
    const response = {
      data,
      name: 'metamask-provider',
    };

    // Delete the chain from the chainRPCManager
    batchRPCManager.remove(chainRpcs.baseId);

    await sendMessage({ msg: response });
  } else if (isLastRpc) {
    // Respond to the original rpc call with the list of responses append the current response
    DevLogger.log(
      `handleChainRpcResponse id=${chainRpcs.baseId} result`,
      result,
    );
    const data = {
      id: `${origRpcId}`,
      jsonrpc: '2.0',
      result,
    };
    const response = {
      data,
      name: 'metamask-provider',
    };

    //  all batch have been handled can remove from the batch manager before processing it
    batchRPCManager.remove(chainRpcs.baseId);

    // Process the reponse as a normal rpc call
    await sendMessage({ msg: response });
  } else {
    // Save response and send the next rpc method
    batchRPCManager.addResponse({
      id: chainRpcs.baseId,
      index: chainRpcs.index,
      response: msg?.data?.result,
    });

    // wait 500ms before sending the next rpc method To give user time to process UI feedbacks
    await wait(500);

    // Send the next rpc method to the background bridge
    const nextRpc = chainRpcs.rpcs[chainRpcs.index + 1];
    nextRpc.id = chainRpcs.baseId + `_${chainRpcs.index + 1}`; // Add index to id to keep track of the order
    nextRpc.jsonrpc = '2.0';
    DevLogger.log(
      `handleChainRpcResponse method=${nextRpc.method} id=${nextRpc.id}`,
      nextRpc.params,
    );

    backgroundBridge?.onMessage({
      name: 'metamask-provider',
      data: nextRpc,
      origin: 'sdk',
    });
  }
  return isLastRpc || hasError;
};

export default handleBatchRpcResponse;
