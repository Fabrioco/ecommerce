import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterUser } from './dtos/register-user.dto.js';
import { TokenService } from './services/token.service.js';
import { HashService } from './services/hash.service.js';
import { LoginUserDto } from './dtos/login-user.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly token: TokenService,
    private readonly hash: HashService,
  ) {}

  async register(dto: RegisterUser) {
    const email = dto.email.trim().toLowerCase();
    const existingUser = await this.prisma.db.User.where({
      email,
    }).first();

    if (existingUser) {
      throw new ConflictException('Email já cadastrado');
    }

    const hashedPassword = await this.hash.hashPassword(dto.password);

    const id = crypto.randomUUID();

    const newUser = await this.prisma.db.User.create({
      id,
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
    });

    const payload = {
      sub: id,
      name: dto.name,
      email: dto.email,
    };

    const accessToken = this.token.generateAccessToken(payload);
    const refreshToken = this.token.generateRefreshToken({ sub: newUser.id });

    return {
      accessToken,
      refreshToken,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        createdAt: newUser.createdAt,
        updatedAt: newUser.updatedAt,
      },
    };
  }

  async login(dto: LoginUserDto) {
    const existingUser = await this.prisma.db.User.where({
      email: dto.email,
    }).first();

    if(!existingUser) {
      throw new UnauthorizedException('Email ou senha inválidos.')
    }

    const comparedPassword = this.hash.comparePassword(dto.password, existingUser.password)

    if(!comparedPassword) {
      throw new UnauthorizedException('Email ou senha Inválidos.')
    }

    const payload = {
      sub: existingUser.id,
      name: existingUser.name!,
      email: existingUser.email
    }

    const accessToken = this.token.generateAccessToken(payload)
    const refreshToken = this.token.generateRefreshToken({
      sub: payload.sub
    })

    return {
      accessToken,
      refreshToken,
      user: {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        createdAt: existingUser.createdAt,
        updatedAt: existingUser.updatedAt,
      }
    }
  }
}
