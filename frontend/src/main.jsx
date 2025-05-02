import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ErrorBoundary from './ErrorBoundary';
import { ColorProvider } from './context/ColorContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ErrorBoundary>
    <ColorProvider>
     <App />
    </ColorProvider>   
  </ErrorBoundary>,
  </StrictMode>,
)
