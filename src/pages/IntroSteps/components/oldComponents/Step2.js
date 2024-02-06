import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDoubleRight, faAngleDoubleLeft } from '@fortawesome/free-solid-svg-icons';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const Step2 = (props) => {
    const [cuiCode, setCuiCode] = useState('');
    const [data, setData] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleInputChange = (event) => {
        setCuiCode(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch('https://django-rest-starter-production-e568.up.railway.app/api/organization/set_organization/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code: cuiCode }),
        });

        if (response.ok) {
            const jsonData = await response.json();
            setData(jsonData);
            setShowModal(true);
        } else {
            console.error('Eroare la solicitarea datelor:', response.statusText);
        }
    };

    const handleNextStep = () => {
        setShowModal(false); // Închide modalul
        props.nextStep(); // Apelarea funcției nextStep pasate prin props pentru a naviga la următorul pas
    };

    return (
        <div className="w-[100vw] h-[100vh] bg-no-repeat object-fill bg-center bg-cover MainContainer">
            <div className="mx-auto !min-h-[100vh] flex flex-col items-center justify-center w-full h-full">
                <h2 className="mb-[9rem] WizardHeading">Welcome to AIpro browser!</h2>
                <form onSubmit={handleSubmit} className="ContainerInput">
                    <p className="step-p">STEP 1/9</p>
                    <input
                        className="input-wizard"
                        type="text"
                        placeholder="Please enter your company CUI"
                        value={cuiCode}
                        onChange={handleInputChange}
                    />
                    <button className="input-next" type="submit">
                        NEXT <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </button>
                </form>
                <div className="button-back">
                    <button className="back-button" onClick={props.previousStep}>
                        <FontAwesomeIcon icon={faAngleDoubleLeft} /> BACK
                    </button>
                </div>
            </div>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Date API</Modal.Title>
                </Modal.Header>
                <Modal.Body>{data && <pre>{JSON.stringify(data, null, 2)}</pre>}</Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={handleNextStep}>
                        NEXT <FontAwesomeIcon icon={faAngleDoubleRight} />
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default Step2;
