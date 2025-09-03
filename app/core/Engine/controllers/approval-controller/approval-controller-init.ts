import { ApprovalController } from '@metamask/approval-controller';
import { ApprovalType } from '@metamask/controller-utils';

import Logger from '../../../../util/Logger';
import { ApprovalTypes } from '../../../RPCMethods/RPCMethodMiddleware';
import { type ApprovalControllerMessenger } from '../../messengers/approval-controller-messenger';
import type { ControllerInitFunction } from '../../types';

/**
 * Initializes the ApprovalController for managing user approval requests in MetaMask Mobile
 * Configures the controller with rate limiting exclusions for transactions and smart transactions
 * @param {Object} request - Controller initialization request containing messenger and configuration
 * @param {ApprovalControllerMessenger} request.controllerMessenger - Messenger for controller communication
 * @returns {Object} Object containing the initialized ApprovalController instance
 * @throws {Error} Throws error if controller initialization fails
 */
export const ApprovalControllerInit: ControllerInitFunction<
  ApprovalController,
  ApprovalControllerMessenger
> = (request) => {
  const { controllerMessenger } = request;

  try {
    const approvalController = new ApprovalController({
      messenger: controllerMessenger,
      showApprovalRequest: () => undefined,
      typesExcludedFromRateLimiting: [
        ApprovalType.Transaction,
        ApprovalType.WatchAsset,
        ApprovalTypes.SMART_TRANSACTION_STATUS,
      ],
    });

    return { controller: approvalController };
  } catch (error) {
    Logger.error(error as Error, 'Failed to initialize ApprovalController');
    throw error;
  }
};
