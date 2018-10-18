import { Module } from '@nestjs/common';
import { RoutesController } from './routes.controller';
import { RoutesService } from './routes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './models/route.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Route ]),
  ],
  controllers: [ RoutesController ],
  providers: [ RoutesService ],
  exports: [ RoutesService ],
})
export class RoutesModule {}
