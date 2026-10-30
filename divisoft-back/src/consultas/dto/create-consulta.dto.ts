import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateConsultaDto {
  @ApiPropertyOptional({ description: 'Identificador estable para reintentar el mismo envío.' })
  @IsOptional()
  @IsUUID()
  id?: string;

  @ApiProperty()
  @IsString()
  @MinLength(2)
  @MaxLength(120)
  nombre: string;

  @ApiProperty()
  @IsEmail()
  @MaxLength(254)
  correo: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(30)
  telefono?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(160)
  empresa?: string;

  @ApiProperty()
  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  proyecto: string;

  @ApiProperty()
  @IsBoolean()
  consentimiento: boolean;
}
