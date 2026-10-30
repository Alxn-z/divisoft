import { create } from 'zustand'

const CLAVE = 'divisoft_token'

function leerToken() {
  return localStorage.getItem(CLAVE) || sessionStorage.getItem(CLAVE)
}

interface SesionState {
  token: string | null
  entrar: (token: string, recordar?: boolean) => void
  salir: () => void
}

export const useSesion = create<SesionState>((set) => ({
  token: leerToken(),
  entrar: (token, recordar = true) => {
    localStorage.removeItem(CLAVE)
    sessionStorage.removeItem(CLAVE)
    const destino = recordar ? localStorage : sessionStorage
    destino.setItem(CLAVE, token)
    set({ token })
  },
  salir: () => {
    localStorage.removeItem(CLAVE)
    sessionStorage.removeItem(CLAVE)
    set({ token: null })
  },
}))
