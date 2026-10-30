import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/http'
import { useSesion } from '../../store/sesion'
import { useUi } from '../../store/ui'
import { rutas, type SesionApi } from '../../types/contrato'
import { textoError } from '../../lib/errores'
import { correoValido } from '../../lib/validar'
import { IconoCorreo } from '../../components/brand/Iconos'
import { AvisoFormulario, Campo, ClaveCampo } from '../../components/ui/Campo'
import { btnPrimario } from '../../components/ui/estilos'

interface Valores {
  correo: string
  password: string
  recordar: boolean
}

export function LoginForm() {
  const entrar = useSesion((estado) => estado.entrar)
  const mostrarAviso = useUi((estado) => estado.mostrarAviso)
  const navegar = useNavigate()

  return (
    <Formik<Valores>
      initialValues={{ correo: '', password: '', recordar: true }}
      validate={(valores) => {
        const errores: Partial<Record<keyof Valores, string>> = {}
        if (!valores.correo.trim()) errores.correo = 'El correo es necesario'
        else if (!correoValido(valores.correo)) errores.correo = 'El correo no es valido'
        if (!valores.password) errores.password = 'La contraseña es necesaria'
        return errores
      }}
      onSubmit={async (valores, { setStatus }) => {
        setStatus('')
        try {
          const sesion = await api<SesionApi>(rutas.login, {
            method: 'POST',
            data: { correo: valores.correo.trim(), password: valores.password },
          })
          entrar(sesion.token, valores.recordar)
          navegar('/app/perfil')
        } catch (fallo) {
          setStatus(textoError(fallo, 'No se pudo entrar'))
        }
      }}
    >
      {({ isSubmitting, status, values, setFieldValue }) => (
        <Form className="flex flex-col gap-4" noValidate>
          <Campo name="correo" label="Correo electrónico" type="email" autoComplete="email" placeholder="tu@correo.com" icono={<IconoCorreo />} />
          <ClaveCampo name="password" label="Contraseña" autoComplete="current-password" placeholder="••••••••" />
          <div className="flex flex-wrap items-center justify-between gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-600">
              <input
                type="checkbox"
                className="h-4 w-4 accent-brand"
                checked={values.recordar}
                onChange={(evento) => setFieldValue('recordar', evento.target.checked)}
              />
              Recordarme
            </label>
            <button
              type="button"
              className="text-sm font-semibold text-brand hover:underline"
              onClick={() => mostrarAviso('La recuperación de contraseña todavía no está disponible.')}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <AvisoFormulario status={status} />
          <button type="submit" className={`${btnPrimario} w-full`} disabled={isSubmitting}>
            {isSubmitting ? 'Entrando…' : 'Iniciar sesión'}
          </button>
        </Form>
      )}
    </Formik>
  )
}
