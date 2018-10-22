import { Controller, Get, Param, Render } from '@nestjs/common';
import * as Handlebars from 'hbs';
import { WorkspacesService } from 'workspaces/workspaces.service';

import { RoutesService } from './routes/routes.service';

@Controller()
export class AppController {

  constructor(
    private readonly _workspacesService: WorkspacesService,
    private readonly _routesService: RoutesService,
  ) {
    Handlebars.registerHelper('json', (context) => {
      console.log(context)
      return JSON.stringify(context);
    });

  }

  @Get()
  @Render('index')
  public root() {
    return ({
      message: 'hello world!',
    });
    // return this.appService.root();
  }

  @Get('workspaces')
  @Render('workspaces')
  public async workspaces() {
    return ({
      workspaces: await this._workspacesService.getAll(),
    });
  }

  @Get('workspace/:id')
  @Render('workspace-detail')
  public async workspace(@Param() params) {
    return ({
      workspace: await this._workspacesService.getById(params.id),
    });
  }

  @Get('route/:id')
  @Render('route-detail')
  public async route(@Param() params) {
    const route = await this._routesService.getById(params.id);
    return ({
      route,
    });
  }
}
