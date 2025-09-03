import Engine from '../../../Engine';
import { createAction, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  // TODO: Replace "any" with type
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  backgroundState: {} as any,
};

/**
 * Redux action to initialize the background state from the MetaMask Engine
 * This action is dispatched when the app starts to sync the Redux store with the Engine state
 * @returns {Action} Redux action with type 'INIT_BG_STATE'
 */
export const initBgState = createAction('INIT_BG_STATE');

/**
 * Redux action to update a specific key in the background state
 * Used to sync individual controller states from the Engine to the Redux store
 * @param {string} key - The key of the controller state to update
 * @returns {PayloadAction} Redux action with the key as payload
 */
export const updateBgState = createAction('UPDATE_BG_STATE', (key) => ({
  payload: key,
}));

/**
 * Counter object for tracking engine state updates
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
