import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Workspace } from './models/workspace.entity';
import { WorkspacesController } from './workspaces.controller';
import { WorkspacesService } from './workspaces.service';
import { RoutesModule } from '../routes/routes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ Workspace ]),
    RoutesModule,
  ],
  controllers: [ WorkspacesController ],
  providers: [ WorkspacesService ],
})
export class WorkspacesModule {}
