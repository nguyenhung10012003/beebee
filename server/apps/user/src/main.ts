import { NestFactory } from '@nestjs/core';
import { UserModule } from './user.module';
import * as process from 'process';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(UserModule);
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };
  app.enableCors(corsOptions);
  await app.listen(process.env.USER_SERVICE_PORT || 3001);
}

bootstrap();
