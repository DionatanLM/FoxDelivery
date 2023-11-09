import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { City } from './City.entity';
import { Order } from './Order.entity';
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

  @Column({ name: 'postal_code', length: 8 })
  postalCode: string;

  @Column({ length: 100 })
  address: string;

  @Column('varchar', {
    name: 'neighborhood',
    nullable: true,
    length: 100,
  })
  neighborhood: string | null;

  @Column('int', { name: 'id_city', nullable: true })
  idCity: number | null;

  @ManyToOne(() => City, (cidade) => cidade.deliverymanCity, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
    eager: true,
  })
  @JoinColumn([{ name: 'id_city', referencedColumnName: 'id' }])
  city: City;

  @Column({ name: 'lat', length: 100 })
  lat: string;

  @Column({ name: 'lng', length: 100 })
  lng: string;

  @Column('boolean', { name: 'is_active' })
  isActive: boolean;

  @Column({ nullable: true })
  createdAt: Date;

  @Column({ nullable: true })
  updatedAt: Date;

  @Column({ nullable: true })
  deleteAt: Date;

  @Column({ nullable: true })
  inactivatedAt: Date;

  @OneToMany(() => Order, (order) => order.deliverymanUuid)
  order: Order[];
}
