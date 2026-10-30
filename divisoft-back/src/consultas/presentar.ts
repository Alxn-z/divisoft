import { Consulta } from './entities/consulta.entity';

export function presentarConsulta(consulta: Consulta) {
  return {
    id: consulta.id,
    nombre: consulta.nombre,
    correo: consulta.correo,
    telefono: consulta.telefono,
    empresa: consulta.empresa,
    proyecto: consulta.proyecto,
    estado: consulta.estado,
    createAt: consulta.createAt,
  };
}
