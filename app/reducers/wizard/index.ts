import { REHYDRATE } from 'redux-persist';
import { WizardState, WizardAction, WizardActionType } from './types';

const initialState: WizardState = {
  step: 0,
};

const onboardingWizardReducer = (
  action: WizardAction,
  state: WizardState = initialState,
): WizardState => {
  switch (action.type) {
    case REHYDRATE:
      return {
        ...initialState,
      };
    case WizardActionType.SET_ONBOARDING_WIZARD_STEP:
      return {
        ...state,
        step: action.step ?? 0,
      };
    default:
      return state;
  }
};
export default onboardingWizardReducer;
