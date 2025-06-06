import { useCallback, useReducer } from "react";

// Define types for the form state and actions
interface InputState1 {
  value: string;
  isValid: boolean;
}
type InputState = InputState1 | undefined;
interface FormState {
  inputs: {
    [key: string]: InputState | undefined;
  };
  isValid: boolean;
}

type Action =
  | { type: "INPUT_CHANGE"; inputId: string; value: string; isValid: boolean }
  | {
      type: "SET_DATA";
      inputs: { [key: string]: InputState };
      isValid: boolean;
    };

/**
 * This function is the reducer for the useForm hook. It takes the current state
 * and an action as arguments and returns the new state.
 * @param {FormState} state The current state of the form.
 * @param {Action} action The action to be performed on the state.
 * @returns {FormState} The new state of the form.
 */
const formReducer = (state: FormState, action: Action): FormState => {
  switch (action.type) {
    case "INPUT_CHANGE": {
      // When an input field has changed, update the state to reflect the change.
      // Also, update the overall validity of the form by checking the validity
      // of all the input fields.
      let isValid = true;
      for (const inputId in state.inputs) {
        if (inputId === action.inputId) {
          isValid = isValid && action.isValid;
        } else {
          isValid = isValid && state.inputs[inputId]!.isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: isValid,
      };
    }
    case "SET_DATA":
      // When the data is set, update the state with the new data and validity.
      return {
        inputs: action.inputs,
        isValid: action.isValid,
      };
    default:
      // If the action is not recognized, return the current state.
      return state;
  }
};
//#endregion

// Define the hook's return type
type UseFormReturn = [
  FormState,
  (id: string, value: string, isValid: boolean) => void,
  (inputData: { [key: string]: InputState }, formValidity: boolean) => void
];

/**
 * useForm is a hook that takes an initial state of the form and the form's
 * validity, and returns a state object, an input change handler and a
 * function to set the form data.
 * @param {Object} initialInputs - An object with keys as the input IDs and
 *    values as the input states.
 * @param {boolean} initialFormValidity - The initial validity of the form.
 * @returns {Array} An array containing the form state, the input change
 *    handler and the function to set the form data.
 */
export const useForm = (
  initialInputs: { [key: string]: InputState },
  initialFormValidity: boolean
): UseFormReturn => {
  // Use the useReducer hook to store the form's state in a state object
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  // The input change handler takes an ID, a value and a validity indicator
  // and dispatches an action to update the form state.
  const inputHandler = useCallback(
    (id: string, value: string, isValid: boolean) => {
      dispatch({ type: "INPUT_CHANGE", value, isValid, inputId: id });
    },
    []
  );

  // The setFormData function takes an object with keys as the input IDs and
  // values as the input states, and a validity indicator, and dispatches an
  // action to update the form state.
  const setFormData = useCallback(
    (inputData: { [key: string]: InputState }, formValidity: boolean) => {
      dispatch({
        type: "SET_DATA",
        inputs: inputData,
        isValid: formValidity,
      });
    },
    []
  );

  return [formState, inputHandler, setFormData];
};

export default useForm;
