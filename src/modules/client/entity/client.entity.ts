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

  @OneToOne(() => Address, { cascade: ['insert'] })
  @JoinColumn()
  address!: Address;
}
