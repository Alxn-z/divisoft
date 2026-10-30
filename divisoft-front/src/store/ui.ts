import { create } from 'zustand'

export interface LineaCarrito {
  id: string
  nombre: string
  precio: string
  cantidad: number
}

interface UiState {
  menuAbierto: boolean
  alternarMenu: () => void
  cerrarMenu: () => void
  carrito: LineaCarrito[]
  agregarAlCarrito: (item: Omit<LineaCarrito, 'cantidad'>) => void
  quitarDelCarrito: (id: string) => void
  aviso: string
  mostrarAviso: (texto: string) => void
  limpiarAviso: () => void
}

export const useUi = create<UiState>((set) => ({
  menuAbierto: false,
  alternarMenu: () => set((estado) => ({ menuAbierto: !estado.menuAbierto })),
  cerrarMenu: () => set({ menuAbierto: false }),
  carrito: [],
  agregarAlCarrito: (item) =>
    set((estado) => {
      const existe = estado.carrito.find((linea) => linea.id === item.id)
      const carrito = existe
        ? estado.carrito.map((linea) =>
            linea.id === item.id ? { ...linea, cantidad: linea.cantidad + 1 } : linea,
          )
        : [...estado.carrito, { ...item, cantidad: 1 }]
      return { carrito }
    }),
  quitarDelCarrito: (id) =>
    set((estado) => ({ carrito: estado.carrito.filter((linea) => linea.id !== id) })),
  aviso: '',
  mostrarAviso: (texto) => set({ aviso: texto }),
  limpiarAviso: () => set({ aviso: '' }),
}))
