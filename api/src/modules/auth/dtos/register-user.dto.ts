import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

export class RegisterUser {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @ApiProperty({
    example: 'Usuário Teste',
  })
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({
    example: 'usuario@email.com',
  })
  email!: string;

  @IsString()
  @MinLength(8)
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
    message:
      'A senha deve ter no mínimo 8 caracteres, pelo menos 1 letra maiúscula, 1 número e 1 caractere especial.',
  })
  @ApiProperty({
    example: 'Senha@123',
  })
  password!: string;
}
