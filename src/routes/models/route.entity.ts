import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Route {

  @PrimaryColumn() id: string;

  @Column() workspace: string;

  @Column() name: string;

  @Column() description: string;

  @Column({ type: 'jsonb', default: '{}' }) payload: any;

}