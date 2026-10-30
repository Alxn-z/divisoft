# Divisoft front

Vite, React 19 y TypeScript. La landing es la de Divisoft. Login, registro y perfil siguen el esqueleto: un solo Axios, Zustand para el token y Formik en los formularios.

```sh
cp .env.example .env
yarn install
yarn dev
```

`VITE_API_URL` es el origen de la API, sin `/api/v1`. Por defecto `http://localhost:3001`. La app abre en http://localhost:5173.

Cuando el back haya escrito `openapi.json`:

```sh
yarn openapi:types
```

El formulario de contacto llama `POST /api/v1/consultas`. No guarda secretos de base de datos.
