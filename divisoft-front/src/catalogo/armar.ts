import type { Categoria, Etiqueta, Servicio } from './tipos'

export function slug(texto: string) {
  return texto
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

type Fila = {
  nombre: string
  resumen: string
  problema: string
  solucion: string
  beneficios: [string, string]
  entregables: string[]
  herramientas: string[]
  etiquetas: Etiqueta[]
}

export function armar(categoria: Categoria, subcategoria: string, filas: Fila[]): Servicio[] {
  return filas.map((fila) => ({
    id: `${categoria.slug}-${slug(fila.nombre)}`,
    slug: slug(fila.nombre),
    nombre: fila.nombre,
    categoria: categoria.nombre,
    categoriaSlug: categoria.slug,
    subcategoria,
    resumen: fila.resumen,
    descripcion: fila.solucion,
    problema: fila.problema,
    solucion: fila.solucion,
    beneficios: fila.beneficios,
    alcance: `El trabajo cubre ${fila.resumen.charAt(0).toLowerCase()}${fila.resumen.slice(1)} Si el caso pide integraciones, datos o piezas que no están en el encargo, se cotizan aparte.`,
    entregables: fila.entregables,
    herramientas: fila.herramientas,
    etiquetas: fila.etiquetas,
    preguntas: [
      {
        pregunta: '¿Cómo empezamos?',
        respuesta: 'Cuentas el caso y, antes de trabajar, queda escrito qué entra, qué no entra y la fecha objetivo. El presupuesto se confirma en ese alcance.',
      },
      {
        pregunta: '¿Qué pasa si el caso crece?',
        respuesta: 'Lo que no esté en los entregables acordados se cotiza como otro encargo. El trabajo en curso no cambia de alcance en silencio.',
      },
      {
        pregunta: fila.etiquetas.includes('Freelance') ? '¿Hace falta un proyecto completo?' : '¿Se puede empezar por una fase?',
        respuesta: fila.etiquetas.includes('Freelance')
          ? `${fila.nombre} se puede contratar solo. No hace falta abrir un proyecto empresarial para este encargo.`
          : `${fila.nombre} puede empezar por una fase con entregables propios. La siguiente fase se acuerda cuando esa entrega cierra.`,
      },
    ],
  }))
}
