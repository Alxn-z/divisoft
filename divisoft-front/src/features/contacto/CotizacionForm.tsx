import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { ArrowRight } from 'lucide-react'
import { ApiError, api } from '../../services/http'
import { rutas, type Esquemas } from '../../types/contrato'
import { textoError } from '../../lib/errores'
import { correoValido } from '../../lib/validar'
import type { Servicio } from '../../catalogo/tipos'

interface Valores {
  nombre: string
  empresa: string
  correo: string
  telefono: string
  descripcion: string
  presupuesto: string
  fecha: string
  consentimiento: boolean
  website: string
}

function armarProyecto(servicio: Servicio, valores: Valores) {
  const partes = [
    `Servicio: ${servicio.nombre}`,
    `Categoría: ${servicio.categoria} / ${servicio.subcategoria}`,
    '',
    valores.descripcion.trim(),
    '',
    `Presupuesto aproximado: ${valores.presupuesto.trim() || 'No indicado'}`,
    `Fecha de entrega deseada: ${valores.fecha || 'No indicada'}`,
  ]
  return partes.join('\n').slice(0, 5000)
}

export function CotizacionForm({ servicio }: { servicio: Servicio }) {
  const envioId = useRef<string | null>(null)
  const [enviada, setEnviada] = useState(false)

  if (enviada) {
    return (
      <div role="status" className="contact-feedback">
        <p>Recibimos tu solicitud de cotización de {servicio.nombre}. Te contactaremos por los datos que dejaste.</p>
      </div>
    )
  }

  return (
    <Formik<Valores>
      initialValues={{ nombre: '', empresa: '', correo: '', telefono: '', descripcion: '', presupuesto: '', fecha: '', consentimiento: false, website: '' }}
      validate={(valores) => {
        const errores: Partial<Record<keyof Valores, string>> = {}
        if (valores.nombre.trim().length < 2) errores.nombre = 'Escribe tu nombre.'
        if (valores.empresa.trim().length > 160) errores.empresa = 'El nombre de la empresa es demasiado largo.'
        if (!correoValido(valores.correo)) errores.correo = 'El correo no es válido.'
        if (valores.telefono.trim().length < 7) errores.telefono = 'Escribe un número de contacto.'
        if (valores.telefono.trim().length > 30) errores.telefono = 'El número es demasiado largo.'
        if (valores.descripcion.trim().length < 10) errores.descripcion = 'Describe el proyecto en al menos 10 caracteres.'
        if (valores.presupuesto.trim().length > 120) errores.presupuesto = 'Resume el presupuesto en menos de 120 caracteres.'
        if (!valores.consentimiento) errores.consentimiento = 'Autoriza el uso de estos datos para preparar la cotización.'
        return errores
      }}
      onSubmit={async (valores, { setStatus, setSubmitting }) => {
        setStatus('')
        if (valores.website) {
          setSubmitting(false)
          return
        }
        envioId.current ??= crypto.randomUUID()
        const cuerpo: Esquemas['CreateConsultaDto'] = {
          id: envioId.current,
          nombre: valores.nombre.trim(),
          correo: valores.correo.trim().toLowerCase(),
          telefono: valores.telefono.trim(),
          empresa: valores.empresa.trim() || undefined,
          proyecto: armarProyecto(servicio, valores),
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
        <Form noValidate className="cotizacion">
          <label>Nombre<Field name="nombre" autoComplete="name" maxLength={120} /></label>
          <ErrorMessage name="nombre" component="p" className="contact-error" />
          <label>Empresa (opcional)<Field name="empresa" autoComplete="organization" maxLength={160} /></label>
          <ErrorMessage name="empresa" component="p" className="contact-error" />
          <label>Correo electrónico<Field name="correo" type="email" autoComplete="email" maxLength={254} /></label>
          <ErrorMessage name="correo" component="p" className="contact-error" />
          <label>Número de contacto<Field name="telefono" type="tel" autoComplete="tel" maxLength={30} /></label>
          <ErrorMessage name="telefono" component="p" className="contact-error" />
          <label>Servicio seleccionado<input value={`${servicio.nombre} · ${servicio.categoria}`} readOnly /></label>
          <label>Descripción del proyecto<Field name="descripcion" as="textarea" rows={5} maxLength={4000} /></label>
          <ErrorMessage name="descripcion" component="p" className="contact-error" />
          <label>Presupuesto aproximado (opcional)<Field name="presupuesto" maxLength={120} placeholder="Un rango, si ya lo tienes. No publica precios." /></label>
          <label>Fecha de entrega deseada (opcional)<Field name="fecha" type="date" /></label>
          <div hidden aria-hidden="true"><label>Website<Field name="website" tabIndex={-1} autoComplete="off" /></label></div>
          <label className="contact-consent">
            <Field name="consentimiento" type="checkbox" />
            <span>Autorizo a Divisoft a guardar estos datos y contactarme para preparar esta cotización.</span>
          </label>
          <ErrorMessage name="consentimiento" component="p" className="contact-error" />
          <p className="form-note">Usaremos tus datos solo para responder esta solicitud, como se explica en la <Link to="/privacidad">política de privacidad</Link>. No incluyas contraseñas ni información sensible. El presupuesto y la fecha viajan dentro del mensaje, porque la consulta todavía no tiene campos propios para esos dos datos.</p>
          {status ? <p role="alert" className="contact-error">{status}</p> : null}
          <button className="button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Enviando solicitud…' : 'Enviar solicitud'} <ArrowRight size={18} /></button>
        </Form>
      )}
    </Formik>
  )
}
