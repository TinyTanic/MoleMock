import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuidv4 from 'uuid/v4';

import { UserDto } from '../user/dto/user.dto';
import { CreateWorkspaceDto } from './models/workspace.dto';
import { Workspace } from './models/workspace.entity';
import { IWorkspace } from './models/workspace.interface';

@Injectable()
export class WorkspacesService {

  constructor(
    @InjectRepository(Workspace) private readonly _workspaceRepository: Repository<Workspace>,
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

  public async getById(workspaceId, user: UserDto): Promise<Workspace> {
    const [ workspace ] = await this._workspaceRepository.find({
      relations: ['routes'],
      where: {
        id: workspaceId,
        user: {
          id: user.id,
        },
      },
    });
    return workspace;
  }

  public async create(workspace: CreateWorkspaceDto, user: UserDto): Promise<IWorkspace> {
    return await this._workspaceRepository.save({
      ...workspace,
      id: uuidv4(),
      user,
    });
  }

  public async remove(workspaceId: string, user: UserDto) {
    return await this._workspaceRepository.delete({
      id: workspaceId,
      user: {
        id:
        user.id,
      },
    });
  }

}
