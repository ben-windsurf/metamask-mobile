export enum ActionType {
  APPROVE_HOST = 'APPROVE_HOST',
  REJECT_HOST = 'REJECT_HOST',
  CLEAR_HOSTS = 'CLEAR_HOSTS',
  RECORD_SRP_REVEAL_TIMESTAMP = 'RECORD_SRP_REVEAL_TIMESTAMP',
}

interface ApproveHostAction {
  type: ActionType.APPROVE_HOST;
  hostname: string;
}

interface RejectHostAction {
  type: ActionType.REJECT_HOST;
  hostname: string;
}

interface ClearHostsAction {
  type: ActionType.CLEAR_HOSTS;
}

interface RecordSRPRevealTimestampAction {
  type: ActionType.RECORD_SRP_REVEAL_TIMESTAMP;
  timestamp: number;
}

export type Action =
  | ApproveHostAction
  | RejectHostAction
  | ClearHostsAction
  | RecordSRPRevealTimestampAction;

export function approveHost(hostname: string): ApproveHostAction {
  return {
    type: ActionType.APPROVE_HOST,
    hostname,
  };
}

export function rejectHost(hostname: string): RejectHostAction {
  return {
    type: ActionType.REJECT_HOST,
    hostname,
  };
}

export function recordSRPRevealTimestamp(
  timestamp: number | string,
): RecordSRPRevealTimestampAction {
  return {
    type: ActionType.RECORD_SRP_REVEAL_TIMESTAMP,
    timestamp:
      typeof timestamp === 'string' ? parseInt(timestamp, 10) : timestamp,
  };
}
