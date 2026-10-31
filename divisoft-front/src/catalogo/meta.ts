import { useEffect } from 'react'

export function useTemaLanding() {
  useEffect(() => {
    document.documentElement.classList.add('divisoft')
    return () => document.documentElement.classList.remove('divisoft')
  }, [])
}

export function useMeta(titulo: string, descripcion: string) {
  useEffect(() => {
    const previo = document.title
    document.title = `${titulo} | Divisoft`
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]')
    const creada = !meta
    if (!meta) {
      meta = document.createElement('meta')
      meta.name = 'description'
      document.head.appendChild(meta)
    }
    const descripcionPrevia = meta.content
    meta.content = descripcion
    return () => {
      document.title = previo
      if (creada) meta?.remove()
      else if (meta) meta.content = descripcionPrevia
    }
  }, [titulo, descripcion])
}
