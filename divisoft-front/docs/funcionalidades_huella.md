> **Propuesta de producto.** Lo que se construye en el núcleo (identidad, modo perdido, avistamientos y mapa básico) está en `docs/PROJECT_STATUS.md`. El resto de esta lista está marcado en `docs/pendientes/` y no está implementado.

# Funcionalidades propuestas para Huella

## 🐾 1. Identidad digital de la mascota

Cada perro tendría una especie de **"cédula digital"** dentro de Huella:

-   Identificador único Huella.
-   QR/NFC.
-   Fotografías desde distintos ángulos.
-   Características físicas.
-   Microchip, si tiene.
-   Edad, raza, peso y sexo.
-   Contactos autorizados.
-   Veterinaria habitual.
-   Información importante para una emergencia.

La información sensible podría mantenerse privada y mostrarse únicamente
cuando sea necesario.

## 🚨 2. Modo Perdido

Este debería ser el corazón de Huella.

Cuando presionas:

**🚨 PERDÍ A MI MASCOTA**

Huella podría activar automáticamente un protocolo:

1.  Cambia el estado del perfil a **PERDIDO**.
2.  Envía alertas a usuarios cercanos.
3.  Crea el área de búsqueda.
4.  Genera un cartel automáticamente.
5.  Permite compartirlo por WhatsApp/redes.
6.  Activa el seguimiento GPS si tiene dispositivo.
7.  Empieza a registrar avistamientos.
8.  Notifica veterinarias/refugios participantes de la zona.

La persona no debería tener que descubrir qué hacer justo cuando está
preocupada.

## 👁️ 3. Sistema de avistamientos

Una persona ve un perro aparentemente perdido y entra a:

**Encontré / vi una mascota**

Puede registrar:

-   📷 Foto
-   📍 Lugar
-   🕐 Hora
-   🐕 Dirección hacia donde caminaba
-   📝 Comentario

El propietario recibe:

> 🔔 Nuevo avistamiento de una mascota posiblemente compatible con Max a
> 850 metros de tu última ubicación registrada.

Así se construye una ruta aproximada.

## 🤖 4. Búsqueda mediante IA

Esta puede convertirse en una de las características diferenciadoras.

Una persona fotografía un perro encontrado.

Huella analiza características visuales y busca posibles coincidencias
entre los perros reportados como perdidos.

Por ejemplo:

### Posibles coincidencias

**94 % --- Max**\
Golden Retriever\
Perdido a 1,2 km

**71 % --- Toby**\
Golden Retriever\
Perdido a 8,7 km

Siempre debería hablarse de **posibles coincidencias**, no de
identificaciones definitivas.

## 🗺️ 5. Huella Map

Un mapa dedicado a mascotas.

Podría mostrar:

-   🔴 Perros perdidos
-   🟢 Perros encontrados
-   🟠 Últimos avistamientos
-   🏥 Veterinarias
-   🏠 Refugios
-   🌳 Parques para perros
-   ⚠️ Zonas de riesgo
-   💧 Bebederos
-   🐕 Eventos

Incluso podrías permitir reportes comunitarios:

> ⚠️ Perro agresivo suelto\
> ⚠️ Sustancia potencialmente peligrosa\
> ⚠️ Mascota atropellada\
> ⚠️ Zona con reportes de envenenamiento

Estos reportes necesitarían moderación y caducidad para evitar
información falsa o desactualizada.

## 📡 6. Huella Safety

Aquí entrarían los accesorios:

-   **Huella Tag** → QR
-   **Huella NFC** → QR + NFC
-   **Huella Smart Tag** → Bluetooth
-   **Huella GPS** → GPS/LTE
-   **Huella Collar** → dispositivo avanzado

Todos vinculados al mismo perfil.

## 🏠 7. Zonas seguras

Con el dispositivo GPS:

> 🏠 Casa\
> Radio seguro: 500 m

Cuando el perro salga:

**🚨 Max salió de su zona segura.**

También podrían existir zonas frecuentes:

-   🏠 Casa
-   🏡 Casa de familiares
-   🌳 Parque
-   🐕 Guardería

## 👨‍👩‍👧‍👦 8. Familia de la mascota

No necesariamente debe existir un único propietario.

Max podría tener:

