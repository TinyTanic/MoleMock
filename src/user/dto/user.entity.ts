import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

import { Workspace } from '../../workspaces/models/workspace.entity';

@Entity()
export class User {

  @PrimaryColumn() id: string;

  @Column() email: string;

  @Column() username: string;

  @Column() password: string;

  @Column() name: string;

  @Column() surname: string;

  @OneToMany(type => Workspace, workspace => workspace.user)
  workspaces: Workspace[];

}