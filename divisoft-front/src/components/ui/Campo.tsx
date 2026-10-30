import { useState, type ReactNode } from 'react'
import { ErrorMessage, Field } from 'formik'
import { campo, campoIcono, etiqueta } from './estilos'

interface CampoProps {
  name: string
  label: string
  type?: string
  placeholder?: string
  as?: 'input' | 'textarea' | 'select'
  autoComplete?: string
  icono?: ReactNode
  children?: ReactNode
  ayuda?: string
}

export function Campo({
  name,
  label,
  type = 'text',
  placeholder,
  as = 'input',
  autoComplete,
  icono,
  children,
  ayuda,
}: CampoProps) {
  const clase = `${icono ? campoIcono : campo} ${as === 'textarea' ? 'min-h-28 resize-y' : ''}`
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className={etiqueta}>
        {label}
      </label>
      <div className="relative flex items-center">
        {icono ? <span className="pointer-events-none absolute left-3.5 flex text-slate-400">{icono}</span> : null}
        <Field
          id={name}
          name={name}
          type={as === 'input' ? type : undefined}
          as={as === 'input' ? undefined : as}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={clase}
        >
          {children}
        </Field>
      </div>
      {ayuda ? <p className="text-xs text-muted">{ayuda}</p> : null}
      <ErrorMessage name={name} component="p" className="text-sm text-red-600" />
    </div>
  )
}

export function ClaveCampo({
  name,
  label,
  placeholder,
  autoComplete,
}: {
  name: string
  label: string
  placeholder?: string
  autoComplete?: string
}) {
  const [visible, setVisible] = useState(false)
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className={etiqueta}>
        {label}
      </label>
      <div className="relative flex items-center">
        <span className="pointer-events-none absolute left-3.5 flex text-slate-400">
          <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" strokeLinecap="round" />
          </svg>
        </span>
        <Field
          id={name}
          name={name}
          type={visible ? 'text' : 'password'}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`${campoIcono} pr-14`}
        />
        <button
          type="button"
          className="absolute right-2 inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-400 hover:bg-brand-soft hover:text-brand"
          onClick={() => setVisible((valor) => !valor)}
          aria-label={visible ? 'Ocultar contraseña' : 'Mostrar contraseña'}
        >
          {visible ? (
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M3 3l18 18M10.6 10.6a2 2 0 0 0 2.8 2.8" strokeLinecap="round" />
              <path d="M9.9 5.1A10.5 10.5 0 0 1 12 5c5 0 9.3 3.1 11 7.5a11.6 11.6 0 0 1-4.1 4.9M6.1 6.1A11.6 11.6 0 0 0 1 12.5C2.7 16.9 7 20 12 20c1.4 0 2.7-.2 4-.7" strokeLinecap="round" />
            </svg>
          ) : (
            <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <path d="M1 12.5C2.7 8.1 7 5 12 5s9.3 3.1 11 7.5C21.3 16.9 17 20 12 20S2.7 16.9 1 12.5z" />
              <circle cx="12" cy="12.5" r="3" />
            </svg>
          )}
        </button>
      </div>
      <ErrorMessage name={name} component="p" className="text-sm text-red-600" />
    </div>
  )
}

export function AvisoFormulario({ status }: { status?: string }) {
  if (!status) return null
  return <p className="text-sm font-medium text-red-600">{status}</p>
}

export function MensajeOk({ texto }: { texto: string }) {
  if (!texto) return null
  return <p className="text-sm font-medium text-emerald-700">{texto}</p>
}
