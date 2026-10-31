import { useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { categorias, servicios } from '../../catalogo/datos'
import { iconosCategoria } from '../../catalogo/iconos'
import { coincide } from '../../catalogo/buscar'
import { useMeta, useTemaLanding } from '../../catalogo/meta'
import type { Etiqueta } from '../../catalogo/tipos'
import { BarraPublica } from '../../landing/BarraPublica'
import { FichaServicio } from './FichaServicio'
import '../../landing/divisoft.css'
import '../../landing/catalogo.css'

const etiquetas: Etiqueta[] = ['Desarrollo', 'Marketing', 'Datos', 'Automatización', 'Consultoría', 'Legal', 'Soporte', 'Freelance']

export function CatalogoPage() {
  useTemaLanding()
  useMeta(
    'Servicios',
    'Catálogo de Divisoft: desarrollo, inteligencia artificial, datos, marketing, consultoría, asesoría legal digital y encargos puntuales.',
  )
  const [params, setParams] = useSearchParams()
  const q = params.get('q') ?? ''
  const categoria = params.get('categoria') ?? ''
  const etiqueta = params.get('etiqueta') ?? ''

  const visibles = useMemo(
    () => servicios.filter((servicio) => coincide(servicio, q, categoria, etiqueta)),
    [q, categoria, etiqueta],
  )

  function fijar(clave: string, valor: string) {
    const siguiente = new URLSearchParams(params)
    if (valor) siguiente.set(clave, valor)
    else siguiente.delete(clave)
    setParams(siguiente, { replace: true })
  }

  return (
    <main className="catalogo">
      <BarraPublica />
      <section className="section">
        <div className="wrap">
          <p className="eyebrow">CATÁLOGO</p>
          <h1>Servicios para un encargo corto o un proyecto completo</h1>
          <p className="catalogo-lead">Empieza por una categoría. El listado completo aparece cuando buscas o filtras. No publicamos precios: cada alcance se cotiza.</p>
          <form className="buscador" role="search" onSubmit={(evento) => evento.preventDefault()}>
            <label>
              Buscar servicios
              <input
                value={q}
                onChange={(evento) => fijar('q', evento.target.value)}
                placeholder="Por ejemplo: Power BI, logotipo, NDA"
              />
            </label>
          </form>
          <div className="filtros" role="group" aria-label="Filtrar por categoría">
            <button type="button" aria-pressed={categoria === ''} onClick={() => fijar('categoria', '')}>Todas</button>
            {categorias.map((item) => (
              <button key={item.slug} type="button" aria-pressed={categoria === item.slug} onClick={() => fijar('categoria', item.slug)}>{item.nombre}</button>
            ))}
          </div>
          <div className="filtros etiquetas-filtro" role="group" aria-label="Filtrar por etiqueta">
            {etiquetas.map((item) => (
              <button key={item} type="button" aria-pressed={etiqueta === item} onClick={() => fijar('etiqueta', etiqueta === item ? '' : item)}>{item}</button>
            ))}
          </div>
          {q.trim() || categoria || etiqueta ? (
            <>
              <p className="catalogo-cuenta">{visibles.length} {visibles.length === 1 ? 'servicio' : 'servicios'}</p>
              {visibles.length === 0 ? (
                <div className="vacio">
                  <h2>No hay servicios con ese criterio</h2>
                  <p>Prueba con otra palabra o quita los filtros.</p>
                  <button type="button" className="button outline" onClick={() => setParams(new URLSearchParams(), { replace: true })}>Limpiar búsqueda</button>
                </div>
              ) : (
                <div className="ficha-grid">
                  {visibles.map((servicio) => <FichaServicio key={servicio.id} servicio={servicio} />)}
                </div>
              )}
            </>
          ) : (
            <div className="entrada-categorias">
              {categorias.map((item) => {
                const Icono = iconosCategoria[item.slug]
                return (
                  <Link className="entrada" key={item.slug} to={`/servicios/${item.slug}`}>
                    <Icono className="service-icon" aria-hidden="true" />
                    <h2>{item.nombre}</h2>
                    <p>{item.resumen}</p>
                  </Link>
                )
              })}
            </div>
          )}
          <nav className="catalogo-categorias" aria-label="Categorías">
            {categorias.map((item) => (
              <Link key={item.slug} to={`/servicios/${item.slug}`}>{item.nombre}</Link>
            ))}
          </nav>
        </div>
      </section>
    </main>
  )
}
