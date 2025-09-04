export interface PrivacyState {
  approvedHosts: Record<string, boolean>;
  revealSRPTimestamps: number[];
}

export enum PrivacyActionType {
  APPROVE_HOST = 'APPROVE_HOST',
  REJECT_HOST = 'REJECT_HOST',
  CLEAR_HOSTS = 'CLEAR_HOSTS',
  RECORD_SRP_REVEAL_TIMESTAMP = 'RECORD_SRP_REVEAL_TIMESTAMP',
}

export interface ApproveHostAction {
  type: PrivacyActionType.APPROVE_HOST;
  hostname: string;
}

export interface RejectHostAction {
  type: PrivacyActionType.REJECT_HOST;
  hostname: string;
}

export interface ClearHostsAction {
  type: PrivacyActionType.CLEAR_HOSTS;
}

export interface RecordSRPRevealTimestampAction {
  type: PrivacyActionType.RECORD_SRP_REVEAL_TIMESTAMP;
  timestamp: number;
}

export type PrivacyAction =
  | ApproveHostAction
  | RejectHostAction
  | ClearHostsAction
  | RecordSRPRevealTimestampAction;
