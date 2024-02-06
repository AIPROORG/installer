import React, { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDoubleRight } from "@fortawesome/free-solid-svg-icons";

import { BackButton, NextButton, StepInput } from "../../../components";
import requestService from "../../../services/requestService";
import { endpoints } from "../../../api/endpoints";

const ValidateCUIStep = ({ previousStep, nextStep }) => {
  const [cuiCode, setCuiCode] = useState(localStorage.getItem("cuiCode") || "");
  const [companyName, setCompanyName] = useState(
    localStorage.getItem("companyName") || ""
  );

  useEffect(() => {
    localStorage.setItem("cuiCode", cuiCode);
    localStorage.setItem("companyName", companyName);
  }, [cuiCode, companyName]);

  const [showModal, setShowModal] = useState(false);

  const { getRequest } = requestService();

  const handleGoBack = () => {
    previousStep?.();
  };

  const handleGoNext = async () => {
    try {
      console.log(endpoints.anaf.checkCUI(cuiCode));
      const url = endpoints.anaf.checkCUI(cuiCode);
      const response = await getRequest({ endpoint: url });
      console.log("Response:", JSON.stringify(response));
      if (response != null) {
        if (response.nume_companie != null && response.nume_companie !== "") {
          console.log("JSON Data:", response);
          setCompanyName(response.nume_companie);
          setShowModal(true);
        } else {
          alert("Numele companiei nu este disponibil pentru CUI-ul introdus.");
        }
      }
    } catch (e) {
      console.error("Eroare la procesarea solicitării:", e);
      alert(
        "A apărut o eroare la verificarea CUI-ului. Vă rugăm să încercați din nou."
      );
    }
  };

  const handleInputChange = (event) => {
    // Dacă utilizatorul a început să introducă un nou CUI, ștergem numele companiei
    setCompanyName("");
    setCuiCode(event.target.value);
  };

  const handleCompanyNameChange = (event) => {
    // Dacă utilizatorul a început să introducă un nou CUI, ștergem numele companiei
    setCompanyName(event.target.value);
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-no-repeat object-fill bg-center bg-cover MainContainer">
      <div className="mx-auto !min-h-[100vh] flex flex-col items-center justify-center w-full h-full">
        <h2 className="mb-[9rem] WizardHeading">Welcome to AIpro browser!</h2>
        <form onSubmit={(e) => e.preventDefault()} className="ContainerInput">
          <StepInput
            value={cuiCode}
            onChange={handleInputChange}
            label={"STEP 1/9"}
            placeholder={"Please enter your company CUI"}
          />
          <NextButton
            onPress={handleGoNext}
            type={"submit"}
            styleClass={"input-next"}
          />
        </form>
        <BackButton onPress={handleGoBack} styleClass={"button-back"} />
        {companyName && (
          <div>
            {/* Afișăm numele companiei numai dacă este disponibil */}
            <p>Company Name: {companyName}</p>
          </div>
        )}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Company found successfully!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {companyName && (
            <StepInput
              value={companyName}
              onChange={handleCompanyNameChange}
              label={"Your company name: "}
              placeholder={"Please enter or edit your company name"}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              setShowModal(false);
              nextStep();
            }}
          >
            NEXT <FontAwesomeIcon icon={faAngleDoubleRight} />
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ValidateCUIStep;
