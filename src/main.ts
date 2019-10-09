import { NestFactory } from '@nestjs/core';
import { json } from 'body-parser';

import { AppModule } from './app.module';
import env from './scripts/env';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use(json({ limit: '1mb' }));
  await app.listen(env.PORT);
}
bootstrap();
