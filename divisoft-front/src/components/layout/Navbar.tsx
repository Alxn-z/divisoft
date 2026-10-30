import { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Logo, Marca } from '../brand/Marca'
import { useSesion } from '../../store/sesion'
import { useUi } from '../../store/ui'

const ENLACES = [
  { label: 'Inicio', to: '/' },
  { label: 'Servicios', to: '/#servicios' },
  { label: 'Software', to: '/#proceso' },
  { label: 'Soluciones', to: '/#soluciones' },
  { label: 'Contacto', to: '/#contacto' },
]

function activo(pathname: string, to: string) {
  if (to === '/') return pathname === '/'
  if (to.startsWith('/#')) return false
  return pathname === to
}

export function Navbar() {
  const abierto = useUi((estado) => estado.menuAbierto)
  const alternar = useUi((estado) => estado.alternarMenu)
  const cerrar = useUi((estado) => estado.cerrarMenu)
  const token = useSesion((estado) => estado.token)
  const salir = useSesion((estado) => estado.salir)
  const { pathname } = useLocation()
  const navegar = useNavigate()

  useEffect(() => {
    cerrar()
  }, [pathname, cerrar])

  return (
    <header className="sticky top-0 z-[100] w-full border-b border-line bg-white">
      <div className="relative mx-auto flex max-w-[1200px] items-center justify-between gap-6 px-6 py-3.5">
        <Link to="/" className="flex shrink-0 items-center gap-2.5" aria-label="Divisoft" onClick={cerrar}>
          <Logo />
          <Marca />
        </Link>

        <button
          type="button"
          className="flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg xl:hidden"
          aria-expanded={abierto}
          aria-controls="menu-principal"
          aria-label={abierto ? 'Cerrar menú' : 'Abrir menú'}
          onClick={alternar}
        >
          <span className="block h-0.5 w-full rounded-full bg-slate-800" />
          <span className="block h-0.5 w-full rounded-full bg-slate-800" />
          <span className="block h-0.5 w-full rounded-full bg-slate-800" />
        </button>

        <div
          id="menu-principal"
          className={`${abierto ? 'flex' : 'hidden'} absolute top-full right-0 left-0 flex-col gap-4 border-b border-line bg-white px-6 py-4 shadow-[0_8px_24px_rgba(15,23,42,0.08)] xl:static xl:flex xl:flex-1 xl:flex-row xl:items-center xl:justify-end xl:gap-7 xl:border-0 xl:bg-transparent xl:p-0 xl:shadow-none`}
        >
          <nav className="xl:flex xl:flex-1 xl:justify-center" aria-label="Principal">
            <ul className="flex flex-col gap-1 xl:flex-row xl:items-center xl:gap-5 min-[1025px]:gap-[1.35rem]">
              {ENLACES.map((enlace) => {
                const esActivo = activo(pathname, enlace.to)
                return (
                  <li key={enlace.label}>
                    <Link
                      to={enlace.to}
                      onClick={cerrar}
                      className={`relative inline-block py-2.5 text-[0.95rem] whitespace-nowrap xl:py-1.5 xl:text-[0.82rem] min-[1025px]:text-sm ${esActivo ? 'font-semibold text-brand after:absolute after:right-0 after:bottom-0 after:left-0 after:hidden after:h-0.5 after:rounded-sm after:bg-brand xl:after:block' : 'font-medium text-slate-800 hover:text-brand'}`}
                    >
                      {enlace.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex w-full shrink-0 flex-col gap-2.5 xl:w-auto xl:flex-row">
            {token ? (
              <>
                <Link to="/app/perfil" onClick={cerrar} className="inline-flex items-center justify-center rounded-[10px] border-[1.5px] border-brand px-4 py-2 text-sm font-semibold whitespace-nowrap text-brand hover:bg-brand/5">
                  Mi perfil
                </Link>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-[10px] border-[1.5px] border-brand bg-brand px-4 py-2 text-sm font-semibold whitespace-nowrap text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)] hover:border-brand-dark hover:bg-brand-dark"
                  onClick={() => {
                    salir()
                    cerrar()
                    navegar('/')
                  }}
                >
                  Salir
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={cerrar} className="inline-flex items-center justify-center rounded-[10px] border-[1.5px] border-brand px-4 py-2 text-sm font-semibold whitespace-nowrap text-brand hover:bg-brand/5">
                  Iniciar sesión
                </Link>
                <Link to="/registro" onClick={cerrar} className="inline-flex items-center justify-center rounded-[10px] border-[1.5px] border-brand bg-brand px-4 py-2 text-sm font-semibold whitespace-nowrap text-white shadow-[0_4px_12px_rgba(37,99,235,0.25)] hover:border-brand-dark hover:bg-brand-dark">
                  Registrarse
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

const APP = [
  { to: '/app/perfil', label: 'Perfil' },
]

export function BarraApp() {
  const salir = useSesion((estado) => estado.salir)
  const navegar = useNavigate()

  return (
    <header className="sticky top-0 z-[100] border-b border-line bg-white">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link to="/" className="flex items-center gap-2" aria-label="Divisoft, inicio">
          <img src="/logo-light.png" alt="" className="h-12 w-auto" />
        </Link>
        <nav className="order-3 flex w-full flex-wrap gap-x-4 gap-y-2 md:order-none md:w-auto" aria-label="Cuenta">
          {APP.map((enlace) => (
            <NavLink
              key={enlace.to}
              to={enlace.to}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? 'font-semibold text-brand' : 'text-slate-800 hover:text-brand'}`
              }
            >
              {enlace.label}
            </NavLink>
          ))}
        </nav>
        <button
          type="button"
          className="text-sm font-semibold text-brand"
          onClick={() => {
            salir()
            navegar('/')
          }}
        >
          Salir
        </button>
      </div>
    </header>
  )
}
