# Guía para continuar el frontend

Documento de arranque para levantar `huella-front` en otra máquina con el mismo diseño y la misma API. El backend está en la carpeta hermana `huella-back`. Su guía es `huella-back/docs/documento.md`.

## Qué es este repo

Vite, React 19 y TypeScript. La interfaz sigue la landing de ABM Pet Tech: navy `#0b1f4a`, azul `#2563eb`, fondo `#f8fafc` y Plus Jakarta Sans.

- Tailwind CSS para el layout.
- Axios en `src/services/http.ts`. Desempaqueta `{ ok, data, msg, code }` y, si la petición llevaba token y responde 401, cierra la sesión.
- Zustand en `src/store/sesion.ts` (token) y `src/store/ui.ts` (menú, avisos y selección de la tienda).
- Formik en login, registro, mascota, perfil, pérdida y avistamiento.
- React Router. Leaflet para el mapa, con teselas de OpenStreetMap.

El front no habla con PostgreSQL y no decide permisos. Las pantallas llaman rutas declaradas en `src/types/contrato.ts`.

## Requisitos

- Node.js 20 o superior
- Yarn 1
- `huella-back` en marcha, como describe su guía

`huella-front` y `huella-back` deben quedar como carpetas hermanas para que funcione la generación de tipos.

## Entorno

```powershell
Copy-Item .env.example .env
```

`VITE_API_URL` es solo el origen, sin `/api/v1`:

```text
VITE_API_URL=http://localhost:3001
```

El cliente concatena las rutas (`/api/v1/...`). Las fotos salen de `${VITE_API_URL}/uploads/...`.

El back debe incluir en `CORS_ORIGIN` tanto `http://localhost:5173` como `http://127.0.0.1:5173`. Si abres el front por una de esas dos y la otra no está permitida, el navegador muestra “Failed to fetch”.

## Arranque

Con el back ya levantado al menos una vez (así existe `openapi.json`):

```powershell
yarn install
yarn openapi:types
yarn dev
```

Vite queda en `http://localhost:5173/`. `yarn openapi:types` escribe `src/types/openapi.ts` desde `../huella-back/openapi.json`. Vuelve a correrlo cuando cambie el contrato.

## Rutas

| Ruta | Quién entra |
|---|---|
| `/` | Landing pública |
| `/tienda` | Catálogo visual. El carrito vive en Zustand y no cobra. |
| `/login`, `/registro` | Públicas. Al entrar van a `/app/mascotas`. |
| `/mapa`, `/vi` | Públicas. El avistamiento no exige cuenta. |
| `/q/:codigo` | Ficha pública del QR |
| `/app/mascotas`, `/app/mascotas/nueva`, `/app/mascotas/:id` | Sesión |
| `/app/perfil`, `/app/avistamientos` | Sesión |

Sin token, `/` muestra la landing. Con token, la barra ofrece “Mis mascotas”. La clave del token es `huella_token`: `localStorage` si “Recordarme” está marcado y `sessionStorage` si no.

## Cuentas de prueba

Úsalas en `/login`. La contraseña cumple la regla del back: 8 caracteres, mayúscula, minúscula, número y un signo `!@#$%^&*`.

| Nombre | Correo | Teléfono | Contraseña |
|---|---|---|---|
| Camila Huella | `camila.huella.ui@example.com` | `3105550199` | `Huella1!` |

En una base nueva esa cuenta no existe. Créala en `/registro` con esos mismos datos (el teléfono son 10 dígitos, sin espacios). La dirección se completa después en `/app/perfil`.

Si el otro entorno usa una copia de la base de este proyecto, Camila ya entra y ve:

| Mascota | Estado | Código | Dónde abrirla |
|---|---|---|---|
| Lupa | Perdida | `148180761f80` | `/q/148180761f80` |
| Nube | En casa | `423882df6422` | `/q/423882df6422` |

No uses las cuentas `ana…@example.com`, `otro…@example.com` ni `test@test.com`. Quedaron de pruebas locales y su contraseña no está en claro.

## Cómo comprobar que ambos lados se hablan

1. Abre `/login` e inicia sesión con Camila.
2. Debes llegar a `/app/mascotas`.
3. Crea una mascota en `/app/mascotas/nueva`. El back responde con un QR.
4. Abre `/q/<codigo>` en una ventana privada: se ve la ficha sin pedir sesión.
5. `/mapa` muestra el mapa alrededor de Bogotá (`4.711`, `-74.0721`) si no cambias el centro.

## Estructura para seguir desarrollando

```text
src/
  app/App.tsx           router
  components/           landing, marca, layout y campos
  features/             auth y catálogo de la tienda
  pages/                una pantalla por ruta
  services/http.ts      único cliente HTTP
  store/sesion.ts       token
  store/ui.ts           menú, avisos y carrito
  types/openapi.ts      generado, no editar a mano
  types/contrato.ts     rutas y tipos que usan las pantallas
```

Una pantalla nueva no llama a Axios por su cuenta: agrega la ruta en `contrato.ts` y usa `api()` desde `services/http.ts`. Los colores nuevos salen del tema de `src/index.css` (`navy`, `brand`, `canvas`), no de otra paleta.

La tienda, la IA, los dispositivos y la comunidad siguen pendientes en `docs/pendientes/`.
