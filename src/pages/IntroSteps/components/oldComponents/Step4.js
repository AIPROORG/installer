import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';

const Step4 = ( props ) =>
{
    const [ linkedInLink, setLinkedInLink ] = useState( '' );
    const [ facebookLink, setFacebookLink ] = useState( '' );
    const [ linkedInValid, setLinkedInValid ] = useState( true );
    const [ facebookValid, setFacebookValid ] = useState( true );

    const linkedInPattern = /^https?:\/\/(www\.)?linkedin\.com\/.*$/;
    const facebookPattern = /^https?:\/\/(www\.)?facebook\.com\/.*$/;

    const validateLinkedIn = () =>
    {
        const isValid = linkedInPattern.test( linkedInLink );
        setLinkedInValid( isValid );
        return isValid;
    };

    const validateFacebook = () =>
    {
        const isValid = facebookPattern.test( facebookLink );
        setFacebookValid( isValid );
        return isValid;
    };

    const handleNextStep = () =>
    {
        const isLinkedInValid = validateLinkedIn();
        const isFacebookValid = validateFacebook();

        if( isLinkedInValid && isFacebookValid )
        {
            props.nextStep();
        }
    };

    return (
        <div className="w-[100vw] h-[100vh] bg-no-repeat object-fill bg-center bg-cover MainContainer">
            <div className="mx-auto flex flex-col items-center justify-center w-full h-full">
                <div className="ContainerInput">
                    <p className="step-p">STEP 3/9</p>
                    <input
                        className="input-wizard"
                        type="text"
                        placeholder="Please enter your Linkedin profile link"
                        value={linkedInLink}
                        onChange={( e ) => setLinkedInLink( e.target.value )}
                        onBlur={validateLinkedIn}
                    />
                    {!linkedInValid && <p className="error-message">Please enter a valid LinkedIn URL.</p>}
                </div>
                <div className="ContainerInput">
                    <p className="step-p">STEP 4/9</p>
                    <input
                        className="input-wizard"
                        type="text"
                        placeholder="Please enter your Facebook profile link"
                        value={facebookLink}
                        onChange={( e ) => setFacebookLink( e.target.value )}
                        onBlur={validateFacebook}
                    />
                    {!facebookValid && <p className="error-message">Please enter a valid Facebook URL.</p>}
                </div>
                <div className="button-back-3">
                    <button className="back-button" onClick={props.previousStep}>
                        <FontAwesomeIcon icon={faAngleDoubleLeft} /> BACK
                    </button>
                </div>
                <div className="button-next-3">
                    <button className="next-button" onClick={handleNextStep}>
                        NEXT <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Step4;
