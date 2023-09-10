import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //   const configService = app.get(ConfigService);

  //   const corsOptions: CorsOptions = {
  //     origin: 'http://localhost:3000',
  //     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  //     preflightContinue: false,
  //     optionsSuccessStatus: 200,
  //     credentials: true,
  //     allowedHeaders: 'Content-Type, Accept',
  // };
  app.useGlobalPipes(new ValidationPipe({ stopAtFirstError: true }));
  app.enableCors();

  await app.listen(3001);
}
bootstrap();
