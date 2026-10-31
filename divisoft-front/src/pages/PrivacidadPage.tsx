import { Link } from 'react-router-dom'
import { useMeta, useTemaLanding } from '../catalogo/meta'
import { BarraPublica } from '../landing/BarraPublica'
import '../landing/divisoft.css'
import '../landing/catalogo.css'

export function PrivacidadPage() {
  useTemaLanding()
  useMeta(
    'Política de privacidad',
    'Cómo Divisoft usa los datos que dejas en una consulta o una cotización.',
  )

  return (
    <main className="catalogo">
      <BarraPublica />
      <article className="section">
        <div className="wrap detalle privacidad">
          <nav className="migas" aria-label="Ruta">
            <Link to="/">Inicio</Link>
            <span aria-current="page">Privacidad</span>
          </nav>
          <p className="eyebrow">DATOS</p>
          <h1>Política de privacidad</h1>
          <p className="catalogo-lead">Esta página explica qué guardamos cuando escribes desde el sitio y para qué lo usamos.</p>
          <section>
            <h2>Qué datos pedimos</h2>
            <p>Nombre, correo, teléfono si lo escribes, empresa si la indicas y la descripción del caso. En una cotización también puedes anotar un presupuesto aproximado y una fecha deseada. Esos dos datos viajan dentro del mensaje.</p>
          </section>
          <section>
            <h2>Para qué los usamos</h2>
            <p>Para responder la consulta o preparar la cotización, y para llevar el seguimiento de esa solicitud. No los usamos para enviar publicidad ni los cedemos a terceros para que te contacten por su cuenta.</p>
          </section>
          <section>
            <h2>Cuánto tiempo</h2>
            <p>Los conservamos mientras la solicitud siga abierta y el tiempo necesario para el encargo que resulte de ella. Puedes pedir que los eliminemos escribiendo de nuevo desde el formulario e indicando el correo con el que los enviaste.</p>
          </section>
          <section>
            <h2>Qué no debes enviar</h2>
            <p>No incluyas contraseñas, documentos de identidad ni datos de salud. El formulario no está hecho para esa información.</p>
          </section>
          <p className="form-note">Los servicios jurídicos que ofrece Divisoft los prestan profesionales habilitados, conforme a la legislación y la jurisdicción que correspondan.</p>
        </div>
      </article>
    </main>
  )
}
