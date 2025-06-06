import { Outlet, useNavigate } from "react-router-dom";
// import MainNavigation from "../Navigation/MainNavigation";
import { AnimatePresence } from "framer-motion";
import { default as React, useEffect, useState } from "react";
import { CircleLoader, HashLoader } from "react-spinners";
import logo from "../../../assets/img/logo.png";
import Input from "../../Components/FormElements/Input";
import Button from "../../Components/UIElements/Button";
import { useForm } from "../../Hooks";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_PASS,
} from "../../Utils/validators";
import Header from "../Header/";
import Modal from "../Modal";
import BringThemHomeNow from "../UIElements/BringThemHomeNow";
/**
 * Layout component that wraps the entire app
 * @param props
 * @prop openModal - boolean indicating whether the modal should be open or not
 * @prop setOpenModal - function to set the openModal state
 * @returns {JSX.Element} a JSX element containing the layout
 */
const Layout: React.FC = (): JSX.Element => {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, SetIsFetching] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  /**
   * Custom hook to handle form state
   * @param initialInputs - initial form state
   * @param initialFormValidity - initial form validity
   * @returns an array containing the form state, input handler and set form data function
   */
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
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

  /**
   * Set the loading state to false after 1 second
   */
  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1000);
  }, []);

  /**
   * Switch between login and signup mode
   */
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



  const submitAuthData = async () => {
    SetIsFetching(true);
    const data = {
      name: formState.inputs.name?.value,
      email: formState.inputs.email?.value,
      password: formState.inputs.password?.value,
    };

    const endPoint = isLoginMode ? "login" : "register";
    try {
      const response = await fetch(
        `http://localhost:5000/api/users/${endPoint}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      console.dir(response);
      const responseData = await response.json();

      if (response.ok && responseData?.result) {

        const result = responseData.result;
        console.log("insertedId", result.insertedId??result._id, '\n',)
        localStorage.setItem("token", JSON.stringify(result.insertedId??result._id));
        navigate(`:${result.insertedId??result._id}/dashboard`,{replace:false});

      }
    } catch (error) {
      console.log(error);
    }
    SetIsFetching(false);
    // if (isLoginMode) {
    //   try {
    //     const response = await fetch("http://localhost:5000/api/users/login", {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify(data),
    //     });
    //     const responseData = await response.json();
    //     console.log(responseData);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // } else {
    //   try {
    //     const response = await fetch(
    //       "http://localhost:5000/api/users/register",
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(data),
    //       }
    //     );
    //     const responseData = await response.json();
    //     console.log(responseData);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // }
  };
  /**
   * Handle form submission
   * @param event - the form event
   */
  const authSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    submitAuthData();
  };
  if (isLoading) {
    return (
      <div style={{ height: "100vh", display: "grid", placeItems: "center" }}>
        <HashLoader color={"#5ec576"} loading={isLoading} size={150} />
      </div>
    );
  }
  return (
    <>
      {/* <MainNavigation /> */}
      <Header logo={logo} onClickOpenAccount={() => setOpenModal(true)} />
      <main>
        <Outlet />
      </main>
      <AnimatePresence>
        {openModal && (
          <Modal key={"modal"} onClose={() => setOpenModal(false)}>
            <button
              onClick={() => setOpenModal(false)}
              className='btn--close-modal'
            >
              &times;
            </button>
            <h2 className='modal__header'>
              Open your bank account <br />
              in just <span className='highlight'>5 minutes</span>
            </h2>

            <div>
              <form className='modal__form' onSubmit={authSubmitHandler}>
                {!isLoginMode && (
                  <Input
                    element='input'
                    id='name'
                    type='text'
                    label='Your Name'
                    validators={[VALIDATOR_MINLENGTH(3)]}
                    errorText='Please enter a valid name.'
                    onInput={inputHandler}
                  />
                )}
                <Input
                  element='input'
                  id='email'
                  type='email'
                  label='E-Mail'
                  validators={[VALIDATOR_EMAIL()]}
                  errorText='Please enter a valid email address.'
                  onInput={inputHandler}
                />
                <Input
                  element='input'
                  id='password'
                  type='password'
                  label='Password'
                  validators={[VALIDATOR_PASS()]}
                  errorText='Password must contains:, at least 8 characters,1 Capital letter,1 number and 1 symbol.'
                  onInput={inputHandler}
                />
                <div>
                  <Button type='submit' disabled={!formState.isValid}>
                    {!isFetching && (isLoginMode ? "LOGIN" : "SIGNUP") || ""}
                    <CircleLoader color={"#ffffff"} loading={isFetching} size={30} />
                  </Button>
                  <Button inverse onClick={switchModeHandler}>
                    {isLoginMode ? "SWITCH TO SIGNUP" : "SWITCH TO LOGIN"}
                  </Button>
                </div>
              </form>
            </div>
          </Modal>
        )}
      </AnimatePresence>
      <BringThemHomeNow lang='he' />
    </>
  );
};

export default Layout;
