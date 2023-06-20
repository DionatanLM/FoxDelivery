import { Exclude } from 'class-transformer';
import { USER_ROLE } from 'src/config/constants/user-role.enum';
import * as bcrypt from 'bcrypt';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Deliveryman } from './Deliveryman.entity';
import { Store } from './Store.entity';

@Entity('user', { schema: 'foxdelivery' })
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'uuid' })
  uuid: string;

  @Column('varchar', { name: 'name', nullable: false, length: 100 })
  name: string | null;

  @Column('varchar', { name: 'imgUrl', nullable: true, length: 255 })
  imgUrl: string | null;

  @Column('varchar', { name: 'username', nullable: false, length: 100 })
  username: string;

  @Column('timestamp', { name: 'lastAccess' })
  lastAccess: Date | null;

  @CreateDateColumn({ name: 'createdAt' })
  insertDate: Date | null;

  @UpdateDateColumn({ name: 'updatedAt' })
  updateDate: Date | null;

  @Column('enum', { enum: USER_ROLE, name: 'role', default: USER_ROLE.STORE })
  userRole: USER_ROLE;

  @Column('int', { name: 'user_token', nullable: true })
  userToken: number;

  @DeleteDateColumn({ name: 'deletedAt' })
  deletedAt: Date | null;

  @Column('varchar', { name: 'password', nullable: false, length: 100 })
  @Exclude({ toPlainOnly: true })
  password: string | null;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 11);
  }
}
