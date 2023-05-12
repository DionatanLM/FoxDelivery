import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './City.entity';
import { User } from './User.entity';

@Entity('store', { schema: 'foxdelivery' })
export class Store {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ length: 255 })
  name: string;

  @Column({ length: 20 })
  cellphone: string;

  @Column({ length: 14, unique: true })
  cnpj: string;

  @Column({ length: 8 })
  postal_code: string;

  @Column({ length: 100 })
  address: string;

  @Column({ length: 100 })
  neighborhood: string;

  @Column({ name: 'id_city' })
  idCity: number;

  @Column({ length: 45, nullable: true })
  category: string;

  @Column({ length: 45 })
  email: string;

  @Column({ type: 'timestamp', nullable: true })
  createdAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  updatedAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  deleteAt: Date;

  @Column({ type: 'timestamp', nullable: true })
  inactivatedAt: Date;

  @Column({ name: 'uuid_user' })
  uuidUser: string;

  @ManyToOne(() => User, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'uuid_user', referencedColumnName: 'uuid' })
  user: User;

  @ManyToOne(() => City, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'id_city', referencedColumnName: 'id' })
  city: City;
}
