# Registro de clientes y consultas

La landing guarda las consultas en PostgreSQL a través del API, en la tabla `consultas`. El proceso está en [ALMACENAR-CONSULTAS.md](ALMACENAR-CONSULTAS.md).

El archivo `supabase/migrations/202610280001_client_inquiries.sql` no es el almacén en uso. No hace falta una clave de Supabase en el navegador.
