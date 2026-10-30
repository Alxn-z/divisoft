# Bitácora

Registro de los cambios hechos en la landing de Divisoft. Las entradas más recientes van primero.

## 2026-10-29 — Teléfono de contacto

**Pedido.** El teléfono de la sección «Hablemos» se veía cortado. Había que acomodarlo y ponerle una animación.

**Pasos.** El teléfono de «Hablemos» se reemplazó por el logo. El texto y la imagen quedan en dos columnas del mismo ancho, alineadas al centro.

**Archivos.** `divisoft-front/src/landing/ContactScene.tsx`, `divisoft-front/src/landing/scenes.css`, `app/components/ContactScene.tsx`, `app/components/scenes.css`.

**Comprobación.** En `http://127.0.0.1:5173/#contacto`, con el tema blanco, el teléfono no cruza el borde de la sección.

## 2026-10-29 — Postgres local para las consultas

**Pedido.** Dejar la base lista para que la landing guarde la información del formulario.

**Pasos.**

1. Se creó el `.env` del API y el de los dos fronts, sin subir las claves.
2. Postgres 17 quedó en el contenedor `divisoft-postgres`, puerto del host `5433`. El `5431` ya lo usa FindHomy.
3. El API arrancó en el puerto 3001 y creó `roles`, `usuarios` y `consultas`.
4. El formulario de la landing Next dejó de llamar a Supabase y envía `POST /api/v1/consultas`.

**Archivos.** `divisoft-back/.env`, `divisoft-back/docker-compose.yaml`, `divisoft-back/.env.example`, `divisoft-front/.env`, `.env.local`, `.env.example`, `app/components/ContactForm.tsx`, `docs/ALMACENAR-CONSULTAS.md`, `docs/BASE-DE-DATOS.md`, `README.md`.

**Comprobación.** `POST /api/v1/consultas` respondió 201. El formulario de la landing en `http://127.0.0.1:5173` mostró el mensaje de registro y la fila quedó en `consultas`. Las filas de prueba se borraron.

## 2026-10-29 — Guía para guardar consultas

**Pedido.** Dejar escrito el proceso para que las consultas de clientes queden en PostgreSQL, en local y con el dominio de GoDaddy.

**Pasos.** Se escribió la guía con el arranque local, qué fila se guarda, cómo leerla y qué publicar aparte del dominio.

**Archivos.** `docs/ALMACENAR-CONSULTAS.md`, esta bitácora y el índice de `docs/README.md`.

**Comprobación.** El texto quedó en `docs/` y el índice lo enlaza. No se levantó Postgres ni se envió un formulario.

## 2026-10-29 — Tema blanco

**Pedido.** Poder cambiar la landing a blanco y volver al oscuro que ya estaba.

**Pasos.** En la barra hay un control «Blanco» / «Oscuro». El oscuro sigue siendo el de siempre. La elección queda en `divisoft_tema`.

## 2026-10-29 — Dos entornos

**Pedido.** Dejar el backend y el front en entornos distintos.

**Pasos.**

1. `divisoft-back` conserva la base, el JWT y el puerto 3001. `divisoft-front` solo conoce `VITE_API_URL`.
2. El `tsconfig` de la landing Next excluye las dos carpetas para no compilarlas juntas.
3. Cada una se arranca desde su propia carpeta.

## 2026-10-29 — Esqueleto back y front

**Pedido.** Aplicar la plantilla de estructura: dos carpetas hermanas, API Nest y SPA Vite, sin el dominio de mascotas.

**Pasos.**

1. Se crearon `divisoft-back` y `divisoft-front` junto a la landing de Next.js.
2. El back conserva auth, usuarios, roles, seed y el sobre `{ ok, data, msg }`. La migración `InitDivisoft` crea `roles`, `usuarios` y `consultas`.
3. `POST /api/v1/consultas` recibe la consulta del formulario. El navegador no abre Postgres ni Supabase.
4. El front sirve la misma landing, con login, registro y perfil. El token se guarda como `divisoft_token`.
5. La landing de Next.js y su formulario hacia Supabase siguen en la raíz. La base nueva no está levantada desde aquí: faltan Docker, `.env` y `yarn`.

**Archivos.** `divisoft-back/`, `divisoft-front/`, esta bitácora.

## 2026-10-28 — Logo oficial

