import { Body, Controller, Delete, Get, HttpCode, Param, Post, HttpException, HttpStatus } from '@nestjs/common';

import { CreateWorkspaceDto } from './models/workspace.dto';
import { IWorkspace, IWorkspaceDetail } from './models/workspace.interface';
import { WorkspacesService } from './workspaces.service';
import { RoutesService } from '../routes/routes.service';

@Controller('workspaces')
export class WorkspacesController {

  constructor(
    private readonly _workspacesService: WorkspacesService,
  ) {}

  @Get()
  public findAll(): Promise<IWorkspace[]> {
    return this._workspacesService.getAll();
  }

  @Get(':id')
  public async find(@Param() params): Promise<IWorkspaceDetail> {
    const { id } = params;
    const workspace = await this._workspacesService.getById(id);

    if (!!workspace) {
      return workspace;
    } else {
      throw new HttpException('No workspaces found', HttpStatus.NOT_FOUND);
    }

  }

  @Post()
  public async create(@Body() createWorkspaceDto: CreateWorkspaceDto): Promise<IWorkspace> {
    return await this._workspacesService.create(createWorkspaceDto);
  }

  @Delete(':id')
  @HttpCode(204)
  public async remove(@Param() params) {
    await this._workspacesService.remove(params.id);
  }
}
