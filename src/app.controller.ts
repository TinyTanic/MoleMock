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

}
