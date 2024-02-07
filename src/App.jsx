import React from "react";
import { BrowserRouter as Router } from "react-router-dom"; // Importăm BrowserRouter și îl redenumim în Router pentru a fi mai ușor de utilizat
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "./services/AuthContext"; // Importăm AuthProvider
import IntroStepsPage from "./pages/IntroSteps/IntroStepsPage";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <Router>
        {" "}
        {/* Învelim totul în Router */}
        <AuthProvider>
          {" "}
          {/* AuthProvider vine în interiorul Router pentru a permite navigarea în contextul autentificării */}
          <div className="App">
            <IntroStepsPage />{" "}
            {/* Aceasta este pagina principală sau componenta pe care doriți să o afișați; asigurați-vă că gestionarea rutelor este implementată aici dacă este necesar */}
          </div>
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
  );
}

export default App;
