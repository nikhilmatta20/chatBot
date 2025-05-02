import './App.css'
import LandingPage from './Pages/LandingPage';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import Dashboard from './Pages/Dashboard';
import ContactCenter from './Pages/ContactCenter';
import Teams from './Pages/Teams';
import Settings from './Pages/Settings';
import ChatBot from './Pages/ChatBot';
import Chart from './Pages/Chart';
// import Analytics from './Pages/Analytics';
// import { CustomizationProvider } from './context/CustomizationContext';

import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {

  return (
    
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<SignInPage />} />  
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/contact-center/:ticketId" element={<ContactCenter />} />
          <Route path="/contact-center" element={<ContactCenter />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/settings/:userId" element={<Settings />} />
          <Route path="/chatbot" element={<ChatBot />} />
          <Route path="/chart" element={<Chart />} />
          {/* <Route path="/chart" element={<Analytics />} /> */}
        </Routes>
      </BrowserRouter>
    
    

  );
}

export default App;
