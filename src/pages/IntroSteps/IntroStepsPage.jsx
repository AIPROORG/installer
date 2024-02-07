import React, { useEffect } from "react";
import StepWizard from "react-step-wizard";

import {
  ChooseClientTypeStep,
  EnterEmailStep,
  ValidateCUIStep,
  SocialDetailsStep,
  PhoneNumberStep,
  CreateAccountStep,
} from "./components";

import "../../styles/Step.css";

const IntroStepsPage = () => {
  const adjustPlaceholderFontSize = () => {
    const input = document.querySelector(".input-wizard");
    if (input) {
      const containerWidth = input.offsetWidth;
      const scaleFactor = 20;
      const newSize = Math.max(containerWidth / scaleFactor, 10);
      const placeholderStyle = `.input-wizard::placeholder { font-size: ${newSize}px !important; }`;

      let styleEl = document.getElementById("dynamic-placeholder-style");
      if (!styleEl) {
        styleEl = document.createElement("style");
        styleEl.id = "dynamic-placeholder-style";
        document.head.appendChild(styleEl);
      }
      styleEl.textContent = placeholderStyle;
    }
  };

  useEffect(() => {
    adjustPlaceholderFontSize();
    window.addEventListener("resize", adjustPlaceholderFontSize);

    return () => {
      window.removeEventListener("resize", adjustPlaceholderFontSize);
    };
  }, []);

  return (
    <StepWizard initialStep={ChooseClientTypeStep}>
      <CreateAccountStep />
      <ChooseClientTypeStep />
      <ValidateCUIStep />
      <EnterEmailStep />
      <SocialDetailsStep />
      <PhoneNumberStep />
    </StepWizard>
  );
};

export default IntroStepsPage;
