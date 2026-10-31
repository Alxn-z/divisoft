import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Menu, Moon, Sun, X } from 'lucide-react'

const enlaces = [
  ['Inicio', '/#inicio'],
  ['Servicios', '/servicios'],
  ['Proceso', '/#proceso'],
  ['Por qué Divisoft', '/#soluciones'],
  ['Contacto', '/#contacto'],
] as const

export function BarraPublica({ onHablemos }: { onHablemos?: () => void }) {
  const [menu, setMenu] = useState(false)

  return (
    <header className="wrap nav">
      <Link className="brand" to="/#inicio" aria-label="Divisoft, inicio" onClick={() => setMenu(false)}>
        <img className="logo-dark" src="/logo.jpg" alt="" />
        <img className="logo-light" src="/logo-light.png" alt="" />
      </Link>
      <nav className={menu ? 'open' : ''}>
        {enlaces.map(([texto, destino]) => (
          <Link key={destino} to={destino} onClick={() => setMenu(false)}>{texto}</Link>
        ))}
      </nav>
      <div className="nav-tools">
        <button
          className="theme-toggle"
          type="button"
          aria-label="Cambiar entre tema blanco y oscuro"
          onClick={() => {
            const next = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light'
            document.documentElement.dataset.theme = next
            try { localStorage.setItem('divisoft_tema', next) } catch { /* el tema sigue en la página */ }
          }}
        >
          <Sun className="icon-sun" size={16} />
          <Moon className="icon-moon" size={16} />
          <span className="label-light">Blanco</span>
          <span className="label-dark">Oscuro</span>
        </button>
        <button className="menu" aria-label={menu ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setMenu(!menu)}>{menu ? <X /> : <Menu />}</button>
        {onHablemos ? (
          <button className="button small nav-cta" onClick={onHablemos}>Hablemos <ArrowRight size={18} /></button>
        ) : (
          <Link className="button small nav-cta" to="/#contacto">Hablemos <ArrowRight size={18} /></Link>
        )}
      </div>
    </header>
  )
}
