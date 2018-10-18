import { Controller, Get, Param, Post } from '@nestjs/common';
import { RoutesService } from '../routes/routes.service';

@Controller('api')
export class ApiController {

  constructor(
    private readonly _routesService: RoutesService,
  ) {}

  @Get(':id')
  public getByid(@Param() params) {
    return this._routesService.getPayloadById(params.id);
  }

}
