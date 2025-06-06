// Define validator types as constants
const VALIDATOR_TYPE_REQUIRE = "REQUIRE";
const VALIDATOR_TYPE_MINLENGTH = "MINLENGTH";
const VALIDATOR_TYPE_MAXLENGTH = "MAXLENGTH";
const VALIDATOR_TYPE_MIN = "MIN";
const VALIDATOR_TYPE_MAX = "MAX";
const VALIDATOR_TYPE_EMAIL = "EMAIL";
const VALIDATOR_TYPE_FILE = "FILE";
const VALIDATOR_TYPE_PASS = "PASSWORD";

// Define types for validator objects
export interface Validator {
  type: string;
  val?: number; // 'val' is optional because some validators don't need a value (like REQUIRE, EMAIL)
}

// Define the validators as functions that return a Validator object
export const VALIDATOR_REQUIRE = (): Validator => ({ type: VALIDATOR_TYPE_REQUIRE });
export const VALIDATOR_FILE = (): Validator => ({ type: VALIDATOR_TYPE_FILE });
export const VALIDATOR_MINLENGTH = (val: number): Validator => ({
  type: VALIDATOR_TYPE_MINLENGTH,
  val: val,
});
export const VALIDATOR_MAXLENGTH = (val: number): Validator => ({
  type: VALIDATOR_TYPE_MAXLENGTH,
  val: val,
});
export const VALIDATOR_MIN = (val: number): Validator => ({ type: VALIDATOR_TYPE_MIN, val: val });
export const VALIDATOR_MAX = (val: number): Validator => ({ type: VALIDATOR_TYPE_MAX, val: val });
export const VALIDATOR_EMAIL = (): Validator => ({ type: VALIDATOR_TYPE_EMAIL });
export const VALIDATOR_PASS = (): Validator => ({ type: VALIDATOR_TYPE_PASS });

// Define the validate function with proper typing
export const validate = (value: string, validators: Validator[]): boolean => {
  let isValid = true;

  for (const validator of validators) {
    if (validator.type === VALIDATOR_TYPE_REQUIRE) {
      isValid = isValid && value.trim().length > 0;
    }
    if (validator.type === VALIDATOR_TYPE_MINLENGTH && validator.val !== undefined) {
      isValid = isValid && value.trim().length >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAXLENGTH && validator.val !== undefined) {
      isValid = isValid && value.trim().length <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MIN && validator.val !== undefined) {
      isValid = isValid && +value >= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_MAX && validator.val !== undefined) {
      isValid = isValid && +value <= validator.val;
    }
    if (validator.type === VALIDATOR_TYPE_EMAIL) {
      isValid = isValid && /^\S+@\S+\.\S+$/.test(value);
    }
    if (validator.type === VALIDATOR_TYPE_PASS) {
      isValid = isValid && /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+{}[\]|\\:;"'<>,.?/])[a-zA-Z\d!@#$%^&*()\-_=+{}[\]|\\:;"'<>,.?/]{8,}$/.test(value);
    }
  }

  return isValid;
};
