import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdatePerfilDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(120)
  nombre?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @Matches(/^[0-9]{10}$/, { message: 'El telefono debe tener 10 digitos' })
  telefono?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsEmail({}, { message: 'El correo no es valido' })
  correo?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  direccion?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  @MinLength(8)
  @MaxLength(50)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, {
    message:
      'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*)',
  })
  password?: string;
}
