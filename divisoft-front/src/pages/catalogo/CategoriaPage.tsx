import { Link, Navigate, useParams } from 'react-router-dom'
import { categoriaPorSlug, serviciosDeCategoria } from '../../catalogo/datos'
import { iconosCategoria } from '../../catalogo/iconos'
import { useMeta, useTemaLanding } from '../../catalogo/meta'
import { BarraPublica } from '../../landing/BarraPublica'
import { FichaServicio } from './FichaServicio'
import '../../landing/divisoft.css'
import '../../landing/catalogo.css'

export function CategoriaPage() {
  useTemaLanding()
  const { categoria: categoriaSlug = '' } = useParams()
  const categoria = categoriaPorSlug(categoriaSlug)
  useMeta(
    categoria?.nombre ?? 'Servicios',
    categoria?.resumen ?? 'Categoría de servicios de Divisoft.',
  )
  if (!categoria) return <Navigate to="/servicios" replace />
  const lista = serviciosDeCategoria(categoria.slug)
  const grupos = [...new Set(lista.map((servicio) => servicio.subcategoria))]
  const Icono = iconosCategoria[categoria.slug]

  return (
    <main className="catalogo">
      <BarraPublica />
      <section className="section">
        <div className="wrap">
          <nav className="migas" aria-label="Ruta">
            <Link to="/">Inicio</Link>
            <Link to="/servicios">Servicios</Link>
            <span aria-current="page">{categoria.nombre}</span>
          </nav>
          <p className="eyebrow">CATEGORÍA</p>
          <div className="categoria-titulo">
            <Icono className="service-icon" aria-hidden="true" />
            <h1>{categoria.nombre}</h1>
          </div>
          <p className="catalogo-lead">{categoria.resumen}</p>
          {categoria.nota ? <p className="nota-legal">{categoria.nota}</p> : null}
          {grupos.map((grupo) => (
            <section key={grupo} className="grupo">
              <h2>{grupo}</h2>
              <div className="ficha-grid">
                {lista.filter((servicio) => servicio.subcategoria === grupo).map((servicio) => (
                  <FichaServicio key={servicio.id} servicio={servicio} />
                ))}
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  )
}
