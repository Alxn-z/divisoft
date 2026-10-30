import type { components, paths } from './openapi'

export type Esquemas = components['schemas']

export function ruta<K extends keyof paths>(path: K): K {
  return path
}

export const rutas = {
  registro: ruta('/api/v1/auth/register'),
  login: ruta('/api/v1/auth/login'),
  perfil: ruta('/api/v1/usuarios/me'),
  consultas: ruta('/api/v1/consultas'),
}

export interface Perfil {
  id: string
  nombre: string
  correo: string
  telefono: string
  direccion: string | null
  documento: string | null
  rol: { id: string; nombre: string } | null
}

export interface Consulta {
  id: string
  nombre: string
  correo: string
  telefono: string | null
  empresa: string | null
  proyecto: string
  estado: string
  createAt: string
}

export interface SesionApi {
  token: string
  user: { id: string; correo: string; nombre: string; rol?: { nombre: string } | null }
}

export function llenar(plantilla: string, valores: Record<string, string>) {
  return Object.entries(valores).reduce(
    (rutaActual, [clave, valor]) => rutaActual.replace(`{${clave}}`, encodeURIComponent(valor)),
    plantilla,
  )
}
