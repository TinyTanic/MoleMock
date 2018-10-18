import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateWorkspaceDto } from './models/workspace.dto';
import { Workspace } from './models/workspace.entity';
import { IWorkspace, IWorkspaceDetail } from './models/workspace.interface';
import { stripData, generateId } from '../common/utils/data-manager';
import { RoutesService } from '../routes/routes.service';

@Injectable()
export class WorkspacesService {

  constructor(
    @InjectRepository(Workspace) private readonly _workspaceRepository: Repository<Workspace>,
    private readonly _routesService: RoutesService,
    ) {}

  public async getAll(): Promise<IWorkspace[]> {
    return await this._workspaceRepository.find();
  }

  public async getById(workspaceId): Promise<IWorkspaceDetail> {
    const [ workspace ] = await this._workspaceRepository.find({ id: workspaceId });

    if (workspace) {
      const routes = await this._routesService.getByWorkspaceId(workspaceId);
      return ({ ...workspace, routes });
    }
    return null;
  }

  public async create(workspace: CreateWorkspaceDto): Promise<IWorkspace> {
    return await this._workspaceRepository.save({ ...workspace, id: generateId(workspace.name) });
  }

  public async remove(workspaceId: string) {
    return await this._workspaceRepository.delete(workspaceId);
  }

}
