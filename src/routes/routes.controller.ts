import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { CreateRouteDto, PatchRouteDto } from './models/route.dto';
import { Route } from './models/route.entity';
import { IRoute } from './models/route.interface';
import { RoutesService } from './routes.service';
import { User } from '../common/decorators/user.decorator';

@Controller('api/route')
// @UseGuards(JwtAuthGuard)
export class RoutesController {
  constructor(private readonly _routesService: RoutesService) {}

  @Get()
  public getAll(@User() user): Promise<Route[]> {
    return this._routesService.getAll(user);
  }

  @Get(':id')
  public getById(@Param() params, @User() user): Promise<Route> {
    return this._routesService.getById(params.id, user);
  }

  @Post()
  public async create(
    @Body() createRouteDto: CreateRouteDto,
    @User() user,
  ): Promise<IRoute> {
    return await this._routesService.create(createRouteDto, user);
  }

  @Patch(':id')
  public async update(
    @Body() route: PatchRouteDto,
    @Param('id') routeId,
    @User() user,
  ) {
    return this._routesService.update(routeId, route, user);
  }

  @Delete(':id')
  @HttpCode(204)
  public async remove(@Param() params, @User() user) {
    await this._routesService.remove(params.id, user);
  }
}
