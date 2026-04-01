import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { NewsContextProvider } from './context/NewsContext.jsx'
import { AuthContextProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <NewsContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </NewsContextProvider>
    </AuthContextProvider>
  </StrictMode>
)
