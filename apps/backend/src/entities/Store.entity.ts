import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './City.entity';
@Entity('store', { schema: 'foxdelivery' })
export class Store {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ name: 'name', length: 255 })
  name: string;

  @Column({ name: 'responsible_name', length: 255 })
  responsibleName: string;

  @Column({ name: 'cellphone', length: 20 })
  cellphone: string;

  @Column({ name: 'cnpj', length: 14, unique: true })
  cnpj: string;

  @Column({ name: 'postal_code', length: 8 })
  postalCode: string;

  @Column({ name: 'address', length: 100 })
  address: string;

  @Column({ name: 'category', length: 45, nullable: true })
  category: string;

  @Column({ name: 'email', length: 45 })
  email: string;

  @Column({ name: 'createdAt', type: 'timestamp', nullable: true })
  createdAt: Date;

  @Column({ name: 'updatedAt', type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ name: 'deleteAt', type: 'timestamp', nullable: true })
  deleteAt: Date;

  @Column({ name: 'inactivatedAt', type: 'timestamp', nullable: true })
  inactivatedAt: Date;

  @Column('varchar', {
    name: 'neighborhood',
    nullable: true,
    length: 100,
  })
  neighborhood: string | null;

  @Column('int', { name: 'id_city', nullable: true })
  idCity: number | null;

  @ManyToOne(() => City, (cidade) => cidade.storeCity, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: true,
  })
  @JoinColumn([{ name: 'id_city', referencedColumnName: 'id' }])
  city: City;
}
