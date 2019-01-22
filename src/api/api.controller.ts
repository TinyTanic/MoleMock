import { Controller, Get, Param, UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { RoutesService } from '../routes/routes.service';

@Controller('api')
@UseGuards(JwtAuthGuard)
export class ApiController {

  constructor(
    private readonly _routesService: RoutesService,
  ) {}

  @Get(':id')
  public getByid(@Param() params) {
    return this._routesService.getPayloadById(params.id);
  }

}
