import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Dice from './diceGame.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Dice/>
  </StrictMode>,
)
