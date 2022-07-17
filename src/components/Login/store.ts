export type StateType = {
  value: string;
  isValid: boolean;
};

export enum ActionTypes {
  USER_INPUT,
  INPUT_BLUR,
  RESET,
}

export type InputAction = {
  type: ActionTypes.USER_INPUT;
  payload: { val: string };
};

export type BlurAction = {
  type: ActionTypes.INPUT_BLUR;
};

export type ResetAction = {
  type: ActionTypes.RESET;
};

export type Actions = InputAction | BlurAction | ResetAction;

export type ValidatorReducer = (
  validator: (val: string) => boolean,
  state: StateType,
  action: Actions
) => StateType;

/* #TA05 */
const validatorReducer: ValidatorReducer = (validator, state, action) => {
  switch (action.type) {
    case ActionTypes.USER_INPUT:
      return {
        value: action.payload.val,
        isValid: validator(action.payload.val),
      };
    case ActionTypes.INPUT_BLUR:
      return {
        ...state,
        isValid: validator(state.value),
      };
    case ActionTypes.RESET:
      return { value: "", isValid: false };
  }
};

export const emailReducer = (state: StateType, action: Actions) => {
  const validator = (val: string) => val.includes("@");
  return validatorReducer(validator, state, action);
};

export const passwordReducer = (state: StateType, action: Actions) => {
  const validator = (val: string) => val.trim().length > 6;
  return validatorReducer(validator, state, action);
};
