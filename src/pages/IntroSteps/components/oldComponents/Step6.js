import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import React, { useState, useEffect } from 'react';

const Step6 = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatch, setPasswordMatch] = useState(true);
  
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
  
    const handleNextStep = () => {
      if (password === confirmPassword) {
        props.nextStep();
      } else {
        console.log('Parolele nu se potrivesc');
      }
    };
  
    return (
      <div className="w-[100vw] h-[100vh] bg-no-repeat object-fill bg-center bg-cover MainContainer">
        <div className="mx-auto flex flex-col items-center justify-center w-full h-full">
          <div className="ContainerInput">
            <p className="step-p">STEP 6/9</p>
            <input
              className="input-wizard"
              type="text"
              placeholder="Please enter your username"
              value={username}
              onChange={handleUsernameChange}
            />
            <button className="input-next" onClick={handleNextStep} type="submit">
              NEXT <FontAwesomeIcon icon={faAngleDoubleRight} />
            </button>
          </div>
          <div className="ContainerInput">
            <p className="step-p">STEP 7/9</p>
            <input
              className="input-wizard"
              type="password" 
              placeholder="Please choose your password"
              value={password}
              onChange={handlePasswordChange}
            />
            <button className="input-next" onClick={props.nextStep} type="submit">
              NEXT <FontAwesomeIcon icon={faAngleDoubleRight} />
            </button>
          </div>
          <div className="ContainerInput">
            <p className="step-p">STEP 8/9</p>
            <input
              className={`input-wizard ${passwordMatch ? '' : 'error'}`}
              type="password"
              placeholder="Please confirm your password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
            />
            {!passwordMatch && <p className="error-message">Parolele nu se potrivesc</p>}
            <button className="input-next" onClick={handleNextStep} type="submit">
              NEXT <FontAwesomeIcon icon={faAngleDoubleRight} />
            </button>
          </div>
          <div className="back-button-5">
            <button className="back-button" onClick={props.previousStep}>
              <FontAwesomeIcon icon={faAngleDoubleLeft} /> BACK
            </button>
          </div>
        </div>
      </div>
    );
  };

export default Step6;