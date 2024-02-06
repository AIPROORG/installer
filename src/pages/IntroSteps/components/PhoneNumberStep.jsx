import React, { useState } from "react";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "react-phone-number-input";

import { NextButton, BackButton } from "../../../components";

import requestService from "../../../services/requestService";

const PhoneNumberStep = ({ previousStep, nextStep }) => {
  const [value, setValue] = useState("");
  const [phoneValid, setPhoneValid] = useState(true);

  const { postRequest } = requestService();

  const handleNextStep = () => {
    if (isValidPhoneNumber(value)) {
      const phoneNumber = value;

      // TODO: add endpoint to the endpoints.js file and use it from there
      postRequest({
        endpoint: "url_backend",
        body: JSON.stringify({ phoneNumber }),
      })
        .then((response) => response.json())
        .then((data) => {})
        .catch();

      nextStep?.();
    } else {
      setPhoneValid(false);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-no-repeat object-fill bg-center bg-cover MainContainer">
      <div className="mx-auto flex flex-col items-center justify-center w-full h-full">
        <div className="ContainerInput">
          <p className="step-p">STEP 5/9</p>
          <PhoneInput
            placeholder="Enter phone number"
            value={value}
            onChange={(e) => setValue(e?.__tag ?? "")}
            error={
              value
                ? isValidPhoneNumber(value)
                  ? undefined
                  : "Invalid phone number"
                : "Phone number required"
            }
          />
          {!phoneValid && (
            <p className="error-message">Please enter a valid phone number.</p>
          )}
          <NextButton
            onPress={handleNextStep}
            type={"button"}
            styleClass={"input-next"}
          />
        </div>
        <BackButton onPress={previousStep} styleClass={"button-back-2"} />
      </div>
    </div>
  );
};

export default PhoneNumberStep;