**Pedido.** Sustituir el logo dibujado con texto por la marca enviada: monograma DS, wordmark Divisoft y la leyenda «Desarrollamos tu visión en software».

**Pasos.**

1. Se recortó el centro de la imagen de marca (1024×576) para quedarse con el lockup, sin el paisaje de rocas.
2. El recorte se guardó en `public/logo.jpg`.
3. El enlace de marca del encabezado dejó de usar el monograma CSS «DS» y pasó a mostrar esa imagen. El enlace conserva `aria-label="Divisoft, inicio"` y la imagen lleva `alt=""` para no repetir el nombre.
4. `BrandMark` pasó a usar la misma imagen en la laptop del hero y en el teléfono de contacto.
5. Se quitaron los anillos y el texto «Soluciones digitales» que acompañaban al logo anterior, porque el archivo ya incluye el anillo y la leyenda.
6. Un degradado radial en los bordes funde el fondo oscuro de la foto con el fondo de la página.

**Archivos.**

- Creado: `public/logo.jpg`
- Modificados: `app/page.tsx`, `app/globals.css`, `app/components/scene-kit.tsx`, `app/components/HeroScene.tsx`, `app/components/ContactScene.tsx`, `app/components/scenes.css`

**Comprobación.** Revisión visual del encabezado, de la laptop del hero y del teléfono de contacto. La navegación sigue anunciándose como «Divisoft, inicio».

## 2026-10-28 — Escenas animadas en lugar de recortes

**Pedido.** Mantener el diseño de la landing y sustituir los recortes CSS de `public/reference.png` por escenas hechas con código. Los elementos de cada escena debían estar separados y animados.

**Pasos.**

1. Se revisaron `app/page.tsx`, `app/globals.css`, `package.json` y `AGENTS.md`. Las ilustraciones eran recortes de una sola imagen mediante `background-image`, `background-size` y `background-position`.
2. Se crearon componentes reutilizables en `app/components`: piezas compartidas (`scene-kit.tsx`) y cuatro escenas.
3. Hero (`.hero-art`): laptop con la marca, seis tarjetas de servicios, líneas de energía azul y violeta, partículas, brillo y flotación. Se conservaron el espacio, la máscara y la posición del bloque.
4. Proceso (`.process-photo`): la fotografía se cambió por una laptop con interfaz de código. La lista de etapas pasó a ser un `ol` real, con Desarrollo como paso activo y un indicador de progreso animado. Los textos de la sección no cambiaron.
5. Software (`.process-art`): dos paneles oscuros con gráfica de línea, barras, líneas de código e indicadores de actividad. En móvil el bloque sigue oculto.
6. Contacto (`.contact-art`): teléfono con la marca, tres tarjetas informativas y líneas de energía, con flotación y destellos discretos.
7. Las escenas decorativas llevan `aria-hidden` y `pointer-events: none`. Con `prefers-reduced-motion` las animaciones se desactivan y la composición queda completa y estática.
8. Se eliminaron las reglas de `background-image` de `reference.png`. Después de comprobar que no quedaba ninguna referencia, se borró `public/reference.png`.
9. Se actualizó `README.md` para describir las escenas en lugar de los recortes.

**Archivos.**

- Creados: `app/components/scene-kit.tsx`, `app/components/HeroScene.tsx`, `app/components/ProcessScene.tsx`, `app/components/SoftwareScene.tsx`, `app/components/ContactScene.tsx`, `app/components/scenes.css`
- Modificados: `app/page.tsx`, `app/globals.css`, `app/layout.tsx`, `README.md`
- Eliminado: `public/reference.png`

**Comprobación.** `npm run build` generó la exportación estática sin errores. Revisión visual en escritorio (alrededor de 890 px, con medidas en 1280 y 1440) y en móvil (390 px). El modal de servicio y el formulario de contacto siguieron abriendo. No quedó `reference.png` en el código ni en `out/`.

## 2026-10-28 — Carpeta de trazabilidad

**Pedido.** Crear una carpeta `docs` para ir documentando cada paso.

**Pasos.**

1. Se creó `docs/README.md` con la convención de registro.
2. Se creó `docs/bitacora.md` con los cambios ya realizados en esta sesión.

**Archivos.**

- Creados: `docs/README.md`, `docs/bitacora.md`
