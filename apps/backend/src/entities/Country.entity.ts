import { Column, Entity, OneToMany } from 'typeorm';
import { State } from './State.entity';

@Entity('country', { schema: 'foxdelivery' })
export class Country {
  @Column('int', { primary: true, name: 'id' })
  id: number;

  @Column('varchar', { name: 'Name', nullable: true, length: 255 })
  name: string | null;

  @OneToMany(() => State, (state) => state.country)
  states: State[];
}
