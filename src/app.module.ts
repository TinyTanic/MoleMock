import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WorkspacesModule } from './workspaces/workspaces.module';
import { RoutesModule } from './routes/routes.module';
import { ApiModule } from './api/api.module';

import env from './scripts/env';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: env.DATABASE_URL,
      entities: ['src/**/**.entity{.ts,.js}'],
      synchronize: true,
    }),
    WorkspacesModule,
    RoutesModule,
    AuthModule,
    UserModule,
    ApiModule,
  ],
  controllers: [ AppController ],
  providers: [ AppService ],
})
export class AppModule {}
