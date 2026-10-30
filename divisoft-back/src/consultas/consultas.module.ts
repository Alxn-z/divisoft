import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultasController } from './consultas.controller';
import { ConsultasService } from './consultas.service';
import { Consulta } from './entities/consulta.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Consulta])],
  controllers: [ConsultasController],
  providers: [ConsultasService],
  exports: [ConsultasService, TypeOrmModule],
})
export class ConsultasModule {}
