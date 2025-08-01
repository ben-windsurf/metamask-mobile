import { REHYDRATE } from 'redux-persist';

export interface WizardState {
  step: number;
}

export enum WizardActionType {
  SET_ONBOARDING_WIZARD_STEP = 'SET_ONBOARDING_WIZARD_STEP',
}

interface WizardAction {
  type: string;
  step?: number;
}

const initialState: WizardState = {
  step: 0,
};

const onboardingWizardReducer = (
  state: WizardState,
  action: WizardAction = { type: '' },
): WizardState => {
  if (!state) state = initialState;
  switch (action.type) {
    case REHYDRATE:
      return {
        ...initialState,
      };
    case WizardActionType.SET_ONBOARDING_WIZARD_STEP:
      return {
        ...state,
        step: action.step || 0,
      };
    default:
      return state;
  }
};

export default onboardingWizardReducer;
