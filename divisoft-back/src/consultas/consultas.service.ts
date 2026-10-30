import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateConsultaDto } from './dto/create-consulta.dto';
import { Consulta } from './entities/consulta.entity';
import { presentarConsulta } from './presentar';
import { exigeConsentimiento } from './reglas';

@Injectable()
export class ConsultasService {
  constructor(
    @InjectRepository(Consulta)
    private readonly consultas: Repository<Consulta>,
  ) {}

  async crear(dto: CreateConsultaDto) {
    exigeConsentimiento(dto.consentimiento);
    const consulta = this.consultas.create({
      id: dto.id,
      nombre: dto.nombre.trim(),
      correo: dto.correo.trim().toLowerCase(),
      telefono: dto.telefono?.trim() || null,
      empresa: dto.empresa?.trim() || null,
      proyecto: dto.proyecto.trim(),
      consentimiento: true,
      versionConsentimiento: 'contact-v1',
      estado: 'nuevo',
    });
    try {
      const guardada = await this.consultas.save(consulta);
      return presentarConsulta(guardada);
    } catch (error) {
      const codigo = error instanceof QueryFailedError
        ? (error.driverError as { code?: string } | undefined)?.code
        : undefined;
      if (dto.id && codigo === '23505') {
        const previa = await this.consultas.findOne({ where: { id: dto.id } });
        if (previa) return presentarConsulta(previa);
      }
      throw error;
    }
  }
}
