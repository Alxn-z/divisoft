export function textoError(fallo: unknown, respaldo: string) {
  return fallo instanceof Error && fallo.message ? fallo.message : respaldo
}
