import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { iconosCategoria } from '../../catalogo/iconos'
import type { Servicio } from '../../catalogo/tipos'

export function FichaServicio({ servicio }: { servicio: Servicio }) {
  const Icono = iconosCategoria[servicio.categoriaSlug]
  return (
    <article className="ficha">
      <div className="ficha-top">
        <Icono className="service-icon" aria-hidden="true" />
        <p className="ficha-sub">{servicio.subcategoria}</p>
      </div>
      <h3><Link to={`/servicios/${servicio.categoriaSlug}/${servicio.slug}`}>{servicio.nombre}</Link></h3>
      <p>{servicio.resumen}</p>
      <ul className="etiquetas">
        {servicio.etiquetas.map((etiqueta) => <li key={etiqueta}>{etiqueta}</li>)}
      </ul>
      <div className="ficha-acciones">
        <Link className="button small" to={`/servicios/${servicio.categoriaSlug}/${servicio.slug}`}>Ver servicio <ArrowRight size={16} /></Link>
        <Link className="button small outline" to={`/servicios/${servicio.categoriaSlug}/${servicio.slug}#cotizar`}>Solicitar cotización</Link>
      </div>
    </article>
  )
}
