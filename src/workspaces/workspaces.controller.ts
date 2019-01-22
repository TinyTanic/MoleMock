import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { User } from '../common/decorators/user.decorator';
import { UserDto } from '../user/dto/user.dto';
import { CreateWorkspaceDto } from './models/workspace.dto';
import { IWorkspace, IWorkspaceDetail } from './models/workspace.interface';
import { WorkspacesService } from './workspaces.service';

@Controller('api/workspaces')
@UseGuards(JwtAuthGuard)
export class WorkspacesController {

  constructor(
    private readonly _workspacesService: WorkspacesService,
  ) {}

  @Get()
  public findAll(@User() user: UserDto): Promise<IWorkspace[]> {
    return this._workspacesService.getByUser(user);
  }

  @Get(':id')
  public async find(@Param() params, @User() user: UserDto): Promise<IWorkspaceDetail> {
    const { id } = params;
    const workspace = await this._workspacesService.getById(id, user);

    if (!!workspace) {
      return workspace;
    } else {
      throw new HttpException('No workspaces found', HttpStatus.NOT_FOUND);
    }

  }

  @Post()
  public async create(@Body() createWorkspaceDto: CreateWorkspaceDto, @User() user: UserDto): Promise<IWorkspace> {
    return await this._workspacesService.create(createWorkspaceDto, user);
  }

  @Delete(':id')
  @HttpCode(204)
  public async remove(@Param() params, @User() user: UserDto) {
    await this._workspacesService.remove(params.id, user);
  }
}
