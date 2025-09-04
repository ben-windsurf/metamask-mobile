import Engine from '../../../Engine';
import { createAction, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  backgroundState: {} as any,
};

/**
 * Redux action to initialize the background state from the Engine.
 * This action triggers the reducer to set the initial state from the Engine's current state.
 */
export const initBgState = createAction('INIT_BG_STATE');

/**
 * Redux action to update a specific key in the background state.
 * @param key - The key in the Engine state to update
 * @returns Action with payload containing the key to update
 */
export const updateBgState = createAction('UPDATE_BG_STATE', (key) => ({
  payload: key,
}));

/**
 * Counter object for tracking engine-related metrics.
 * TODO: Replace "any" with proper type definition
 */
// TODO: Replace "any" with type
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const counter: any = {};
const engineReducer = (
  // eslint-disable-next-line @typescript-eslint/default-param-last
  state = initialState,
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  action: PayloadAction<{ key: any } | undefined>,
) => {
  switch (action.type) {
    case initBgState.type: {
      return { backgroundState: Engine.state };
    }
    case updateBgState.type: {
      if (!action.payload) return state;

      return {
        ...state,
        backgroundState: {
          ...state.backgroundState,
          [action.payload.key]:
            Engine.state[action.payload.key as keyof typeof Engine.state],
        },
      };
    }
    default:
      return state;
  }
};

export default engineReducer;
