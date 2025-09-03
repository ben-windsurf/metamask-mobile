import { omit, pick } from 'lodash';
import approvalResult from './ApprovalResult';
import smartTransactionStatus from './SmartTransactionStatus';
import { ApprovalTypes } from '../../../../../../../../core/RPCMethods/RPCMethodMiddleware';
import { Actions } from '../TemplateConfirmation';
import { Colors } from '../../../../../../../../util/theme/models';
import { AcceptOptions, ApprovalRequest } from '@metamask/approval-controller';
import { TemplateRendererInput } from '../../../../../../../UI/TemplateRenderer/types';

export interface ConfirmationTemplateValues {
  cancelText?: string;
  confirmText?: string;
  content: TemplateRendererInput;
  hideCancelButton?: boolean;
  hideSubmitButton?: boolean;
  onCancel?: () => void;
  onConfirm?: (opts?: AcceptOptions) => void;
  loadingText?: string;
}

export interface ConfirmationTemplate {
  getValues: (
    // TODO: Replace "any" with type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pendingApproval: ApprovalRequest<any>,
    strings: (key: string) => string,
    actions: Actions,
    colors: Colors,
  ) => ConfirmationTemplateValues;
}

const APPROVAL_TEMPLATES: { [key: string]: ConfirmationTemplate } = {
  [ApprovalTypes.RESULT_SUCCESS]: approvalResult,
  [ApprovalTypes.RESULT_ERROR]: approvalResult,
  [ApprovalTypes.SMART_TRANSACTION_STATUS]: smartTransactionStatus,
};

/**
 * Array of approval types that have templated confirmation implementations
 * Used to determine which approval requests can be rendered using the template system
 */
export const TEMPLATED_CONFIRMATION_APPROVAL_TYPES =
  Object.keys(APPROVAL_TEMPLATES);

const ALLOWED_TEMPLATE_KEYS: string[] = [
  'cancelText',
  'confirmText',
  'content',
  'hideCancelButton',
  'hideSubmitButton',
  'onCancel',
  'onConfirm',
  'loadingText',
];

/**
 * Retrieves template values for a pending approval request
 * Validates that the approval type has a template and returns safe template values
 * @param {ApprovalRequest<any>} pendingApproval - The pending approval request to get template values for
 * @param {function} stringFn - Function to retrieve localized strings by key
 * @param {Actions} actions - Action handlers for confirmation interactions
 * @param {Colors} colors - Theme colors for styling the confirmation template
 * @returns {ConfirmationTemplateValues} Safe template values for rendering the confirmation
 * @throws {Error} When approval type is not specified in templates or contains extraneous keys
 */
export function getTemplateValues(
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  pendingApproval: ApprovalRequest<any>,
  stringFn: (key: string) => string,
  actions: Actions,
  colors: Colors,
): ConfirmationTemplateValues {
  const fn = APPROVAL_TEMPLATES[pendingApproval.type]?.getValues;
  if (!fn) {
    throw new Error(
      `APPROVAL_TYPE: '${pendingApproval.type}' is not specified in approval templates`,
    );
  }

  const values = fn(pendingApproval, stringFn, actions, colors);
  const extraneousKeys = omit(values, ALLOWED_TEMPLATE_KEYS);
  const safeValues: ConfirmationTemplateValues = pick(
    values,
    ALLOWED_TEMPLATE_KEYS,
  ) as ConfirmationTemplateValues;
  if (Object.keys(extraneousKeys).length > 0) {
    throw new Error(
      `Received extraneous keys from ${
        pendingApproval.type
      }.getValues. These keys are not passed to the confirmation page: ${Object.keys(
        extraneousKeys,
      )}`,
    );
  }
  return safeValues;
}
