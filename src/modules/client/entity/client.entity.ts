import { Address } from 'src/modules/client/entity/address.entity';
import {
  Column,
  Entity,
  JoinColumn,
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
    cascade: ['insert', 'update', 'remove'], // with 1:1 remove in cascade it's not working
    eager: true, //eager return the relationed data
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  address!: Address;
}
