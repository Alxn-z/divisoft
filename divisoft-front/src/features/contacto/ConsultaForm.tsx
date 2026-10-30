import { useRef, useState } from 'react'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { ArrowRight } from 'lucide-react'
import { ApiError, api } from '../../services/http'
import { rutas, type Esquemas } from '../../types/contrato'
import { textoError } from '../../lib/errores'
import { correoValido } from '../../lib/validar'

interface Valores {
  nombre: string
  correo: string
  telefono: string
  empresa: string
  proyecto: string
  consentimiento: boolean
  website: string
}

export function ConsultaForm() {
  const envioId = useRef<string | null>(null)
  const [enviada, setEnviada] = useState(false)

  if (enviada) {
    return (
      <div role="status" className="contact-feedback">
        <p>Tu consulta quedó registrada. Gracias por contarnos tu proyecto.</p>
        <button className="button outline" onClick={() => { envioId.current = null; setEnviada(false) }}>Enviar otra consulta</button>
      </div>
    )
  }

  return (
    <Formik<Valores>
      initialValues={{ nombre: '', correo: '', telefono: '', empresa: '', proyecto: '', consentimiento: false, website: '' }}
      validate={(valores) => {
        const errores: Partial<Record<keyof Valores, string>> = {}
        if (valores.nombre.trim().length < 2) errores.nombre = 'Escribe tu nombre.'
        if (!correoValido(valores.correo)) errores.correo = 'El correo no es valido.'
        if (valores.telefono.trim().length > 30) errores.telefono = 'El teléfono es demasiado largo.'
        if (valores.empresa.trim().length > 160) errores.empresa = 'El nombre de la empresa es demasiado largo.'
        if (valores.proyecto.trim().length < 10) errores.proyecto = 'Cuéntanos el proyecto en al menos 10 caracteres.'
        if (!valores.consentimiento) errores.consentimiento = 'Autoriza el uso de estos datos para atender la consulta.'
        return errores
      }}
      onSubmit={async (valores, { setStatus }) => {
        setStatus('')
        if (valores.website) return
        envioId.current ??= crypto.randomUUID()
        const cuerpo: Esquemas['CreateConsultaDto'] = {
          id: envioId.current,
          nombre: valores.nombre.trim(),
          correo: valores.correo.trim().toLowerCase(),
          telefono: valores.telefono.trim() || undefined,
          empresa: valores.empresa.trim() || undefined,
          proyecto: valores.proyecto.trim(),
          consentimiento: true,
        }
        try {
          await api(rutas.consultas, { method: 'POST', data: cuerpo })
          setEnviada(true)
        } catch (fallo) {
          if (fallo instanceof ApiError && fallo.code === 'DUPLICATE') {
            setEnviada(true)
            return
          }
          setStatus(textoError(fallo, 'No pudimos confirmar el registro. Revisa tu conexión e inténtalo de nuevo; tus datos siguen en el formulario.'))
        }
      }}
    >
      {({ isSubmitting, status }) => (
        <Form noValidate>
          <label>Tu nombre<Field name="nombre" autoComplete="name" maxLength={120} autoFocus /></label>
          <ErrorMessage name="nombre" component="p" className="contact-error" />
          <label>Correo electrónico<Field name="correo" type="email" autoComplete="email" maxLength={254} /></label>
          <ErrorMessage name="correo" component="p" className="contact-error" />
          <label>Teléfono / WhatsApp (opcional)<Field name="telefono" type="tel" autoComplete="tel" maxLength={30} /></label>
          <label>Empresa (opcional)<Field name="empresa" autoComplete="organization" maxLength={160} /></label>
          <label>¿Qué quieres crear?<Field name="proyecto" as="textarea" rows={4} maxLength={5000} /></label>
          <ErrorMessage name="proyecto" component="p" className="contact-error" />
          <div hidden aria-hidden="true"><label>Website<Field name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <label className="contact-consent">
            <Field name="consentimiento" type="checkbox" />
            <span>Autorizo a Divisoft a guardar estos datos y contactarme para atender esta consulta.</span>
          </label>
          <ErrorMessage name="consentimiento" component="p" className="contact-error" />
          <p className="form-note">Usaremos tus datos para atender tu solicitud. No incluyas contraseñas ni información sensible.</p>
          {status ? <p role="alert" className="contact-error">{status}</p> : null}
          <button className="button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Guardando consulta…' : 'Enviar consulta'}<ArrowRight size={18} /></button>
        </Form>
      )}
    </Formik>
  )
}
