export interface AlertState {
  isVisible: boolean;
  autodismiss: number | null;
  content: string | null;
  data: Record<string, unknown> | null;
}

export enum AlertActionType {
  SHOW_ALERT = 'SHOW_ALERT',
  HIDE_ALERT = 'HIDE_ALERT',
}

interface AlertAction {
  type: string;
  autodismiss?: number;
  content?: string;
  data?: Record<string, unknown>;
}

const initialState: AlertState = {
  isVisible: false,
  autodismiss: null,
  content: null,
  data: null,
};

const alertReducer = (
  state: AlertState,
  action: AlertAction = { type: '' },
): AlertState => {
  if (!state) state = initialState;
  switch (action.type) {
    case AlertActionType.SHOW_ALERT:
      return {
        ...state,
        isVisible: true,
        autodismiss: action.autodismiss || null,
        content: action.content || null,
        data: action.data || null,
      };
    case AlertActionType.HIDE_ALERT:
      return {
        ...state,
        isVisible: false,
        autodismiss: null,
      };
    default:
      return state;
  }
};

export default alertReducer;
