# Divisoft API

NestJS 11. El front no abre Postgres: esta API autentica, valida y persiste.

## Arranque

Hace falta Node 20 o superior y Yarn 1.

```sh
cp .env.example .env
```

Completa `PD_PASSWORD` y `JWT_SECRET` en `.env`. No subas ese archivo.

```sh
docker compose up -d
yarn install
yarn start:dev
```

| Servicio | URL |
|---|---|
| API | http://localhost:3001/api/v1 |
| Swagger | http://localhost:3001/docs |
| Postgres | localhost:5431 |

En desarrollo el arranque escribe `openapi.json`. La migración `InitDivisoft` crea `roles`, `usuarios` y `consultas` si no existen. El seed asegura los roles `Usuario` y `Admin`.

La consulta pública es `POST /api/v1/consultas`. No usa la clave de Supabase.
