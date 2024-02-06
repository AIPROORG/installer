import React from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

import "../styles/GoogleLoginButton.css";

const GoogleLoginButton = ({ onSuccessLogin, onErrorLogin }) => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => onSuccessLogin?.(codeResponse),
    onError: (error) => onErrorLogin?.(error),
  });

  return (
    <button onClick={() => login()} className="google-login-button">
      <FontAwesomeIcon icon={faGoogle} color="white" />
    </button>
  );
};

export default GoogleLoginButton;
