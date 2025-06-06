import React, { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";
import Input from "../../Components/FormElements/Input";
import Button from "../../Components/UIElements/Button";
import PageReveal from "../../Components/UIElements/PageReveal";
import useForm from "../../Hooks/Forms";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PASS,
} from "../../Utils/validators";
import styles from "./index.module.scss";

const AuthPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      mail: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  });
  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email!.isValid && formState.inputs.password!.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formState.inputs); // Send this to your backend
  };
  if (isLoading) {
    return (
      <div className={styles.page}>
        <HashLoader color={"#123abc"} loading={isLoading} size={150} />
      </div>
    );
  }
  return (
    <PageReveal className={styles.page}>
      <div className={styles.formContainer}>
        <form onSubmit={authSubmitHandler}>
          {!isLoginMode && (
            <Input
              id='name'
              element='input'
              type='text'
              label='שם מלא'
              validators={[VALIDATOR_MINLENGTH(5)]}
              onInput={inputHandler}
              errorText='בבקשה הכנס את שמך (מינימום 5 תווים).'
            />
          )}

          <Input
            id='email'
            element='input'
            type='email'
            label='אימייל'
            validators={[VALIDATOR_EMAIL()]}
            onInput={inputHandler}
            errorText='בבקשה הכנס אימייל תקין.'
          />
          <Input
            id='password'
            element='input'
            type='password'
            label='סיסמה '
            validators={[VALIDATOR_PASS()]}
            onInput={inputHandler}
            errorText='סיסמה חייבת להכיל :, לפחות 8 תווים , אות אחת גדולה, אות אחת קטנה, מספר ותו מיוחד .'
          />
          <Button type='submit' disabled={!formState.isValid}>
            {isLoginMode ? "התחבר" : "הרשם"}
          </Button>
        </form>
        <Button onClick={switchModeHandler}>
          {isLoginMode ? "התחברות" : "הרשמה"}
        </Button>
      </div>
    </PageReveal>
  );
};

export default AuthPage;
