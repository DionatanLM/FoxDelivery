import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './City.entity';
import { User } from './User.entity';

@Entity('deliveryman', { schema: 'foxdelivery' })
export class Deliveryman {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column({ length: 255 })
  name: string;

  @Column()
  birthdate: Date;

  @Column({ length: 45 })
  email: string;

  @Column({ length: 20 })
  cellphone: string;

  @Column({ length: 11 })
  cpf: string;

  @Column({ length: 11 })
  cnh: string;

  @Column({ length: 8 })
  postalCode: string;

  @Column({ length: 100 })
  address: string;

  @Column({ length: 100 })
  neighborhood: string;

  @ManyToOne(() => City, { onDelete: 'NO ACTION', onUpdate: 'NO ACTION' })
  @JoinColumn({ name: 'id_city', referencedColumnName: 'id' })
  city: City;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  deleteAt: Date;

  @Column({ nullable: true })
  inactivatedAt: Date;

  @ManyToOne(() => User, (user) => user.deliveryman)
  @JoinColumn({ name: 'user_uuid' })
  user: User;
}
