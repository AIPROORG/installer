import React from 'react';

const Step1 = ( props ) =>
{

  return (
    <div className="w-[100vw] h-[100vh] bg-no-repeat object-fill bg-center bg-cover MainContainer">
      <div className="mx-auto flex flex-col items-center justify-center w-full h-full">
        <h2 class="mb-[2rem] WizardHeading">Step 1</h2>
        <button onClick={props.nextStep} id="" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
          Company
        </button>
        <button id="" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Freelancer</button>
      </div>
    </div>
  );
}

export default Step1;