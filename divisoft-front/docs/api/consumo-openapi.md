# Consumo de OpenAPI

## Fuente

El back escribe `huella-back/openapi.json` al arrancar en desarrollo y sirve la misma spec en `/docs-json`.

## Generar tipos

Desde `huella-front`, con el back ya levantado al menos una vez:

```bash
yarn openapi:types
```

Eso ejecuta `openapi-typescript` sobre `../huella-back/openapi.json` y escribe `src/types/openapi.ts`.

Los servicios importan los cuerpos y las respuestas desde `src/types/contrato.ts`, que reexporta los tipos generados. Si un endpoint no está en ese archivo, no se llama desde una pantalla.

## Cliente

`src/services/http.ts` es el único cliente Axios. Añade `Authorization: Bearer` cuando hay token, envía JSON y desempaqueta `{ ok, data, msg, code }`. Si `ok` es falso, lanza un error con `msg` y `code` para que la pantalla lo muestre. Un 401 en una petición que ya llevaba token cierra la sesión.

## Qué no hacer

- No poner la URL del endpoint dentro de un componente.
- No leer `documento`, `password` ni `direccion` de la respuesta pública del QR: el tipo público no los incluye. Si aparecen en una respuesta, es un fallo del back y no deben pintarse.
