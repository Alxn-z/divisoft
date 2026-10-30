import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class LoginUserDto {
  @ApiProperty({
    description: "Correo electrónico del usuario",
    example: "usuario@ejemplo.com",
  })
  @IsEmail({}, { message: "El correo no es válido" })
  @Matches(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, {
    message: "El formato del correo no es válido",
  })
  correo: string;

  @ApiProperty({
    description: "Contraseña del usuario (mínimo 8 caracteres, con mayúscula, minúscula, número y carácter especial)",
    example: "P@ssw0rd",
  })
  @IsString({ message: "La contraseña es necesaria" })
  @MinLength(5, { message: "La contraseña debe tener al menos 5 caracteres" })
  @MaxLength(50, { message: "La contraseña no puede exceder los 50 caracteres" })
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, {
    message:
      "La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*)",
  })
  password: string;
}