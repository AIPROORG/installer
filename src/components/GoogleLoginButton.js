import {React, useState} from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const GoogleLoginButton = ({ onSuccessLogin, onErrorLogin }) => {
  const [googleLogin, setGoogleLogin] = useState(false);


  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      onSuccessLogin?.(codeResponse)
      setGoogleLogin(true);
    },
    onError: (error) => onErrorLogin?.(error),
  });

  return (
    <div className=" flex flex-col items-center justify-center space-y-4 ">
      <h1 className="text-white text-xl">Link Google account</h1>
      <button onClick={() => login()} className={`${googleLogin ? "bg-green-100" : ""} rounded-full p-2 px-3  border shadow-[0_0_10px_rgba(255,255,255,07)]`}>
        <FontAwesomeIcon icon={faGoogle} color={googleLogin ? "gray" : "white"} />
      </button>
    </div>
  );
};

export default GoogleLoginButton;
