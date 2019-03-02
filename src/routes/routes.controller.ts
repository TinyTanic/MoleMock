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

@Controller('api/route')
@UseGuards(JwtAuthGuard)
export class RoutesController {
  constructor(private readonly _routesService: RoutesService) {}

  @Get()
  public getAll(): Promise<Route[]> {
    return this._routesService.getAll();
  }

  @Get(':id')
  public getById(@Param() params): Promise<Route> {
    return this._routesService.getById(params.id);
  }

  @Post()
  public async create(@Body() createRouteDto: CreateRouteDto): Promise<IRoute> {
    return await this._routesService.create(createRouteDto);
  }

  @Patch()
  public async update(@Body() route: PatchRouteDto) {
    return this._routesService.update(route);
  }

  @Delete(':id')
  @HttpCode(204)
  public async remove(@Param() params) {
    await this._routesService.remove(params.id);
  }
}
