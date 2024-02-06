import { Button } from "../../../components";
import React from "react";

const ChooseClientTypeStep = ({ nextStep }) => {
  const handleSelectCompany = () => {
    nextStep?.();
  };

  const handleSelectFreelancer = () => {};

  return (
    <div className="w-[100vw] h-[100vh] bg-no-repeat object-fill bg-center bg-cover mx-auto flex flex-col items-center justify-center w-full h-full MainContainer">
      <h2 className="mb-[2rem] WizardHeading">Step 1</h2>
      <Button title={"Company"} onPress={handleSelectCompany} />
      <Button title={"Freelancer"} onPress={handleSelectFreelancer} />
    </div>
  );
};

export default ChooseClientTypeStep;
