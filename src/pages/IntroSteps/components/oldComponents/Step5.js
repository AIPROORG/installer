import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

const Step5 = (props) => {
  const [value, setValue] = useState('');
  const [phoneValid, setPhoneValid] = useState(true);

  const handleNextStep = () => {
    if (isValidPhoneNumber(value)) {
      const phoneNumber = value;

      fetch('url_backend', {
        method: 'POST',
        body: JSON.stringify({ phoneNumber }),
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
        });

      props.nextStep();
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
            onChange={setValue}
            error={value ? (isValidPhoneNumber(value) ? undefined : 'Invalid phone number') : 'Phone number required'}
          />
          {!phoneValid && <p className="error-message">Please enter a valid phone number.</p>}
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
};

export default Step5;
