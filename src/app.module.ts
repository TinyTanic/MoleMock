import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RoutesModule } from './routes/routes.module';
import env from './scripts/env';
import { UserModule } from './user/user.module';
import { WorkspacesModule } from './workspaces/workspaces.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: env.DATABASE_URL,
      entities: ['src/**/**.entity{.ts,.js}'],
      synchronize: true,
      ssl: env.DATABASE_SSL ? {
        rejectUnauthorized: false,
      } : undefined,
    }),
    WorkspacesModule,
    RoutesModule,
    AuthModule,
    UserModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
