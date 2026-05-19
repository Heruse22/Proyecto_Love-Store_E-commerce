import { StrictMode, useState } from 'react'  
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './styles/main.css'
import App from './App.jsx'
import Login from './pages/Login.jsx'
import Registro from './pages/Registro.jsx'
import Checkout from './pages/Checkout.jsx'
import useAuthStore from './store/authStore.js'

function Root() {
  const inicializarAuth = useAuthStore(state => state.inicializarAuth)

  useState(() => {
    const unsubscribe = inicializarAuth()
    return () => unsubscribe?.()
  })

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  )
}

// ✅ <Root /> adentro del render
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Root />
  </StrictMode>,
)