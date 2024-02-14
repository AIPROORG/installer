import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import { AuthProvider } from './context/AuthContext'
import Header from './components/Header'

import Step0Import from './pages/Step0Import'
import Step1Login from './pages/Step1-login'
import Step2Role from './pages/Step2-role'
import Step3Cui from './pages/Step3-cui'
import Step4Applications from './pages/Step4-applications'


function App() {
  return (
    <div className="App">
        <Router>
          <Header/>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<Step0Import/>}/>
                    {/* <Route path="/step0" element={<div>a;jdfhlkajsdfhalkjshdgfkjashgd</div>}/> */}
                    <Route path="/step1" element={<Step1Login/>}/>
                    <Route path="/step2" element={<Step2Role/>}/>
                    <Route path="/step3" element={<Step3Cui/>}/>
                    <Route path="/step4" element={<Step4Applications/>}/>
                </Routes>
            </AuthProvider>
        </Router>
    </div>
  );
}

export default App;
