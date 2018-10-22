import { Controller, Get, Post, Body, Delete, HttpCode, Param, Patch } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { IRoute } from './models/route.interface';
import { CreateRouteDto, PatchRouteDto } from './models/route.dto';

@Controller('api/routes')
export class RoutesController {

  constructor(
    private readonly _routesService: RoutesService,
  ) {}

  @Get()
  public getAll(): Promise<IRoute[]> {
    return this._routesService.getAll();
  }

  @Get(':id')
  public getById(@Param() params): Promise<IRoute> {
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
