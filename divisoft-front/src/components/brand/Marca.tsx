export function Logo({ className = 'h-10 w-10', trazo = '#2563EB' }: { className?: string; trazo?: string }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path
        d="M20 2C12.268 2 6 8.268 6 16c0 9.5 14 22 14 22s14-12.5 14-22c0-7.732-6.268-14-14-14Z"
        fill="#2563EB"
      />
      <path
        d="M20 11.5c-1.1 0-2 .7-2 1.7 0 1.2.9 2.3 2 2.3s2-1.1 2-2.3c0-1-.9-1.7-2-1.7Zm-4.2 3.2c-.9 0-1.6.6-1.6 1.4 0 .9.7 1.8 1.6 1.8s1.6-.9 1.6-1.8c0-.8-.7-1.4-1.6-1.4Zm8.4 0c-.9 0-1.6.6-1.6 1.4 0 .9.7 1.8 1.6 1.8s1.6-.9 1.6-1.8c0-.8-.7-1.4-1.6-1.4ZM16.4 20c-.8.9-.9 2.1-.2 3 .9 1.2 2.4 1.9 3.8 1.9s2.9-.7 3.8-1.9c.7-.9.6-2.1-.2-3-.8-.9-2-.9-3.6-.9s-2.8 0-3.6.9Z"
        fill="#fff"
      />
      <path d="M28.5 8.2c1.2.4 2.2 1.2 2.9 2.2M30.8 6.5c.9.9 1.5 2 1.8 3.2" stroke={trazo} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}

export function Marca({ clara = false }: { clara?: boolean }) {
  return (
    <span className="flex flex-col leading-[1.1]">
      <span className={`flex flex-col text-[1.35rem] font-extrabold tracking-tight ${clara ? 'text-white' : 'text-[#1e3a8a]'}`}>
        Divisoft
        <span className={`text-[0.7rem] font-semibold tracking-[0.12em] ${clara ? 'text-white/90' : 'text-slate-700'}`}>
          SOFTWARE
        </span>
      </span>
      <span className={`mt-0.5 hidden text-[0.55rem] font-medium tracking-wide whitespace-nowrap min-[1025px]:block ${clara ? 'text-white/70' : 'text-muted'}`}>
        — DESARROLLAMOS TU VISIÓN EN SOFTWARE —
      </span>
    </span>
  )
}
