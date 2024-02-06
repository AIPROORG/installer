import { GoogleOAuthProvider } from "@react-oauth/google";
import IntroStepsPage from "./pages/IntroSteps/IntroStepsPage";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <div className="App">
        <IntroStepsPage />
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
