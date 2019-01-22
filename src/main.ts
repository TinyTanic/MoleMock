import { NestFactory } from '@nestjs/core';
import { join } from 'path';

import { AppModule } from './app.module';
import env from './scripts/env';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(env.PORT);
}
bootstrap();
