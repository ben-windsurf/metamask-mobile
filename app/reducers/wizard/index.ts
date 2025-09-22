/* eslint-disable @typescript-eslint/default-param-last */
import { REHYDRATE } from 'redux-persist';

export interface WizardState {
  step: number;
}

interface SetOnboardingWizardStepAction {
  type: 'SET_ONBOARDING_WIZARD_STEP';
  step: number;
}

interface RehydrateAction {
  type: typeof REHYDRATE;
}

type WizardAction = SetOnboardingWizardStepAction | RehydrateAction;

const initialState: WizardState = {
  step: 0,
};

const onboardingWizardReducer = (
  state = initialState,
  action: WizardAction,
): WizardState => {
  switch (action.type) {
    case REHYDRATE:
      return {
        ...initialState,
      };
    case 'SET_ONBOARDING_WIZARD_STEP':
      return {
        ...state,
        step: action.step,
      };
    default:
      return state;
  }
};
export default onboardingWizardReducer;
