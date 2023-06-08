import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { City } from './City.entity';
import { Country } from './Country.entity';

@Index('country_id', ['countryId'], {})
@Entity('state', { schema: 'foxdelivery' })
export class State {
  @Column('int', { primary: true, name: 'id' })
  id: number;

  @Column('varchar', { name: 'Name', nullable: true, length: 255 })
  name: string | null;

  @Column('int', { name: 'country_id' })
  countryId: number;

  @OneToMany(() => City, (city) => city.state)
  cities: City[];

  @ManyToOne(() => Country, (country) => country.states, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'country_id', referencedColumnName: 'id' }])
  country: Country;
}
