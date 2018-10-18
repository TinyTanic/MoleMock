import { Get, Controller, Render, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { WorkspacesService } from 'workspaces/workspaces.service';

@Controller()
export class AppController {

  constructor(
    private readonly _workspacesService: WorkspacesService,
  ) {}

  @Get()
  @Render('index')
  public root() {
    return {
      message: 'hello world!'
    }
    // return this.appService.root();
  }

  @Get('workspaces')
  @Render('workspaces')
  public async workspaces() {
    return {
      workspaces: await this._workspacesService.getAll()
    }
  }

  @Get('workspace/:id')
  @Render('workspace')
  public async workspace(@Param() params) {
    return {
      workspace: await this._workspacesService.getById(params.id)
    }
  }
}
