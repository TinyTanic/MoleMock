import { Column, Entity, ManyToOne, PrimaryColumn } from 'typeorm';

import { Workspace } from '../../workspaces/models/workspace.entity';

@Entity()
export class Route {

  @PrimaryColumn() id: string;

  @ManyToOne(type => Workspace, workspace => workspace.routes)
  workspace: string;

  @Column() name: string;

  @Column() description: string;

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