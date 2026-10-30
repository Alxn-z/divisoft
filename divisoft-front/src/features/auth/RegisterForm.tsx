import { Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { api } from '../../services/http'
import { useSesion } from '../../store/sesion'
import { useUi } from '../../store/ui'
import { rutas, type Esquemas, type SesionApi } from '../../types/contrato'
import { textoError } from '../../lib/errores'
import { AVISO_CLAVE, REGEX_CLAVE, correoValido } from '../../lib/validar'
import { IconoCorreo, IconoPersona, IconoTelefono } from '../../components/brand/Iconos'
import { AvisoFormulario, Campo, ClaveCampo } from '../../components/ui/Campo'
import { btnPrimario } from '../../components/ui/estilos'

interface Valores {
  nombre: string
  correo: string
  telefono: string
  password: string
  confirmar: string
  terminos: boolean
}

export function RegisterForm() {
  const entrar = useSesion((estado) => estado.entrar)
  const mostrarAviso = useUi((estado) => estado.mostrarAviso)
  const navegar = useNavigate()

  return (
    <Formik<Valores>
      initialValues={{ nombre: '', correo: '', telefono: '', password: '', confirmar: '', terminos: false }}
      validate={(valores) => {
        const errores: Partial<Record<keyof Valores, string>> = {}
        if (!valores.nombre.trim()) errores.nombre = 'El nombre es necesario'
        if (!valores.correo.trim()) errores.correo = 'El correo es necesario'
        else if (!correoValido(valores.correo)) errores.correo = 'El correo no es valido'
        if (!/^[0-9]{10}$/.test(valores.telefono.trim())) errores.telefono = 'El telefono debe tener 10 digitos'
        if (!REGEX_CLAVE.test(valores.password)) errores.password = AVISO_CLAVE
        if (valores.confirmar !== valores.password) errores.confirmar = 'Las contraseñas no coinciden'
        if (!valores.terminos) errores.terminos = 'Acepta los términos para crear la cuenta'
        return errores
      }}
      onSubmit={async (valores, { setStatus }) => {
        setStatus('')
        const cuerpo: Pick<Esquemas['CreateUserDto'], 'nombre' | 'telefono' | 'correo' | 'password'> = {
          nombre: valores.nombre.trim(),
          telefono: valores.telefono.trim(),
          correo: valores.correo.trim(),
          password: valores.password,
        }
        try {
          const sesion = await api<SesionApi>(rutas.registro, { method: 'POST', data: cuerpo })
          entrar(sesion.token, true)
          navegar('/app/perfil')
        } catch (fallo) {
          setStatus(textoError(fallo, 'No se pudo crear la cuenta'))
        }
      }}
    >
      {({ isSubmitting, status, values, setFieldValue, errors, touched }) => (
        <Form className="flex flex-col gap-4" noValidate>
          <Campo name="nombre" label="Nombre completo" autoComplete="name" placeholder="Tu nombre" icono={<IconoPersona />} />
          <Campo name="correo" label="Correo electrónico" type="email" autoComplete="email" placeholder="tu@correo.com" icono={<IconoCorreo />} />
          <Campo
            name="telefono"
            label="Teléfono"
            autoComplete="tel"
            placeholder="3001234567"
            icono={<IconoTelefono />}
            ayuda="10 dígitos, sin espacios."
          />
          <ClaveCampo name="password" label="Contraseña" autoComplete="new-password" placeholder="Mínimo 8 caracteres" />
          <p className="-mt-2 text-xs text-muted">{AVISO_CLAVE}</p>
          <ClaveCampo name="confirmar" label="Confirmar contraseña" autoComplete="new-password" placeholder="Repite tu contraseña" />
          <label className="flex items-start gap-2 text-sm leading-snug text-slate-600">
            <input
              type="checkbox"
              className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
              checked={values.terminos}
              onChange={(evento) => setFieldValue('terminos', evento.target.checked)}
            />
            <span>
              Acepto los{' '}
              <button type="button" className="font-semibold text-brand hover:underline" onClick={() => mostrarAviso('Los términos se publicarán junto con la política de privacidad.')}>
                términos y condiciones
              </button>{' '}
              y la{' '}
              <button type="button" className="font-semibold text-brand hover:underline" onClick={() => mostrarAviso('La política de privacidad se publicará más adelante.')}>
                política de privacidad
              </button>
            </span>
          </label>
          {touched.terminos && errors.terminos ? <p className="text-sm text-red-600">{errors.terminos}</p> : null}
          <AvisoFormulario status={status} />
          <button type="submit" className={`${btnPrimario} w-full`} disabled={isSubmitting}>
            {isSubmitting ? 'Creando cuenta…' : 'Crear cuenta'}
          </button>
        </Form>
      )}
    </Formik>
  )
}
