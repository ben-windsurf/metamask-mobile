import { Action } from 'redux';

/**
 * Wizard action type enum
 */
export enum WizardActionType {
  SET_ONBOARDING_WIZARD_STEP = 'SET_ONBOARDING_WIZARD_STEP',
}

/**
 * Set onboarding wizard step action interface
 */
export interface SetOnboardingWizardStepAction
  extends Action<WizardActionType.SET_ONBOARDING_WIZARD_STEP> {
  step: number;
}

/**
 * Wizard action union type
 */
export type WizardAction = SetOnboardingWizardStepAction;

/**
 * Sets onboarding wizard step
 * @param step - The step number to set
 * @returns Set onboarding wizard step action
 */
export default function setOnboardingWizardStep(
  step: number,
): SetOnboardingWizardStepAction {
  return {
    type: WizardActionType.SET_ONBOARDING_WIZARD_STEP,
    step,
  };
}
