import { REHYDRATE } from 'redux-persist';
import { WizardAction, WizardActionType } from '../../actions/wizard';

/**
 * Wizard state interface
 */
export interface WizardState {
  step: number;
}

/**
 * Initial wizard state
 */
const initialState: WizardState = {
  step: 0,
};

/**
 * Onboarding wizard reducer
 * @param state - Current wizard state
 * @param action - Wizard action
 * @returns Updated wizard state
 */
/* eslint-disable @typescript-eslint/default-param-last */
const onboardingWizardReducer = (
  state: WizardState = initialState,
  action: WizardAction | { type: typeof REHYDRATE },
): WizardState => {
  switch (action.type) {
    case REHYDRATE:
      return {
        ...initialState,
      };
    case WizardActionType.SET_ONBOARDING_WIZARD_STEP:
      return {
        ...state,
        step: action.step,
      };
    default:
      return state;
  }
};

export default onboardingWizardReducer;
