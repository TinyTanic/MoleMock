import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as uuidv4 from 'uuid/v4';

import { CreateRouteDto, PatchRouteDto } from './models/route.dto';
import { Route } from './models/route.entity';
import { IRoute } from './models/route.interface';
import { User } from '../user/dto/user.entity';
import { UserDto } from '../user/dto/user.dto';

@Injectable()
export class RoutesService {
  constructor(
    @InjectRepository(Route)
    private readonly _routesRepository: Repository<Route>,
  ) {}

  public async getByWorkspaceId(workspaceId: string): Promise<Route[]> {
    return this._routesRepository
      .createQueryBuilder('route')
      .select(['route.id', 'route.name', 'route.description'])
      .where('route.workspace = :workspace', {
        workspace: workspaceId,
      })
      .getMany();
  }

  public async getById(routeId: string, user: User): Promise<Route> {
    return this._routesRepository.findOne({
      where: {
        id: routeId,
        user: user.id,
      },
    });
  }

  public async getPayloadById(routeId: string): Promise<any> {
    const route = await this._routesRepository.findOne(routeId);
    return route && route.payload;
  }

  public async getAll(user: User): Promise<Route[]> {
    return this._routesRepository.find({ where: { user: user.id } });
  }

  public async create(route: CreateRouteDto, user: User): Promise<IRoute> {
    return await this._routesRepository.save({
      ...route,
      id: uuidv4(),
      user: user.id,
    });
  }

  public async update(
    routeId: string,
    route: PatchRouteDto,
    user: User,
  ): Promise<IRoute> {
    const selectedRoute = await this._routesRepository.find({
      where: {
        id: routeId,
        user: user.id,
      },
    });
    return await this._routesRepository.save(route);
  }

  public async remove(routeId: string, user: User) {
    return await this._routesRepository.delete({
      id: routeId,
      user: user.id,
    });
  }
}
