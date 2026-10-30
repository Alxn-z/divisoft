import axios, { AxiosError, type AxiosRequestConfig } from 'axios'
import { useSesion } from '../store/sesion'

const ORIGEN = import.meta.env.VITE_API_URL || 'http://localhost:3001'

export class ApiError extends Error {
  status: number
  code?: string

  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = 'ApiError'
    this.status = status
    this.code = code
  }
}

interface Sobre {
  ok?: boolean
  data?: unknown
  msg?: string | string[]
  code?: string
}

function leerMensaje(data: unknown, respaldo: string) {
  if (!data || typeof data !== 'object') return respaldo
  const msg = (data as Sobre).msg
  if (Array.isArray(msg)) return msg.join(', ')
  if (typeof msg === 'string' && msg.trim()) return msg
  return respaldo
}

export const http = axios.create({ baseURL: ORIGEN })

http.interceptors.request.use((config) => {
  const token = useSesion.getState().token
  const url = config.url || ''
  const publica = url.includes('/auth/login') || url.includes('/auth/register') || url.includes('/consultas')
  if (token && !publica) {
    config.headers.Authorization = `Bearer ${token}`
  }
  if (config.data instanceof FormData) {
    delete config.headers['Content-Type']
  }
  return config
})

http.interceptors.response.use(
  (response) => {
    const body = response.data as Sobre | null
    if (body && body.ok === false) {
      throw new ApiError(leerMensaje(body, 'No se pudo completar la solicitud'), response.status, body.code)
    }
    return response
  },
  (error: AxiosError<Sobre>) => {
    const status = error.response?.status ?? 0
    const data = error.response?.data
    const llevabaToken = Boolean(error.config?.headers?.Authorization)
    if (status === 401 && llevabaToken) {
      useSesion.getState().salir()
    }
    return Promise.reject(
      new ApiError(leerMensaje(data, 'No se pudo completar la solicitud'), status, data?.code),
    )
  },
)

export async function api<T>(path: string, config: AxiosRequestConfig = {}): Promise<T> {
  const response = await http.request<Sobre>({ url: path, ...config })
  return response.data?.data as T
}

export function urlArchivo(ruta: string | null | undefined) {
  if (!ruta) return ''
  if (ruta.startsWith('http')) return ruta
  return `${ORIGEN}${ruta}`
}
