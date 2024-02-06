import React, { useState } from "react";
import {
  BackButton,
  NextButton,
  StepInput,
  GoogleLoginButton,
} from "../../../components";

import requestService from "../../../services/requestService";
import sendUserInfoToBackend from "../../../services/authService";

import { endpoints } from "../../../api/endpoints";

const EnterEmailStep = ({ nextStep, previousStep }) => {
  const { getRequest } = requestService();

  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const validateEmail = (email) => {
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleEmailInputChange = (event) => {
    setEmail(event.target.value);
  };

  const handleGoBack = () => {
    previousStep?.();
  };

  const handleNextStep = () => {
    if (validateEmail(email)) {
      setIsEmailValid(true);
      nextStep?.();
    } else {
      setIsEmailValid(false);
    }
  };

  const handleSuccessGoogleLogin = async (response) => {
    console.log("Google login response:", response);
    if (response && response.access_token) {
      console.log("Access Token:", response.access_token);
      const endpoint = endpoints.login.google.getUserInfo(
        response.access_token
      );
      const userInfo = await getRequest({
        endpoint,
        headers: {
          Authorization: `Bearer ${response.access_token}`,
          Accept: "application/json",
        },
      });

      if (userInfo) {
        console.log("User info", JSON.stringify(userInfo));
        console.log("Trimite la backend!");
        sendUserInfoToBackend(userInfo);
      }
    } else {
      console.log("afiseaza toast / modal / mesaj de eroare");
    }
  };

  const handleErrorGoogleLogin = (error) => {
    console.log({ error });
    console.log("afiseaza toast / modal / mesaj de eroare");
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-no-repeat object-fill bg-center bg-cover MainContainer">
      <div className="mx-auto flex flex-col items-center justify-center w-full h-full">
        <div className="ContainerInput">
          <StepInput
            value={email}
            onChange={handleEmailInputChange}
            label={"STEP 2/9"}
            type={"email"}
            placeholder={
              "Please enter company admin email or use Google Sign-In"
            }
          />
          {!isEmailValid && (
            <p className="error-message">Please enter a valid email address.</p>
          )}
          <NextButton
            onPress={handleNextStep}
            type={"button"}
            styleClass={"input-next"}
          />
          <div className="social-container">
            <GoogleLoginButton
              onSuccessLogin={handleSuccessGoogleLogin}
              onErrorLogin={handleErrorGoogleLogin}
            />
            <GoogleLoginButton
              onSuccessLogin={handleSuccessGoogleLogin}
              onErrorLogin={handleErrorGoogleLogin}
            />
            <GoogleLoginButton
              onSuccessLogin={handleSuccessGoogleLogin}
              onErrorLogin={handleErrorGoogleLogin}
            />
            <GoogleLoginButton
              onSuccessLogin={handleSuccessGoogleLogin}
              onErrorLogin={handleErrorGoogleLogin}
            />
            <GoogleLoginButton
              onSuccessLogin={handleSuccessGoogleLogin}
              onErrorLogin={handleErrorGoogleLogin}
            />
            <GoogleLoginButton
              onSuccessLogin={handleSuccessGoogleLogin}
              onErrorLogin={handleErrorGoogleLogin}
            />
          </div>
        </div>
        <BackButton onPress={handleGoBack} styleClass={"button-back-2"} />
      </div>
    </div>
  );
};

export default EnterEmailStep;
