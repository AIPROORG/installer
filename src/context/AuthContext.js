import { createContext, useState, useEffect } from "react";
import jwtDecode from "jwt-decode";
import { endpoints } from "../api/endpoints";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwtDecode(localStorage.getItem("authTokens"))
      : null
  );
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const loginUser = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (username === "" || password === "") {
      // Gestionarea cazurilor în care username-ul sau parola sunt goale
      return;
    }

    try {
      const response = await fetch(endpoints.login.basic.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Authentication failed");
      }

      const data = await response.json();
      localStorage.setItem("authTokens", JSON.stringify(data));
      setAuthTokens(data);
      setUser(jwtDecode(data.access));

      // Verifică dacă utilizatorul este administrator
      await checkAdminStatus(data.access);
    } catch (error) {
      console.error("Login Error:", error);
      alert("Login failed. Please check your credentials.");
    }
  };

  const checkAdminStatus = async (accessToken) => {
    try {
      const response = await fetch(endpoints.admin.checkStatus, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to verify admin status");
      }

      const data = await response.json();
      setIsAdmin(!!data.is_admin);

      if (data.is_admin) {
        navigate("/admin-panel"); // Redirecționează către panoul de control al administratorului
      }
    } catch (error) {
      console.error("Admin Check Error:", error);
    }
  };

  const logoutUser = () => {
    localStorage.removeItem("authTokens");
    setAuthTokens(null);
    setUser(null);
    setIsAdmin(false);
  };

  // Omiterea funcției updateToken și useEffect pentru simplitate

  let contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
    isAdmin,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};

export default AuthContext;
