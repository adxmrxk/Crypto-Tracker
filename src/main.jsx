import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import router from './Routes'
import { RouterProvider } from "react-router-dom";


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <RouterProvider router={router} />

  </StrictMode>,
)
