import React, { useState, useContext } from "react";
import AuthContext from "../../../services/AuthContext";
import { StepInput, NextButton, BackButton } from "../../../components";

const CreateAccountStep = ({ previousStep, nextStep }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const { registerUser } = useContext(AuthContext); // Folosim funcția registerUser din AuthContext

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);
    setPasswordMatch(confirmPasswordValue === password);
  };

  const handleNextStep = async () => {
    if (password !== confirmPassword) {
      setPasswordMatch(false);
      console.log("Parolele nu se potrivesc");
      return; // Iesim din funcție dacă parolele nu se potrivesc
    }
    try {
      // Apelăm funcția de înregistrare și așteptăm rezultatul
      await registerUser(username, password);
      nextStep(); // Dacă înregistrarea este reușită, trecem la următorul pas
    } catch (error) {
      // Dacă înregistrarea eșuează, afișăm o eroare
      console.error(error);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-no-repeat object-fill bg-center bg-cover MainContainer">
      <div className="mx-auto flex flex-col items-center justify-center w-full h-full">
        <div className="ContainerInput">
          <StepInput
            value={username}
            onChange={handleUsernameChange}
            label={"STEP 6/9"}
            placeholder={"Please enter your username"}
          />
          <NextButton
            onPress={handleNextStep}
            type={"submit"}
            styleClass={"input-next"}
          />
        </div>
        <div className="ContainerInput">
          <StepInput
            value={password}
            onChange={handlePasswordChange}
            label={"STEP 7/9"}
            type={"password"}
            placeholder={"Please choose your password"}
          />
          <NextButton
            onPress={nextStep}
            type={"submit"}
            styleClass={"input-next"}
          />
        </div>
        <div className="ContainerInput">
          <StepInput
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            label={"STEP 8/9"}
            type={"password"}
            placeholder={"Please confirm your password"}
            styleClass={`input-wizard ${passwordMatch ? "" : "error"}`}
          />
          {!passwordMatch && (
            <p className="error-message">Parolele nu se potrivesc</p>
          )}
          <NextButton
            onPress={handleNextStep}
            type={"submit"}
            styleClass={"input-next"}
          />
        </div>
        <BackButton onPress={previousStep} styleClass={"back-button-5"} />
      </div>
    </div>
  );
};

export default CreateAccountStep;
