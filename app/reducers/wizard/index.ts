import { REHYDRATE } from 'redux-persist';

export interface WizardState {
  step: number;
}

const initialState: WizardState = {
  step: 0,
};

interface WizardAction {
  type: string;
  step?: number;
}

const onboardingWizardReducer = (
  action: WizardAction,
  state: WizardState = initialState,
): WizardState => {
  switch (action.type) {
    case REHYDRATE:
      return {
        ...initialState,
      };
    case 'SET_ONBOARDING_WIZARD_STEP':
      return {
        ...state,
        step: action.step || 0,
      };
    default:
      return state;
  }
};
export default onboardingWizardReducer;
