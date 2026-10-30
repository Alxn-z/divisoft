# Arquitectura del frontend

Huella en el navegador es Vite + React 19 + TypeScript + Tailwind CSS. La interfaz sigue la landing y la paleta de ABM Pet Tech (azul `#2563eb`, navy `#0b1f4a`, Plus Jakarta Sans). Axios habla con la API, Zustand guarda la sesión y el estado de interfaz, y Formik arma los formularios. No es Next.js (ADR-004 en el backend).

## Responsabilidad

El front pinta pantallas, valida el formulario antes de enviarlo y muestra `msg` cuando la API responde `ok: false`. No decide si alguien es dueño de una mascota ni cuántas puede crear.

## Estructura

```text
src/
  app/App.tsx           router
  components/           landing, marca, layout y campos
  features/             auth, tienda
  pages/                rutas
  services/http.ts      Axios y el sobre { ok, data, msg }
  store/sesion.ts       token (Zustand)
  store/ui.ts           menú, aviso y selección de tienda
  types/openapi.ts      generado
  types/contrato.ts     alias usados por las pantallas
```

## Rutas

- `/` landing, `/tienda`, `/login` y `/registro` — públicas. La tienda muestra el catálogo; el pago sigue pendiente.
- `/app/mascotas`, `/app/mascotas/nueva`, `/app/mascotas/:id` — sesión.
- `/app/perfil` y `/app/avistamientos` — sesión. `/mapa` y `/vi` son públicas; el alta de avistamiento no exige cuenta.
- `/q/:codigo` — pública, sin edición.

## Sesión

El token JWT se guarda en Zustand y en `localStorage` bajo la clave `huella_token` cuando “Recordarme” está activo. Si no, queda solo en `sessionStorage`. No es una cookie httpOnly. El logout borra esa clave en el cliente; el servidor no tiene lista de revocación en este ciclo (ver pendientes de plataforma).

## API

`VITE_API_URL` es el origen del back, por ejemplo `http://localhost:3001`. Las llamadas van a `${VITE_API_URL}/api/v1`. Las fotos van a `${VITE_API_URL}/uploads/...`.
