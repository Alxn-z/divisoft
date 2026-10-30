# Guardar las consultas de clientes

El formulario no escribe en la base. El front envía `POST /api/v1/consultas` y el API de `divisoft-back` guarda la fila en la tabla `consultas` de PostgreSQL.

Hoy esa base no está conectada. Sin Postgres y sin el API en marcha, el envío no queda almacenado.

Este camino es el de `divisoft-front` y `divisoft-back`. La guía de `BASE-DE-DATOS.md` describe otro landing, el de Next con Supabase. No mezclar las dos claves ni las dos tablas.

## Qué hace falta

- Node 20 o superior y Yarn 1.
- Docker, para Postgres 17.
- Un `.env` solo en `divisoft-back`. No subirlo al repositorio.
- En el front, `VITE_API_URL` con el origen del API, sin `/api/v1`.

La contraseña de Postgres y `JWT_SECRET` se quedan en el servidor del API. El navegador no las recibe.

## En local

Dentro de `divisoft-back`:

1. Copia `.env.example` a `.env`.
2. Completa `PD_PASSWORD` y `JWT_SECRET`. El resto del ejemplo vale para la máquina local: `PD_HOST=localhost`, `PD_PORT=5433`, `PD_USERNAME=postgres`, `PD_NAMEDB=divisoft_db`, `PORT=3001`, `HOST_API=http://localhost:3001`, `STATE=dev`, `CORS_ORIGIN=http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000`. El puerto del host es `5433` porque `5431` lo usa el Postgres de FindHomy.
3. Levanta la base:

```sh
docker compose up -d
```

El contenedor se llama `divisoft-postgres`. El puerto del host es `5433` y el del contenedor es `5432`. Los datos quedan en la carpeta `divisoft-back/postgres`.

4. Instala y arranca el API:

```sh
yarn install
yarn start:dev
```

Al arrancar, la migración `InitDivisoft` crea `roles`, `usuarios` y `consultas` si no existen. El seed asegura los roles `Usuario` y `Admin`. Swagger queda en `http://localhost:3001/docs`.

Dentro de `divisoft-front`:

5. Crea `.env` con:

```text
VITE_API_URL=http://localhost:3001
```

6. Arranca el sitio:

```sh
yarn install
yarn dev
```

7. Abre el sitio, llena el formulario, marca el consentimiento y envía. El mensaje de éxito aparece solo cuando el API responde bien.

La landing de Next en la raíz usa el mismo `POST`. Su variable es `NEXT_PUBLIC_API_URL=http://localhost:3001` y se arranca con `npm run dev` en el puerto 3000.

## Qué se guarda

Cada envío es una fila en `consultas`: nombre, correo, teléfono, empresa, proyecto, consentimiento, versión del consentimiento (`contact-v1`), estado (`nuevo`) y fecha. El teléfono y la empresa pueden ir vacíos. El consentimiento tiene que ser verdadero.

El formulario manda un `id` estable. Si el mismo envío se reintenta y Postgres responde duplicado, el front lo trata como éxito y no crea otra fila.

## Cómo ver los registros

El sitio no tiene pantalla de administración. Para leer lo guardado, entra a Postgres:

```sh
docker exec -it divisoft-postgres psql -U postgres -d divisoft_db -c "select nombre, correo, estado, \"createAt\" from consultas order by \"createAt\" desc;"
```

Los estados previstos son `nuevo`, `contactado`, `en_propuesta` y `cerrado`.

## Con el dominio de GoDaddy

El dominio solo apunta el nombre. El hosting compartido de GoDaddy (cPanel y PHP) no corre este Nest ni este Postgres. Hacen falta un proceso Node para el API y un PostgreSQL 17.

1. Publica el API en un VPS o en un servicio que ejecute Node (Render, Railway, Fly.io).
2. Publica Postgres en ese mismo servidor o en un Postgres gestionado (Neon, Supabase, o el del servicio del API). Solo el API tiene `PD_HOST`, `PD_PORT`, `PD_USERNAME`, `PD_PASSWORD` y `PD_NAMEDB`.
3. En el `.env` de producción pon `STATE=prod`, `HOST_API` con la URL pública del API y `CORS_ORIGIN` con el origen del sitio, por ejemplo `https://tudominio.com`.
4. Compila el front con `VITE_API_URL` igual al origen público del API, por ejemplo `https://api.tudominio.com`. Esa variable queda fijada en el build.
5. En el DNS de GoDaddy, apunta el sitio al front y, si el API va en un subdominio, apunta `api` a ese servicio. Sirve ambos con HTTPS.

Al arrancar en el servidor, el API aplica la misma migración y crea la tabla si no existe. Un envío desde el dominio sigue el mismo `POST /api/v1/consultas`.

Respalda el volumen de Postgres. Si se pierde el disco, se pierden las consultas.
