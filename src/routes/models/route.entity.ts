import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { Workspace } from '../../workspaces/models/workspace.entity';
import { User } from '../../user/dto/user.entity';

@Entity()
export class Route {
  @PrimaryColumn()
  id: string;

  @ManyToOne(type => Workspace, workspace => workspace.routes, {
    onDelete: 'CASCADE',
  })
  workspace: string;

  @ManyToOne(type => User, user => user.routes)
  user: string;

  @Column()
  name: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  referTo: string;

  @Column({
    type: 'jsonb',
    default: '{}',
  })
  payload: any;
}
