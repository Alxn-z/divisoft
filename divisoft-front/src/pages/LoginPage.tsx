import { Link } from 'react-router-dom'
import { Acceso } from '../components/layout/Acceso'
import { IconoCorazon } from '../components/brand/Iconos'
import { LoginForm } from '../features/auth/LoginForm'

export function LoginPage() {
  return (
    <Acceso
      titulo={
        <>
          Entra para seguir el trabajo de{' '}
          <span className="bg-[linear-gradient(90deg,#93c5fd,#c4b5fd)] bg-clip-text text-transparent">tu cuenta Divisoft</span>
        </>
      }
      lead="Accede a tu perfil para continuar con los proyectos y la cuenta de Divisoft."
      ventajas={[
        'Perfil propio de la cuenta',
        'Sesión con token de 10 horas',
        'La landing sigue abierta sin iniciar sesión',
      ]}
      icono={<IconoCorazon className="h-4 w-4" />}
      encabezado="Iniciar sesión"
      subtitulo="Ingresa tus datos para continuar"
      pie={
        <>
          ¿No tienes una cuenta?{' '}
          <Link to="/registro" className="font-bold text-brand hover:underline">
            Regístrate
          </Link>
        </>
      }
    >
      <LoginForm />
    </Acceso>
  )
}
