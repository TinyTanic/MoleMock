import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {

  @PrimaryColumn() id: string;

  @Column() email: string;

  @Column() username: string;

  @Column() password: string;

  @Column() name: string;

  @Column() surname: string;

  // @OneToMany(type => Route, route => route.workspace)
  // routes: Route[];

}