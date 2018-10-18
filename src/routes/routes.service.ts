import { Injectable } from '@nestjs/common';
import { IRoute } from './models/route.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Route } from './models/route.entity';
import { Repository } from 'typeorm';
import { CreateRouteDto, PatchRouteDto } from './models/route.dto';
import { generateId } from '../common/utils/data-manager';

@Injectable()
export class RoutesService {

  constructor(
    @InjectRepository(Route) private readonly _routesRepository: Repository<Route>,
  ) {}

  public async getByWorkspaceId(workspaceId: string): Promise<Route[]> {
    return this._routesRepository
      .createQueryBuilder('route')
      .select([ 'route.id', 'route.name', 'route.description' ])
      .where('route.workspace = :workspace', {
        workspace: workspaceId,
      })
      .getMany();
  }

  public async getById(routeId: string): Promise<Route> {
    return this._routesRepository.findOne(routeId);
  }

  public async getPayloadById(routeId: string): Promise<any> {
    const route = await this._routesRepository.findOne(routeId);
    return route && route.payload;
  }

  public async getAll(): Promise<Route[]> {
    return this._routesRepository.find();
  }

  public async create(route: CreateRouteDto): Promise<IRoute> {
    return await this._routesRepository.save({ ...route, id: generateId(route.name) });
  }

  public async update(route: PatchRouteDto): Promise<IRoute> {
    return await this._routesRepository.save(route);
  }

  public async remove(routeId: string) {
    return await this._routesRepository.delete(routeId);
  }

}
