import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const HUELLAS =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cg fill='%23ffffff'%3E%3Cellipse cx='30' cy='28' rx='7' ry='9'/%3E%3Cellipse cx='48' cy='18' rx='7' ry='9'/%3E%3Cellipse cx='66' cy='18' rx='7' ry='9'/%3E%3Cellipse cx='84' cy='28' rx='7' ry='9'/%3E%3Cpath d='M57 40c-12 0-22 8-22 19 0 9 7 14 22 14s22-5 22-14c0-11-10-19-22-19z'/%3E%3C/g%3E%3C/svg%3E\")"

interface AccesoProps {
  titulo: ReactNode
  lead: string
  ventajas: string[]
  icono: ReactNode
  encabezado: string
  subtitulo: string
  pie: ReactNode
  amplia?: boolean
  children: ReactNode
}

export function Acceso({ titulo, lead, ventajas, icono, encabezado, subtitulo, pie, amplia, children }: AccesoProps) {
  return (
    <div className="grid min-h-svh bg-canvas lg:grid-cols-[1.05fr_0.95fr]">
      <section
        className="relative hidden overflow-hidden px-12 py-12 text-white lg:flex lg:items-center"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 20% 20%, rgba(147, 197, 253, 0.35), transparent 55%), radial-gradient(ellipse 60% 45% at 90% 80%, rgba(99, 102, 241, 0.28), transparent 50%), linear-gradient(145deg, #0b1f4a 0%, #1e3a8a 45%, #2563eb 100%)',
        }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-[0.07]" style={{ backgroundImage: HUELLAS, backgroundSize: '140px 140px' }} />
        <div className="relative z-[1] max-w-[440px]">
          <Link to="/" className="mb-10 inline-flex items-center gap-3 text-white">
            <img src="/logo-light.png" alt="" className="h-16 w-auto" />
          </Link>
          <h1 className="text-[clamp(1.85rem,3vw,2.5rem)] leading-[1.15] font-extrabold tracking-tight text-white">
            {titulo}
          </h1>
          <p className="mt-4 text-[1.02rem] leading-relaxed text-white/80">{lead}</p>
          <ul className="mt-8 flex flex-col gap-3.5">
            {ventajas.map((texto) => (
              <li key={texto} className="flex items-center gap-3 text-[0.95rem] font-medium text-white/90">
                <span className="inline-flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] bg-white/15 text-blue-200">
                  {icono}
                </span>
                {texto}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        className="flex min-h-svh items-center justify-center px-5 py-6"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 90% 10%, rgba(37, 99, 235, 0.08), transparent 55%), linear-gradient(180deg, #f8fafc 0%, #eef3ff 100%)',
        }}
      >
        <div className={`w-full rounded-3xl border border-blue-100 bg-white p-6 shadow-[0_16px_40px_rgba(37,99,235,0.08)] sm:p-8 ${amplia ? 'max-w-[460px]' : 'max-w-[420px]'}`}>
          <Link to="/" className="mb-5 inline-block text-sm font-semibold text-brand hover:underline">
            ← Volver al inicio
          </Link>
          <div className="mb-5 flex items-center gap-2.5 font-extrabold text-navy lg:hidden">
            <img src="/logo-light.png" alt="" className="h-12 w-auto" />
            <span>Divisoft</span>
          </div>
          <header className="mb-6">
            <h2 className="text-[1.75rem] font-extrabold tracking-tight text-navy">{encabezado}</h2>
            <p className="mt-1.5 text-muted">{subtitulo}</p>
          </header>
          {children}
          <p className="mt-6 text-center text-[0.92rem] text-muted">{pie}</p>
        </div>
      </section>
    </div>
  )
}
