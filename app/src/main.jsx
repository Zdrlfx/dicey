import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Dictaphone from './speech.jsx'
import Num from './num.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <>
    <Num />
    </>
  </StrictMode>,
)
