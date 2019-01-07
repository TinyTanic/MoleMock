import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RoutesService } from '../routes/routes.service';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';

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
