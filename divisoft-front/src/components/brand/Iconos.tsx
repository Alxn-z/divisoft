export function IconoCorazon({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21s-6.7-4.35-9.33-7.4C.8 11.4.9 8.1 3.1 6.3c2-1.6 4.7-1.2 6.2.5L12 9l2.7-2.2c1.5-1.7 4.2-2.1 6.2-.5 2.2 1.8 2.3 5.1.43 7.3C18.7 16.65 12 21 12 21z" />
    </svg>
  )
}

export function IconoHuella({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <ellipse cx="5.5" cy="9" rx="2.2" ry="2.8" />
      <ellipse cx="10" cy="5.5" rx="2.2" ry="2.8" />
      <ellipse cx="14.5" cy="5.5" rx="2.2" ry="2.8" />
      <ellipse cx="18.5" cy="9" rx="2.2" ry="2.8" />
      <path d="M12 10.5c-3.2 0-5.8 2.1-5.8 5.2 0 2.4 1.9 3.8 5.8 3.8s5.8-1.4 5.8-3.8c0-3.1-2.6-5.2-5.8-5.2z" />
    </svg>
  )
}

export function IconoBuscar({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
    </svg>
  )
}

export function IconoEscudo({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3l8 3.5v5.2c0 5-3.4 9.4-8 10.8-4.6-1.4-8-5.8-8-10.8V6.5L12 3z" fill="currentColor" opacity="0.15" />
      <path d="M12 3l8 3.5v5.2c0 5-3.4 9.4-8 10.8-4.6-1.4-8-5.8-8-10.8V6.5L12 3z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9.2 12.2l1.8 1.8 3.8-3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconoQr({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 3h8v8H3V3zm2 2v4h4V5H5zm8-2h8v8h-8V3zm2 2v4h4V5h-4zM3 13h8v8H3v-8zm2 2v4h4v-4H5zm10 0h2v2h-2v-2zm4 0h2v2h-2v-2zm-4 4h2v2h-2v-2zm2 2h2v2h-2v-2zm2-2h2v2h-2v-2zm0-4h2v2h-2v-2z" />
    </svg>
  )
}

export function IconoComunidad({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M2.5 19c0-3.2 2.9-5.5 6.5-5.5s6.5 2.3 6.5 5.5" />
      <path d="M13.5 19c.2-1.8 1.2-3.3 2.8-4.2 1.1-.6 2.4-.9 3.7-.8.9 1.1 1.5 2.5 1.5 4" />
    </svg>
  )
}

export function IconoPin({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C8.1 2 5 5.1 5 9c0 5.2 7 13 7 13s7-7.8 7-13c0-3.9-3.1-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 6a2.5 2.5 0 0 1 0 5.5z" />
    </svg>
  )
}

export function IconoCamion({ className = 'h-4 w-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M1 7h13v10H1zM14 10h4l3 3v4h-7V10z" strokeLinejoin="round" />
      <circle cx="5.5" cy="17.5" r="1.5" />
      <circle cx="17.5" cy="17.5" r="1.5" />
    </svg>
  )
}

export function IconoCorreo({ className = 'h-[18px] w-[18px]' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function IconoCandado({ className = 'h-[18px] w-[18px]' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="5" y="11" width="14" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
    </svg>
  )
}

export function IconoPersona({ className = 'h-[18px] w-[18px]' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
    </svg>
  )
}

export function IconoTelefono({ className = 'h-[18px] w-[18px]' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M6.5 4h3l1.5 5-2 1.5a11 11 0 0 0 5 5l1.5-2 5 1.5v3c0 .6-.4 1-1 1A14 14 0 0 1 3 5c0-.6.4-1 1-1z" strokeLinejoin="round" />
    </svg>
  )
}
