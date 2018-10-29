import { Column, Entity, PrimaryColumn, OneToMany } from 'typeorm';
import { Route } from '../../routes/models/route.entity';

@Entity()
export class Workspace {

  @PrimaryColumn() id: string;

  @Column() name: string;

  @Column() description: string;

  @OneToMany(type => Route, route => route.workspace)
  routes: Route[];

}