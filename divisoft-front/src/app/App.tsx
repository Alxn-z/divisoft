import { useEffect, type ReactNode } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useSesion } from '../store/sesion'
import { Aviso, AppShell } from '../components/layout/Marcos'
import { LandingPage } from '../pages/LandingPage'
import { LoginPage } from '../pages/LoginPage'
import { RegistroPage } from '../pages/RegistroPage'
import { PerfilPage } from '../pages/PerfilPage'

function Privada({ children }: { children: ReactNode }) {
  const token = useSesion((estado) => estado.token)
  if (!token) return <Navigate to="/login" replace />
  return children
}

function ScrollArriba() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
      return
    }
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

function Rutas() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/registro" element={<RegistroPage />} />
      <Route
        path="/app"
        element={
          <Privada>
            <AppShell />
          </Privada>
        }
      >
        <Route index element={<PerfilPage />} />
        <Route path="perfil" element={<PerfilPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollArriba />
      <Rutas />
      <Aviso />
    </BrowserRouter>
  )
}
