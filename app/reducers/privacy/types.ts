export interface PrivacyState {
  approvedHosts: { [hostname: string]: boolean } | never[];
  revealSRPTimestamps: number[];
}

export enum PrivacyActionType {
  APPROVE_HOST = 'APPROVE_HOST',
  REJECT_HOST = 'REJECT_HOST',
  CLEAR_HOSTS = 'CLEAR_HOSTS',
  RECORD_SRP_REVEAL_TIMESTAMP = 'RECORD_SRP_REVEAL_TIMESTAMP',
}

export interface PrivacyAction {
  type: PrivacyActionType;
  hostname?: string;
  timestamp?: number;
}
