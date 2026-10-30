import { Outlet } from 'react-router-dom'
import { BarraApp, Navbar } from './Navbar'
import { useUi } from '../../store/ui'

export function PublicLayout() {
  return (
    <div className="min-h-svh bg-canvas">
      <Navbar />
      <Outlet />
    </div>
  )
}

export function AppShell() {
  return (
    <div className="min-h-svh bg-canvas">
      <BarraApp />
      <main className="mx-auto w-full max-w-[1180px] px-4 py-6 sm:px-6">
        <Outlet />
      </main>
    </div>
  )
}

export function Aviso() {
  const aviso = useUi((estado) => estado.aviso)
  const limpiar = useUi((estado) => estado.limpiarAviso)
  if (!aviso) return null
  return (
    <div className="fixed bottom-4 left-1/2 z-[200] w-[min(92vw,440px)] -translate-x-1/2 rounded-2xl bg-navy px-4 py-3 text-sm text-white shadow-lg">
      <div className="flex items-start justify-between gap-3">
        <p>{aviso}</p>
        <button type="button" className="shrink-0 font-bold" onClick={limpiar}>
          Cerrar
        </button>
      </div>
    </div>
  )
}
