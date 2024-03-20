import { NestFactory } from '@nestjs/core';
import { LoggerModule } from './logger.module';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(LoggerModule);
  await app.listen(process.env.LOGGER_SERVICE_PORT || 5000);
}

bootstrap();
