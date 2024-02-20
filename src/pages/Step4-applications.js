import React, { useContext, useState, useEffect } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import AuthContext from "../context/AuthContext";

const Step4Applications = () => {
  const { setAuthTokens, isAdmin } = useContext(AuthContext);
  const [userList, setUserList] = useState([]);
  const [showUserList, setShowUserList] = useState(false);

  useEffect(() => {
    if (isAdmin && showUserList) {
      fetchUserList(); // Fetch the user list only if the user is an admin and has requested to see the user list
    }
  }, [isAdmin, showUserList]);

  const handleSuccessGoogleLogin = async (response) => {
    console.log("Google login response:", response);
    // Here you would send the Google token to your server for validation and to set the authentication tokens
    // Example:
    // const serverResponse = await fetch('YOUR_BACKEND_ENDPOINT_FOR_AUTH', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ token: response.credential }),
    // });
    // const data = await serverResponse.json();
    // setAuthTokens(data.tokens); // Assuming your server responds with the authentication tokens
    // setIsAdmin(data.is_admin); // Assuming your server also responds with the admin status
  };

  const handleFailureGoogleLogin = (error) => {
    console.error("Google login error:", error);
    // Handle the authentication error here
  };

  const fetchUserList = async () => {
    // Implement the logic to fetch the user list from Google Workspace via your backend
    // Example:
    // const response = await fetch('YOUR_BACKEND_ENDPOINT_FOR_USER_LIST', {
    //   method: 'GET',
    //   headers: { Authorization: `Bearer ${authTokens.access}` },
    // });
    // const data = await response.json();
    // setUserList(data.users); // Assuming your backend responds with a list of users
  };

  const toggleUserList = () => {
    setShowUserList(!showUserList);
  };

  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="steps-background flex items-center justify-center space-x-2">
        <div className="bg-gradient-to-r to-purple-400 from-purple-500 bg-purple-500 p-4 flex rounded-xl space-x-4">
          <GoogleLogin
            onSuccess={handleSuccessGoogleLogin}
            onError={handleFailureGoogleLogin}
          />
          {isAdmin && (
            <button
              onClick={toggleUserList}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              {showUserList ? "Ascunde" : "Arată"} Lista Utilizatorilor
            </button>
          )}
        </div>
        {showUserList && isAdmin && (
          <div className="user-list bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2>Lista Utilizatorilor din Google Workspace</h2>
            <ul>
              {userList.map((user, index) => (
                <li key={index}>
                  {user.name} - {user.email}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default Step4Applications;
