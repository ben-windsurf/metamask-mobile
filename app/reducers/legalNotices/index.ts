import { RootState } from '..';
import ACTIONS from './types';

const currentDate = new Date(Date.now());
const newPrivacyPolicyDate = new Date('2024-06-18T12:00:00Z');
export const isPastPrivacyPolicyDate = currentDate >= newPrivacyPolicyDate;

export interface LegalNoticesState {
  newPrivacyPolicyToastClickedOrClosed: boolean;
  newPrivacyPolicyToastShownDate: number | null;
}

const initialState: LegalNoticesState = {
  newPrivacyPolicyToastClickedOrClosed: false,
  newPrivacyPolicyToastShownDate: null,
};

export interface StorePrivacyPolicyShownDateAction {
  type: typeof ACTIONS.STORE_PRIVACY_POLICY_SHOWN_DATE;
  payload: number;
}

export interface StorePrivacyPolicyClickedOrClosedAction {
  type: typeof ACTIONS.STORE_PRIVACY_POLICY_CLICKED_OR_CLOSED;
}

export type LegalNoticesAction =
  | StorePrivacyPolicyShownDateAction
  | StorePrivacyPolicyClickedOrClosedAction;

export const storePrivacyPolicyShownDate = (
  timestamp: number,
): StorePrivacyPolicyShownDateAction => ({
  type: ACTIONS.STORE_PRIVACY_POLICY_SHOWN_DATE,
  payload: timestamp,
});

export const storePrivacyPolicyClickedOrClosed =
  (): StorePrivacyPolicyClickedOrClosedAction => ({
    type: ACTIONS.STORE_PRIVACY_POLICY_CLICKED_OR_CLOSED,
  });

export const shouldShowNewPrivacyToastSelector = (
  state: RootState,
): boolean => {
  const {
    newPrivacyPolicyToastShownDate,
    newPrivacyPolicyToastClickedOrClosed,
  } = state.legalNotices;

  if (newPrivacyPolicyToastClickedOrClosed) return false;

  if (newPrivacyPolicyToastShownDate === null) {
    return currentDate.getTime() >= newPrivacyPolicyDate.getTime();
  }

  const shownDate = new Date(newPrivacyPolicyToastShownDate);

  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const isRecent =
    currentDate.getTime() - shownDate.getTime() < oneDayInMilliseconds;

  return (
    currentDate.getTime() >= newPrivacyPolicyDate.getTime() &&
    isRecent &&
    !newPrivacyPolicyToastClickedOrClosed
  );
};

const legalNoticesReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state: LegalNoticesState = initialState,
  action: LegalNoticesAction,
): LegalNoticesState => {
  switch (action.type) {
    case ACTIONS.STORE_PRIVACY_POLICY_SHOWN_DATE: {
      const typedAction = action as StorePrivacyPolicyShownDateAction;
      if (state.newPrivacyPolicyToastShownDate !== null) {
        return state;
      }

      return {
        ...state,
        newPrivacyPolicyToastShownDate: typedAction.payload,
      };
    }

    case ACTIONS.STORE_PRIVACY_POLICY_CLICKED_OR_CLOSED: {
      return { ...state, newPrivacyPolicyToastClickedOrClosed: true };
    }

    default:
      return state;
  }
};
export default legalNoticesReducer;
