import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AboutState from "./About/AboutState.jsx";

createRoot(document.getElementById('root')).render(
  <AboutState>
    <App />
  </AboutState>,
)
