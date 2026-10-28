import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class LoginUserDto {
  @ApiProperty({
    example: "usuario@email.com"
  })
  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @ApiProperty({
    example: "Senha@123"
  })
  @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/, {
    message:
      'A senha deve ter no mínimo 8 caracteres, pelo menos 1 letra maiúscula, 1 número e 1 caractere especial.',
  })
  @IsString()
  @IsNotEmpty()
  password!: string;
}
