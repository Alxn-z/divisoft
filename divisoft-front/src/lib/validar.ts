export const REGEX_CLAVE =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,50}$/

export const AVISO_CLAVE =
  'Mínimo 8 caracteres, con mayúscula, minúscula, número y un signo (!@#$%^&*).'

export function correoValido(valor: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim())
}
