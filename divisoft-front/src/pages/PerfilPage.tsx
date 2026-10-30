import { useEffect, useState } from 'react'
import { Form, Formik } from 'formik'
import { api } from '../services/http'
import { rutas, type Esquemas, type Perfil } from '../types/contrato'
import { textoError } from '../lib/errores'
import { AVISO_CLAVE, REGEX_CLAVE, correoValido } from '../lib/validar'
import { AvisoFormulario, Campo, ClaveCampo, MensajeOk } from '../components/ui/Campo'
import { btnPrimario, tituloPagina } from '../components/ui/estilos'

export function PerfilPage() {
  const [perfil, setPerfil] = useState<Perfil | null>(null)
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let vivo = true
    api<Perfil>(rutas.perfil)
      .then((dato) => {
        if (vivo) setPerfil(dato)
      })
      .catch((fallo: unknown) => {
        if (vivo) setError(textoError(fallo, 'No se pudo cargar el perfil'))
      })
    return () => {
      vivo = false
    }
  }, [])

  if (!perfil && !error) return <p className="text-muted">Cargando perfil…</p>
  if (!perfil) return <p className="text-sm font-medium text-red-600">{error}</p>

  return (
    <section className="mx-auto max-w-2xl">
      <h1 className={tituloPagina}>Tu perfil</h1>
      <p className="mt-1 mb-6 text-muted">Rol: {perfil.rol?.nombre || 'sin rol'}. El documento de identidad no se edita aquí.</p>
      <Formik
        enableReinitialize
        initialValues={{
          nombre: perfil.nombre,
          telefono: perfil.telefono,
          correo: perfil.correo,
          direccion: perfil.direccion || '',
          password: '',
        }}
        validate={(valores) => {
          const errores: Partial<Record<string, string>> = {}
          if (!valores.nombre.trim()) errores.nombre = 'El nombre es necesario'
          if (!/^[0-9]{10}$/.test(valores.telefono.trim())) errores.telefono = 'El telefono debe tener 10 digitos'
          if (!correoValido(valores.correo)) errores.correo = 'El correo no es valido'
          if (valores.password && !REGEX_CLAVE.test(valores.password)) errores.password = AVISO_CLAVE
          return errores
        }}
        onSubmit={async (valores, { setStatus }) => {
          setStatus('')
          setMensaje('')
          const cuerpo: Esquemas['UpdatePerfilDto'] = {
            nombre: valores.nombre.trim(),
            telefono: valores.telefono.trim(),
            correo: valores.correo.trim(),
            direccion: valores.direccion.trim(),
          }
          if (valores.password) cuerpo.password = valores.password
          try {
            await api(rutas.perfil, { method: 'PATCH', data: cuerpo })
            setMensaje('Perfil actualizado')
          } catch (fallo) {
            setStatus(textoError(fallo, 'No se pudo guardar'))
          }
        }}
      >
        {({ isSubmitting, status }) => (
          <Form className="flex flex-col gap-4 rounded-3xl border border-blue-100 bg-white p-5 shadow-[0_16px_40px_rgba(37,99,235,0.08)] sm:p-6" noValidate>
            <Campo name="nombre" label="Nombre" />
            <Campo name="telefono" label="Teléfono" ayuda="10 dígitos." />
            <Campo name="correo" label="Correo" type="email" />
            <Campo name="direccion" label="Dirección" />
            <ClaveCampo name="password" label="Nueva contraseña" autoComplete="new-password" placeholder="Déjala vacía si no cambia" />
            <AvisoFormulario status={status} />
            <MensajeOk texto={mensaje} />
            <button type="submit" className={btnPrimario} disabled={isSubmitting}>
              {isSubmitting ? 'Guardando…' : 'Guardar'}
            </button>
          </Form>
        )}
      </Formik>
    </section>
  )
}
