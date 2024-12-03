import { Client } from 'src/modules/client/entity/client.entity';
import { Product } from 'src/modules/product/entity/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @Column({ type: Date, nullable: true })
  confirmAt: Date;

  @ManyToOne(() => Client, (client) => client.order, { eager: true })
  client!: Client;

  @ManyToMany(() => Product, { eager: true })
  @JoinTable({ name: 'order_products' })
  products: Product[];
}
