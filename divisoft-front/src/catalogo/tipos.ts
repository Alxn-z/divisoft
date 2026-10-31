export type Etiqueta =
  | 'Desarrollo'
  | 'Marketing'
  | 'Datos'
  | 'Automatización'
  | 'Consultoría'
  | 'Legal'
  | 'Soporte'
  | 'Freelance'

export interface Pregunta {
  pregunta: string
  respuesta: string
}

export interface Servicio {
  id: string
  slug: string
  nombre: string
  categoria: string
  categoriaSlug: string
  subcategoria: string
  resumen: string
  descripcion: string
  problema: string
  solucion: string
  beneficios: string[]
  alcance: string
  entregables: string[]
  herramientas: string[]
  etiquetas: Etiqueta[]
  preguntas: Pregunta[]
}

export interface Categoria {
  slug: string
  nombre: string
  resumen: string
  nota?: string
}
