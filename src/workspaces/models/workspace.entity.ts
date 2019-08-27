import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';

import { Route } from '../../routes/models/route.entity';
import { User } from '../../user/dto/user.entity';

@Entity()
export class Workspace {
  @PrimaryColumn() id: string;

  @Column() name: string;

  @Column() description: string;

  @ManyToOne(type => User, user => user.workspaces)
  user: User;

  @OneToMany(type => Route, route => route.workspace, {
    cascade: true,
  })
  routes: Route[];
}
