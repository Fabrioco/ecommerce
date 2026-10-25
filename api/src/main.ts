import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('API de ecommerce')
    .setDescription('Documentação')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  SwaggerModule.setup('/docs', app, SwaggerModule.createDocument(app, config));
  await app.listen(process.env.PORT ?? 3000);

  console.log('O Swagger ta rodando na URL: http://localhost:3000/docs');
}
await bootstrap();
