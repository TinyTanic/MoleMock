import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ApiModule } from './api/api.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { RoutesModule } from './routes/routes.module';
import { UserModule } from './user/user.module';
import { WorkspacesModule } from './workspaces/workspaces.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        let ssl: any;
        if (configService.get('DATABASE_SSL') === 'true') {
          ssl = {
            rejectUnauthorized: false,
          };
        }
        console.log({
          type: 'postgres',
          url: configService.get('DATABASE_URL'),
          entities: ['src/**/**.entity{.ts,.js}'],
          synchronize: true,
          ssl,
        })

        return {
          type: 'postgres',
          url: configService.get('DATABASE_URL'),
          entities: ['src/**/**.entity{.ts,.js}'],
          synchronize: true,
          ssl,
        };
      },
    }),
    ConfigModule.forRoot(),
    WorkspacesModule,
    RoutesModule,
    AuthModule,
    UserModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
