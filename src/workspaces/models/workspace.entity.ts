import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Workspace {

  @PrimaryColumn() id: string;

  @Column() name: string;

  @Column() description: string;

}