import React, { useState } from "react";
import { StepInput, BackButton, NextButton } from "../../../components";

const SocialDetailsStep = ({ previousStep, nextStep }) => {
  const [linkedInLink, setLinkedInLink] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [linkedInValid, setLinkedInValid] = useState(true);
  const [facebookValid, setFacebookValid] = useState(true);

  const validateLinkedIn = () => {
    const linkedInPattern = /^https?:\/\/(www\.)?linkedin\.com\/.*$/;
    const isValid = linkedInPattern.test(linkedInLink);
    setLinkedInValid(isValid);
    return isValid;
  };

  const validateFacebook = () => {
    const facebookPattern = /^https?:\/\/(www\.)?facebook\.com\/.*$/;
    const isValid = facebookPattern.test(facebookLink);
    setFacebookValid(isValid);
    return isValid;
  };

  const handleNextStep = () => {
    const isLinkedInValid = validateLinkedIn();
    const isFacebookValid = validateFacebook();

    if (isLinkedInValid && isFacebookValid) {
      nextStep?.();
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-no-repeat object-fill bg-center bg-cover MainContainer">
      <div className="mx-auto flex flex-col items-center justify-center w-full h-full">
        <div className="ContainerInput">
          <StepInput
            value={linkedInLink}
            onChange={(e) => setLinkedInLink(e.target.value)}
            onBlur={validateLinkedIn}
            label={"STEP 3/9"}
            placeholder={"Please enter your Linkedin profile link"}
          />
          {!linkedInValid && (
            <p className="error-message">Please enter a valid LinkedIn URL.</p>
          )}
        </div>
        <div className="ContainerInput">
          <StepInput
            value={facebookLink}
            onChange={(e) => setFacebookLink(e.target.value)}
            onBlur={validateFacebook}
            label={"STEP 4/9"}
            placeholder={"Please enter your Facebook profile link"}
          />
          {!facebookValid && (
            <p className="error-message">Please enter a valid Facebook URL.</p>
          )}
        </div>
        <BackButton onPress={previousStep} styleClass={"button-back-3"} />
        <NextButton onPress={handleNextStep} styleClass={"button-next-3"} />
      </div>
    </div>
  );
};

export default SocialDetailsStep;
