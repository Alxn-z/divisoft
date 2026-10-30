# Divisoft

Hay dos entornos separados. No comparten variables ni proceso.

- `divisoft-back`: API y Postgres. Puerto 3001. Su `.env` guarda `PD_PASSWORD` y `JWT_SECRET`. Se arranca desde esa carpeta con `yarn start:dev`.
- `divisoft-front`: solo el navegador. Puerto 5173. Su `.env` tiene `VITE_API_URL=http://localhost:3001`, sin clave de base de datos. Se arranca desde esa carpeta con `yarn dev`.

El front llama a la API por HTTP. No abre Postgres. La landing de Next en esta raíz es aparte y no compila esas dos carpetas.

## Desarrollo

```sh
npm install
npm run dev
```

Abre http://localhost:3000. Para generar una versión estática: `npm run build`. El resultado queda en `out/`.

La página incluye navegación responsive, detalles de servicios y un formulario que envía la consulta al API. Para guardarlas hace falta Postgres y el API en marcha; consulta [la guía](docs/ALMACENAR-CONSULTAS.md). No envía correos automáticamente.

Las ilustraciones del hero, el proceso, el software y el contacto son escenas animadas con HTML, CSS y SVG. Respetan `prefers-reduced-motion`. Los iconos se recrearon con Lucide.
