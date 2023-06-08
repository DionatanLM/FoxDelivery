import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { State } from './State.entity';
import { Store } from './Store.entity';
import { Deliveryman } from './Deliveryman.entity';

@Index('state_id', ['idState'], {})
@Entity('city', { schema: 'foxdelivery' })
export class City {
  @Column('int', { primary: true, name: 'id' })
  id: number;

  @Column('varchar', { name: 'Name', nullable: true, length: 255 })
  name: string | null;

  @Column('int', { name: 'state_id' })
  idState: number;

  @ManyToOne(() => State, (state) => state.cities, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: true,
  })
  @JoinColumn([{ name: 'state_id', referencedColumnName: 'id' }])
  state: State;

  @OneToMany(() => Store, (store) => store.idCity)
  storeCity: Store[];

  @OneToMany(() => Deliveryman, (deliveryman) => deliveryman.idCity)
  deliverymanCity: Deliveryman[];
}
