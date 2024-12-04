import { Address } from 'src/modules/client/entity/address.entity';
import { Order } from 'src/modules/order/entity/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: String, nullable: false, length: 30 })
  name!: string;

  @Column({ type: String, nullable: false, unique: true, length: 30 })
  email!: string;

  @OneToOne(() => Address, {
    cascade: ['insert', 'update'], // with 1:1 remove in cascade it's not working
    eager: true, //eager return the relationed data
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  address!: Address;

  @OneToMany(() => Order, (order) => order.client)
  orders?: Order[];
}
