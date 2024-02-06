import React, { createContext, useState, useEffect, useContext } from "react";

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [cuiCode, setCuiCode] = useState(localStorage.getItem("cuiCode") || "");
  const [companyName, setCompanyName] = useState(
    localStorage.getItem("companyName") || ""
  );
  const [currentStep, setCurrentStep] = useState(
    parseInt(localStorage.getItem("currentStep"), 10) || 1
  );

  useEffect(() => {
    localStorage.setItem("cuiCode", cuiCode);
    localStorage.setItem("companyName", companyName);
    localStorage.setItem("currentStep", currentStep.toString());
  }, [cuiCode, companyName, currentStep]);

  return (
    <AppContext.Provider
      value={{
        cuiCode,
        setCuiCode,
        companyName,
        setCompanyName,
        currentStep,
        setCurrentStep,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
