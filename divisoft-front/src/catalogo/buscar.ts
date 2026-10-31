import type { Etiqueta, Servicio } from './tipos'

export function normalizar(texto: string) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

export function coincide(servicio: Servicio, consulta: string, categoria: string, etiqueta: string) {
  if (categoria && servicio.categoriaSlug !== categoria) return false
  if (etiqueta && !servicio.etiquetas.includes(etiqueta as Etiqueta)) return false
  if (!consulta.trim()) return true
  const aguja = normalizar(consulta)
  const texto = normalizar([
    servicio.nombre,
    servicio.resumen,
    servicio.subcategoria,
    servicio.categoria,
    servicio.etiquetas.join(' '),
    servicio.herramientas.join(' '),
  ].join(' '))
  return texto.includes(aguja)
}
