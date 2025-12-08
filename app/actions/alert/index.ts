import { Action } from 'redux';

/**
 * Alert action type enum
 */
export enum AlertActionType {
  SHOW_ALERT = 'SHOW_ALERT',
  HIDE_ALERT = 'HIDE_ALERT',
}

/**
 * Show alert action interface
 */
export interface ShowAlertAction extends Action<AlertActionType.SHOW_ALERT> {
  isVisible: boolean;
  autodismiss: number | null;
  content: string | null;
  data: unknown | null;
}

/**
 * Hide alert action interface
 */
export type HideAlertAction = Action<AlertActionType.HIDE_ALERT>;

/**
 * Alert action union type
 */
export type AlertAction = ShowAlertAction | HideAlertAction;

/**
 * Show alert action payload interface
 */
interface ShowAlertPayload {
  isVisible?: boolean;
  autodismiss?: number | null;
  content?: string | null;
  data?: unknown | null;
}

/**
 * Dismisses the current alert
 * @returns Hide alert action
 */
export function dismissAlert(): HideAlertAction {
  return {
    type: AlertActionType.HIDE_ALERT,
  };
}

/**
 * Shows an alert with the specified content
 * @param payload - Alert payload containing visibility, autodismiss, content, and data
 * @returns Show alert action
 */
export function showAlert({
  isVisible = true,
  autodismiss = null,
  content = null,
  data = null,
}: ShowAlertPayload): ShowAlertAction {
  return {
    type: AlertActionType.SHOW_ALERT,
    isVisible,
    autodismiss,
    content,
    data,
  };
}
