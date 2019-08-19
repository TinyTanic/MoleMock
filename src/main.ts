import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import env from './scripts/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(env.PORT);
}
bootstrap();
