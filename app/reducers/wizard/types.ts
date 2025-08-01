export interface WizardState {
  step: number;
}

export enum WizardActionType {
  SET_ONBOARDING_WIZARD_STEP = 'SET_ONBOARDING_WIZARD_STEP',
}

export interface WizardAction {
  type: WizardActionType | string;
  step?: number;
}
