import { ApiProperty } from '@nestjs/swagger';

export class RegisterUserResponseUser {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'Maria Silva' })
  name: string;

  @ApiProperty({ example: 'maria@example.com' })
  email: string;

  @ApiProperty({ example: '2025-01-15T10:30:00.000Z' })
  createdAt: string;

  @ApiProperty({ example: '2025-01-15T10:30:00.000Z' })
  updatedAt: string;
}

export class RegisterUserResponse {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiJ9.example.access-token' })
  accessToken: string;

  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiJ9.example.refresh-token' })
  refreshToken: string;

  @ApiProperty({ type: RegisterUserResponseUser })
  user: RegisterUserResponseUser;
}