-   **Administrador:** Alan
-   **Familia:** 3 personas
-   **Veterinario:** autorizado para información médica
-   **Paseador:** acceso temporal

Cada persona tendría permisos diferentes.

Esto permite implementar **RBAC --- Role-Based Access Control**.

El dueño controla quién puede ver ubicación, información veterinaria,
modificar el perfil, activar modo perdido, etc.

## 🏥 9. Pasaporte veterinario digital

Podrías incorporar:

### Salud de Max

-   Vacunas ✅
-   Desparasitación ✅
-   Próxima vacuna: 24/09/2026
-   Peso: 28,4 kg
-   Alergias: información registrada
-   Veterinaria: XXX

Y enviar recordatorios.

No sería necesario convertir Huella en un sistema clínico completo;
sería más útil como historial básico y conexión con profesionales.

## 📅 10. Calendario inteligente

Huella podría recordar:

> 💉 Vacuna dentro de 7 días.

> 🦷 Control veterinario mañana.

> 💊 Desparasitación pendiente.

> ✂️ Peluquería el sábado.

También puede convertirse en una fuente de recurrencia: el usuario tiene
razones para volver a Huella aunque nunca pierda a su mascota.

## 🏆 11. Sistema de reputación comunitaria

Se puede gamificar la ayuda.

Por ejemplo:

### Alan

-   🏅 Guardián Huella
-   ⭐ 4,9 reputación
-   🐕 7 avistamientos verificados
-   ❤️ 2 mascotas ayudadas a regresar

Insignias posibles:

-   **Explorador:** 10 avistamientos.
-   **Guardián:** ayudó a encontrar una mascota.
-   **Héroe Huella:** 5 mascotas reunidas.

Conviene evitar premiar cantidad sin validación porque podría incentivar
reportes basura.

## 🏘️ 12. Comunidades por barrio

Por ejemplo:

### Huella --- Ciudad Jardín

-   1.420 mascotas
-   2 mascotas perdidas
-   5 veterinarias
-   3 parques

Los usuarios reciben principalmente alertas relevantes para su zona.

Cuando desaparece una mascota, ya existe una comunidad local construida.

## 🐕 13. Match de amigos

Aquí entra la parte social.

### Max 🐕

-   Golden Retriever
-   3 años
-   Muy sociable
-   Le gusta correr
-   Compatible con perros grandes
-   📍 1,3 km

Los propietarios pueden encontrar perros compatibles para paseos.

El concepto sería: **Encontrar compañeros de paseo.**

## 🌳 14. Huella Places

Los usuarios califican lugares según qué tan amigables son con mascotas:

-   ⭐ Restaurantes pet-friendly
-   ⭐ Hoteles
-   ⭐ Parques
-   ⭐ Centros comerciales
-   ⭐ Veterinarias
-   ⭐ Guarderías
-   ⭐ Peluquerías

Aquí aparecen oportunidades comerciales posteriormente.

## 🏪 15. Marketplace

Cuando exista una base suficiente de usuarios:

### Huella Market

-   Alimentos
-   Collares
-   Placas Huella
-   GPS Huella
-   Juguetes
-   Camas
-   Servicios veterinarios
-   Paseadores
-   Guarderías
-   Seguros

Huella podría recibir comisión por algunas transacciones.

## 🆘 16. Botón de emergencia

Además de **Perdido**:

**🆘 EMERGENCIA**

Podría mostrar rápidamente veterinarias 24 horas cercanas y permitir
compartir ubicación e información relevante con un contacto.

## 📊 17. Estadísticas para el propietario

Con dispositivos futuros:

### Esta semana

-   🐾 Actividad diaria
-   🚶 Paseos
-   📍 Distancia
-   ⏱️ Tiempo activo
-   🏠 Tiempo fuera de casa

Esto crea utilidad diaria.

## 🛡️ 18. Seguridad contra robo de mascotas

Podrías permitir un estado específico:

**MASCOTA ROBADA**

Sería diferente de **Perdida**.

Huella conservaría registros de propiedad y cambios relevantes del
perfil, mientras restringe información que pueda facilitar localizar al
propietario o la mascota.

También sería importante bloquear transferencias sospechosas del perfil
mientras exista una alerta.
