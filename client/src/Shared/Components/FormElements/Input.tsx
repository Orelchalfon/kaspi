import { motion } from "framer-motion";
import React, { useEffect, useReducer } from "react";
import { validate, Validator } from "../../Utils/validators";
import styles from "./Input.module.scss";

interface InputProps {
  id: string;
  label: string;
  element: "input" | "textarea" | "select";
  type?: string;
  placeholder?: string;
  rows?: number;
  errorText?: string;
  validators: Validator[];
  children?: React.ReactNode;
  onInput?: (id: string, value: string, isValid: boolean) => void;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: string;
  defaultValidation?: boolean;
}

interface InputState {
  value: string;
  isValid: boolean;
  isFocused: boolean;
  isBlur: boolean;
}

type Action =
  | { type: "CHANGE"; val: string; validators: Validator[] }
  | { type: "BLUR" }
  | { type: "FOCUS" };

const inputReducer = (state: InputState, action: Action): InputState => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "BLUR":
      return {
        ...state,
        isBlur: true,
      };
    case "FOCUS":
      return {
        ...state,
        isFocused: true,
      };
    default:
      return state;
  }
};

const formVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.05,
      type: "spring",
      stiffness: 120,
    },
  },
  exit: { opacity: 0, x: 20 },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

const Input: React.FC<InputProps> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.defaultValue || "",
    isValid: props.defaultValidation || false,
    isFocused: false,
    isBlur: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput && onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement|HTMLSelectElement>
  ) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };


  const element =
    props.element === "input" ? (
      <input
        className='inp'
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        value={inputState.value}
        onChange={inputChangeHandler}
        onBlur={() => dispatch({ type: "BLUR" })}
        onFocus={() => dispatch({ type: "FOCUS" })}
      />
    ) : props.element === "textarea" ? (
      <textarea
        className='inp'
        id={props.id}
        rows={props.rows || 3}
        value={inputState.value}
        onChange={inputChangeHandler}
        onBlur={() => dispatch({ type: "BLUR" })}
        onFocus={() => dispatch({ type: "FOCUS" })}
      />
    ) : (
      <select
        className='inp'
        id={props.id}
        value={inputState.value}
        onChange={inputChangeHandler}
        onBlur={() => dispatch({ type: "BLUR" })}
        onFocus={() => dispatch({ type: "FOCUS" })}
      >
        {props.children}
      </select>
    );

  return (
    <motion.div
      className={
        styles[
        `form-control${!inputState.isValid && inputState.isBlur ? "--invalid" : ""
        }`
        ]
      }
      initial='hidden'
      animate='visible'
      variants={formVariants}
    >
      <motion.label htmlFor={props.id} variants={itemVariants}>
        {props.label}
      </motion.label>
      {element}
      {!inputState.isValid && inputState.isBlur && (
        <motion.ul initial='hidden' animate='visible' variants={formVariants}>
          {props.errorText?.split(",").map((error, index) => (
            <motion.li key={index} variants={itemVariants}>
              {error}
            </motion.li>
          ))}
        </motion.ul>
      )}
    </motion.div>
  );
};

export default Input;
// const Input: React.FC<InputProps> = (props) => {
//   const [inputState, dispatch] = useReducer(inputReducer, {
//     value: props.defaultValue || "",
//     isValid: props.defaultValidation || false,
//     isFocused: false,
//     isBlur: false,
//   });

//   const { id, onInput } = props;
//   const { value, isValid } = inputState;

//   useEffect(() => {
//     onInput && onInput(id, value, isValid);
//   }, [id, value, isValid, onInput]);

//   const inputChangeHandler = (
//     event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     dispatch({
//       type: "CHANGE",
//       val: event.target.value,
//       validators: props.validators,
//     });
//   };

//   const element =
//     props.element === "input" ? (
//       <input
//         className='inp'
//         id={props.id}
//         type={props.type}
//         placeholder={props.placeholder}
//         value={inputState.value}
//         onChange={inputChangeHandler}
//         onBlur={() => dispatch({ type: "BLUR" })}
//         onFocus={() => dispatch({ type: "FOCUS" })}
//       />
//     ) : (
//       <textarea
//         className='inp'
//         id={props.id}
//         rows={props.rows || 3}
//         value={inputState.value}
//         onChange={inputChangeHandler}
//         onBlur={() => dispatch({ type: "BLUR" })}
//         onFocus={() => dispatch({ type: "FOCUS" })}
//       />
//     );

//   return (
//     <div
//       className={
//         styles[
//           `form-control${
//             !inputState.isValid && inputState.isBlur ? "--invalid" : ""
//           }`
//         ]
//       }
//     >
//       <label htmlFor={props.id}>{props.label}</label>
//       {element}
//       {!inputState.isValid && inputState.isBlur && (
//         <motion.ul
//           initial='hidden'
//           animate='visible'
//           variants={props.parentVariants}
//         >
//           {props.errorText?.split(",").map((error, index) => (
//             <motion.li key={index} variants={itemVariants}>
//               {error}
//             </motion.li>
//           ))}
//         </motion.ul>
//       )}
//     </div>
//   );
// };

// export default Input;
