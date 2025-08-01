export interface InfuraAvailabilityState {
  isBlocked: boolean;
}

export enum InfuraAvailabilityActionType {
  INFURA_AVAILABILITY_BLOCKED = 'INFURA_AVAILABILITY_BLOCKED',
  INFURA_AVAILABILITY_NOT_BLOCKED = 'INFURA_AVAILABILITY_NOT_BLOCKED',
}

export interface InfuraAvailabilityAction {
  type: InfuraAvailabilityActionType;
}
