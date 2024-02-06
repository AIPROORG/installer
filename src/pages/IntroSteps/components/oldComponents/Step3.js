import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

const Step3 = (props) => {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);

  const emailRegex = /\S+@\S+\.\S+/;

  const validateEmail = (email) => {
    return emailRegex.test(email);
  };

  const handleNextStep = () => {
    if (validateEmail(email)) {
      setIsEmailValid(true);
      
      props.nextStep();
    } else {
      setIsEmailValid(false);
    }
  };

  return (
    <div className="w-[100vw] h-[100vh] bg-no-repeat object-fill bg-center bg-cover MainContainer">
      <div className="mx-auto flex flex-col items-center justify-center w-full h-full">
        <div className="ContainerInput">
          <p className="step-p">STEP 2/9</p>
          <input
            className="input-wizard"
            type="email"
            placeholder="Please enter company admin email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!isEmailValid && <p className="error-message">Please enter a valid email address.</p>}
          <button className="input-next" onClick={handleNextStep} type="button">
            NEXT <FontAwesomeIcon icon={faAngleDoubleRight} />
          </button>
        </div>
        <div className="button-back-2">
          <button className="back-button" onClick={props.previousStep}>
            <FontAwesomeIcon icon={faAngleDoubleLeft} /> BACK
          </button>
        </div>
      </div>
    </div>
  );
}

export default Step3;
