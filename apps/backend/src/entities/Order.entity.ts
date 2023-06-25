import { ORDER_STATUS } from 'src/config/constants/order-status.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Generated,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  UpdateDateColumn,
} from 'typeorm';
import { ColumnNumericTransformer } from 'src/transformers/column-numeric.transformer';
import { Deliveryman } from './Deliveryman.entity';
import { Store } from './Store.entity';

@Entity('order', { schema: 'foxdelivery' })
export class Order {
  @Column('varchar', { primary: true, name: 'uuid', length: 36 })
  @Generated('uuid')
  uuid: string;

  @Column('numeric', { name: 'order_number' })
  orderNumber: number;

  @Column({
    type: 'enum',
    name: 'status',
    enum: ORDER_STATUS,
    nullable: false,
  })
  status: ORDER_STATUS;

  @Column('numeric', {
    name: 'price',
    precision: 15,
    scale: 2,
    default: 0,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @Column({ type: 'varchar', name: 'description', nullable: true, length: 255 })
  description: string;

  @Column({
    type: 'varchar',
    name: 'type_payment',
    nullable: false,
    length: 45,
  })
  typePayment: string;

  @Column({ type: 'varchar', name: 'address', nullable: false, length: 100 })
  address: string;

  @Column({
    type: 'longtext',
    name: 'lat_lng_address',
    nullable: false,
  })
  latLngAddress: string;

  @Column({ type: 'varchar', name: 'address', nullable: true, length: 100 })
  addressComplement: string;

  @Column({ type: 'varchar', name: 'client_name', nullable: true, length: 100 })
  clientName: string;

  @Column({
    type: 'varchar',
    name: 'client_cellphone',
    nullable: true,
    length: 20,
  })
  clientCellphone: string;

  @Column({
    type: 'json',
    name: 'position_motoboy',
  })
  positionMotoboy: any;

  @Column('int', { name: 'rating' })
  rating: number;

  @Column('boolean', { name: 'created_by_store', default: 0 })
  createByStore: number;

  @Column('boolean', { name: 'accepted_by_deliveryman', default: 0 })
  acceptedByDeliveryman: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: Date;

  @Column('timestamp', { name: 'withdrawalTimeAt' })
  withdrawalTimeAt: Date | null;

  @Column('timestamp', { name: 'finishedAt' })
  finishedAt: Date | null;

  @UpdateDateColumn({ name: 'updatedAt' })
  updateDate: Date | null;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt: Date | null;

  @JoinColumn([{ name: 'deliveryman_uuid', referencedColumnName: 'uuid' }])
  deliverymanUuid: Deliveryman;

  @JoinColumn([{ name: 'store_uuid', referencedColumnName: 'uuid' }])
  storeUuid: Store;
}
