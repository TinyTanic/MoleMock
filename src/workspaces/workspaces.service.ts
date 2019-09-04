import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuidv4 from 'uuid/v4';

import { UserDto } from '../user/dto/user.dto';
import { CreateWorkspaceDto } from './models/workspace.dto';
import { Workspace } from './models/workspace.entity';
import { IWorkspace, IWorkspaceDetail } from './models/workspace.interface';
import { CreateRouteDto } from '../routes/models/route.dto';
import { User } from '../user/dto/user.entity';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private readonly _workspaceRepository: Repository<Workspace>,
  ) {}

  public async getAll(): Promise<IWorkspace[]> {
    return await this._workspaceRepository.find();
  }

  public async getByUser(user: UserDto) {
    return await this._workspaceRepository.find({
      where: {
        user: {
          id: user.id,
        },
      },
    });
  }

  public async getById(workspaceId, user: UserDto): Promise<IWorkspaceDetail> {
    const [workspace] = await this._workspaceRepository.find({
      relations: ['routes'],
      where: {
        id: workspaceId,
        user: {
          id: user.id,
        },
      },
    });
    if (workspace) {
      return {
        ...workspace,
        user: user.id,
      };
    } else {
      throw new NotFoundException('workspace not found');
    }
  }

  public async create(
    workspace: CreateWorkspaceDto,
    user: UserDto,
  ): Promise<IWorkspace> {
    const ws = await this._workspaceRepository.save({
      ...workspace,
      id: uuidv4(),
      user,
    });
    delete ws.user;
    return ws;
  }

  public async remove(workspaceId: string, user: UserDto) {
    return await this._workspaceRepository.delete({
      id: workspaceId,
      user: {
        id: user.id,
      },
    });
  }

  public async update(
    routeId: string,
    route: CreateRouteDto,
    user: User,
  ): Promise<IWorkspace> {
    const selectedRoute = await this._workspaceRepository.find({
      where: {
        id: routeId,
        user: user.id,
      },
    });
    return await this._workspaceRepository.save(route);
  }
}
