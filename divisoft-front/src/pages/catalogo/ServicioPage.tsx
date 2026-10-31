import { useEffect } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ArrowRight, Check, PackageCheck, Wrench } from 'lucide-react'
import { categoriaPorSlug, servicioPorRuta, serviciosDeCategoria } from '../../catalogo/datos'
import { iconosCategoria } from '../../catalogo/iconos'
import { useMeta, useTemaLanding } from '../../catalogo/meta'
import { CotizacionForm } from '../../features/contacto/CotizacionForm'
import { BarraPublica } from '../../landing/BarraPublica'
import { LaminaServicio } from './LaminaServicio'
import '../../landing/divisoft.css'
import '../../landing/catalogo.css'

export function ServicioPage() {
  useTemaLanding()
  const { categoria: categoriaSlug = '', slug = '' } = useParams()
  const servicio = servicioPorRuta(categoriaSlug, slug)
  const categoria = categoriaPorSlug(categoriaSlug)
  useMeta(
    servicio?.nombre ?? 'Servicio',
    servicio?.resumen ?? 'Servicio de Divisoft.',
  )

  useEffect(() => {
    if (!servicio) return
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.servicio = servicio.id
    script.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: servicio.nombre,
      serviceType: servicio.categoria,
      description: servicio.resumen,
      provider: { '@type': 'Organization', name: 'Divisoft' },
    })
    document.head.appendChild(script)
    return () => script.remove()
  }, [servicio])

  if (!servicio || !categoria) return <Navigate to="/servicios" replace />

  const Icono = iconosCategoria[servicio.categoriaSlug]
  const relacionados = serviciosDeCategoria(servicio.categoriaSlug)
    .filter((otro) => otro.subcategoria === servicio.subcategoria && otro.id !== servicio.id)
    .slice(0, 3)
  const entregablesPropios = servicio.entregables.join('|') !== servicio.beneficios.join('|')

  return (
    <main className="catalogo">
      <BarraPublica />
      <article className="section">
        <div className="wrap detalle">
          <nav className="migas" aria-label="Ruta">
            <Link to="/">Inicio</Link>
            <Link to="/servicios">Servicios</Link>
            <Link to={`/servicios/${servicio.categoriaSlug}`}>{servicio.categoria}</Link>
            <span aria-current="page">{servicio.nombre}</span>
          </nav>

          <div className="detalle-hero">
            <div>
              <p className="eyebrow">{servicio.subcategoria.toUpperCase()}</p>
              <h1>{servicio.nombre}</h1>
              <ul className="etiquetas">
                {servicio.etiquetas.map((etiqueta) => <li key={etiqueta}>{etiqueta}</li>)}
              </ul>
              <p className="catalogo-lead">{servicio.resumen}</p>
              <a className="button" href="#cotizar">Solicitar cotización <ArrowRight size={18} /></a>
              {categoria.nota ? <p className="nota-legal">{categoria.nota}</p> : null}
            </div>
            <LaminaServicio categoria={servicio.categoriaSlug} subcategoria={servicio.subcategoria} nombre={servicio.nombre} />
          </div>

          <div className="pasos">
            <section className="paso">
              <span className="paso-icono" aria-hidden="true">01</span>
              <h2>El problema</h2>
              <p>{servicio.problema}</p>
            </section>
            <section className="paso">
              <span className="paso-icono" aria-hidden="true"><Wrench size={18} /></span>
              <h2>Qué hacemos</h2>
              <p>{servicio.solucion}</p>
            </section>
            <section className="paso">
              <span className="paso-icono" aria-hidden="true"><Check size={18} /></span>
              <h2>Qué ganas</h2>
              <ul>
                {servicio.beneficios.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
          </div>

          <div className="detalle-piezas">
            {entregablesPropios ? (
              <section className="pieza">
                <h2><PackageCheck size={18} aria-hidden="true" /> Entregables</h2>
                <ul className="lista-check">
                  {servicio.entregables.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </section>
            ) : null}
            <section className="pieza">
              <h2><Icono size={18} aria-hidden="true" /> Herramientas</h2>
              <ul className="chips">
                {servicio.herramientas.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </section>
            <section className="pieza pieza-nota">
              <h2>Alcance</h2>
              <p>Se acuerda por escrito antes de empezar. Lo que no esté en este encargo se cotiza aparte.</p>
            </section>
          </div>

          <div className="detalle-cierre">
            <section>
              <h2>Preguntas frecuentes</h2>
              <div className="preguntas">
                {servicio.preguntas.map((item) => (
                  <details key={item.pregunta}>
                    <summary>{item.pregunta}</summary>
                    <p>{item.respuesta}</p>
                  </details>
                ))}
              </div>
            </section>
            {relacionados.length > 0 ? (
              <nav className="relacionados" aria-label="Servicios de la misma subcategoría">
                <h2>En la misma línea</h2>
                <ul>
                  {relacionados.map((otro) => (
                    <li key={otro.id}>
                      <Link to={`/servicios/${otro.categoriaSlug}/${otro.slug}`}>
                        <Icono size={16} aria-hidden="true" />
                        {otro.nombre}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>

          <section id="cotizar" className="cotizar">
            <div>
              <p className="eyebrow">COTIZACIÓN</p>
              <h2>Cuéntanos este caso</h2>
              <p>{servicio.nombre} ya queda indicado en la solicitud.</p>
            </div>
            <CotizacionForm servicio={servicio} />
          </section>
        </div>
      </article>
    </main>
  )
}
