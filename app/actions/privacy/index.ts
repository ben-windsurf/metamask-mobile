import type { Action as ReduxAction } from 'redux';

export enum PrivacyActionType {
  APPROVE_HOST = 'APPROVE_HOST',
  REJECT_HOST = 'REJECT_HOST',
  CLEAR_HOSTS = 'CLEAR_HOSTS',
  RECORD_SRP_REVEAL_TIMESTAMP = 'RECORD_SRP_REVEAL_TIMESTAMP',
}

export interface ApproveHostAction extends ReduxAction<PrivacyActionType.APPROVE_HOST> {
  hostname: string;
}

export interface RejectHostAction extends ReduxAction<PrivacyActionType.REJECT_HOST> {
  hostname: string;
}

export interface ClearHostsAction extends ReduxAction<PrivacyActionType.CLEAR_HOSTS> {}

export interface RecordSRPRevealTimestampAction extends ReduxAction<PrivacyActionType.RECORD_SRP_REVEAL_TIMESTAMP> {
  timestamp: number;
}

export type PrivacyAction =
  | ApproveHostAction
  | RejectHostAction
  | ClearHostsAction
  | RecordSRPRevealTimestampAction;

export const approveHost = (hostname: string): ApproveHostAction => ({
  type: PrivacyActionType.APPROVE_HOST,
  hostname,
});

export const rejectHost = (hostname: string): RejectHostAction => ({
  type: PrivacyActionType.REJECT_HOST,
  hostname,
});

export const clearHosts = (): ClearHostsAction => ({
  type: PrivacyActionType.CLEAR_HOSTS,
});

export const recordSRPRevealTimestamp = (timestamp: number): RecordSRPRevealTimestampAction => ({
  type: PrivacyActionType.RECORD_SRP_REVEAL_TIMESTAMP,
  timestamp,
});
