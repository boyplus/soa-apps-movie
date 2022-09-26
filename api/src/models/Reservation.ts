import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
  PrimaryColumn,
} from 'typeorm';

import { Customer, Location } from './';
import { Show } from './Show';

@Entity({ name: 'Reservation' })
export class Reservation extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  seatId: number;

  @ManyToOne(() => Customer, (customer) => customer.reservations)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column()
  customerId: string;

  @ManyToOne((type) => Show)
  @JoinColumn({ name: 'showId' })
  show: Show;

  @Column()
  showId: number;
}
