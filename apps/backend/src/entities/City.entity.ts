import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm';
import { State } from './State.entity';

@Index('fk_City_State1', ['idState'], {})
@Entity('city', { schema: 'foxdelivery' })
export class City {
  @Column('int', { primary: true, name: 'id' })
  id: number;

  @Column('varchar', { name: 'Name', nullable: true, length: 255 })
  name: string | null;

  @Column('int', { name: 'Id_State' })
  idState: number;

  @ManyToOne(() => State, (state) => state.cities, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: true,
  })
  @JoinColumn([{ name: 'Id_State', referencedColumnName: 'id' }])
  state: State;
}
