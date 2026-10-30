import { Link } from 'react-router-dom'
import { Acceso } from '../components/layout/Acceso'
import { IconoCorazon } from '../components/brand/Iconos'
import { RegisterForm } from '../features/auth/RegisterForm'

export function RegistroPage() {
  return (
    <Acceso
      amplia
      titulo={
        <>
          Crea tu cuenta en{' '}
          <span className="bg-[linear-gradient(90deg,#93c5fd,#c4b5fd)] bg-clip-text text-transparent">Divisoft</span>
        </>
      }
      lead="Regístrate para tener un perfil. El rol asignado es Usuario; el servidor ignora cualquier rol enviado desde el navegador."
      ventajas={[
        'Cuenta propia con correo y teléfono',
        'Contraseña con la misma política que la API',
        'Después del registro entras al perfil',
      ]}
      icono={<IconoCorazon className="h-4 w-4" />}
      encabezado="Crear cuenta"
      subtitulo="Completa tus datos para crear la cuenta"
      pie={
        <>
          ¿Ya tienes una cuenta?{' '}
          <Link to="/login" className="font-bold text-brand hover:underline">
            Inicia sesión
          </Link>
        </>
      }
    >
      <RegisterForm />
    </Acceso>
  )
}
