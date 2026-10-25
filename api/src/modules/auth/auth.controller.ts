import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterUser } from './dtos/register-user.dto.js';
import { AuthService } from './auth.service.js';
import { RegisterUserResponse } from './dtos/register-user-response.dto.js';

@Controller('auth')
@ApiTags('Autenticação')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Post('register')
  @ApiResponse({
    status: 201,
    type: RegisterUserResponse,
  })
  signUp(@Body() dto: RegisterUser) {
    return this.service.register(dto);
  }
}
