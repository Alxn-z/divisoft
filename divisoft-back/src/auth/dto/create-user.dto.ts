import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsJSON, IsNumber, IsObject, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {
    
    @ApiProperty({ required: false, type: String, description: 'Ignorado en el registro público. El rol asignado es Usuario.' })
    @IsOptional()
    @IsString()
    rolId?: string;

    @ApiProperty({ required: false, description: 'Opcional. No se muestra en el perfil público.' })
    @IsOptional()
    @IsString()
    documento?: string;

    @ApiProperty()
    @IsString({
        message: 'El nombre es necesario'
    })
    nombre: string;

    @ApiProperty()
    @IsString({
        message: 'El telefono es necesario'
    })
    @Matches(/^[0-9]{10}$/, { message: 'El telefono debe tener 10 digitos' })
    telefono: string;

    @ApiProperty()
    @IsString({
        message: 'El correo es necesario'
    })
    @IsEmail({}, { message: 'El correo no es valido' })
    correo: string;

    @ApiProperty({
        description: 'Mínimo 8 caracteres, con mayúscula, minúscula, número y carácter especial',
        example: 'Huella1!',
    })
    @IsString({ message: 'La contraseña es necesaria' })
    @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
    @MaxLength(50, { message: 'La contraseña no puede exceder los 50 caracteres' })
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/, {
        message: 'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial (!@#$%^&*)',
    })
    password: string;

    @ApiProperty({ required: false })
    @IsString()
    @IsOptional()
    direccion?: string;

    @ApiProperty({ required: false })
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;


}
