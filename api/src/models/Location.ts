import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Reservation, Show, Staff } from './';

@Entity({ name: 'Location' })
export class Location extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  name: string;

  @Column({ default: '' })
  address: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: 25 })
  seat: number;

  @OneToMany(() => Show, (show) => show.location)
  shows: Show[];

  @OneToMany(() => Staff, (staff) => staff.location)
  staffs: Staff[];
}
