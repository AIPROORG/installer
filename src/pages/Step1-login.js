import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Step1Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailValidated, setEmailValidated] = useState(false); // Noua stare pentru a verifica validarea emailului

  function LogUserIn(event) {
    event.preventDefault();
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      setEmailValidated(false); // Resetează validarea emailului dacă nu este valid
    } else {
      setEmailError("");
      setEmailValidated(true); // Marchează emailul ca validat
      console.log("Email is valid:", email);
      navigate("/step2");
      // Logica suplimentară după validarea emailului
    }
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  return (
    <div className="w-[100vw] h-[100vh] bg-no-repeat object-fill bg-center steps-background">
      <div className="mx-auto flex flex-col items-center justify-center w-full h-full">
        <div className="min-h-screen py-6 flex flex-col justify-center sm:py-12">
          <div className="relative py-3 sm:max-w-xl sm:mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-purple-400 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
            <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
              <div className="max-w-md mx-auto">
                <div>
                  <h1 className="text-2xl font-semibold">Login</h1>
                </div>
                <form onSubmit={LogUserIn}>
                  <div className="divide-y divide-gray-200">
                    <div className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                      <div className="relative">
                        <input
                          required
                          autoComplete="off"
                          id="username"
                          name="username"
                          type="text"
                          className={`peer placeholder-transparent h-10 w-full border-b-2 ${
                            emailValidated
                              ? "border-green-500"
                              : "border-gray-300"
                          } text-gray-900 focus:outline-none`}
                          placeholder="Email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <label
                          htmlFor="username"
                          className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                        >
                          Email Address
                        </label>
                        {emailError && (
                          <p className="text-red-500 text-sm mt-1">
                            {emailError}
                          </p>
                        )}
                      </div>
                      <div className="relative flex items-center justify-end">
                        <button
                          type="submit"
                          className={`text-white rounded-md px-2 py-1 ${
                            emailValidated ? "bg-green-500" : "bg-purple-500"
                          }`}
                        >
                          {emailValidated ? "OK" : "Submit"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1Login;
