import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useEffect } from 'react'

// import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'

import Step0Import from './pages/Step0Import'
import Step1Login from './pages/Step1-login'
import Step2Role from './pages/Step2-role'
import Step3Cui from './pages/Step3-cui'
import CompanySetup from './pages/Step4-CompanySetup'
import Step5Organigram from './pages/Step5-organigram'
import SocialAuth from './pages/SocialAuth'
import storageComunicator from './utils/storageComunication'
import MultipartForm from './pages/MultipartForm'
import Import from './pages/Import'
import { endpoints } from './utils/endpoints'

function App() {
  
  useEffect(()=>{
    let authTokens = storageComunicator.authToken.get()
    
    const REFRESH_INTERVAL = 1000 * 60 * 4 // 4 minutes
    let interval = setInterval(()=>{
      console.log("interval for refresh token")
        if(authTokens){
            updateToken()
        }
    }, REFRESH_INTERVAL)
    return () => clearInterval(interval)

  },[])

  const updateToken = async () => {
    const authTokens = storageComunicator.authToken.get()
    if(!authTokens?.refresh) return
    const response = await fetch(endpoints.login.basic.updateToken, {
        method: 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify({refresh:authTokens?.refresh})
    })
  
    const data = await response.json()
    if (response.status === 200) {
        storageComunicator.authToken.set(data)
    } else {
          localStorage.removeItem('authTokens')
    }
  }

  
  
  return (
    <div className="App">
        <Router>
          <Header/>
            {/* <AuthProvider> */}
                <Routes>
                
                    <Route path="/multipartForm" element={<MultipartForm/>}/>
                    <Route path="/" element={<Step0Import/>}/>
                    <Route path="/step1" element={<Step1Login/>}/>
                    {/* <Route path="/step2" element={<Step2Role/>}/> */}
                    <Route path="/step3" element={<Step3Cui/>}/>
                    <Route path="/step4" element={<CompanySetup/>}/>
                    <Route path="/step5" element={<Step5Organigram/>}/>
                    <Route path="/import" element={<Import/>}/>
                    <Route path="/google" element={<SocialAuth/>}/>
                </Routes>
            {/* </AuthProvider> */}
        </Router>
    </div>
  );
}

export default App;
