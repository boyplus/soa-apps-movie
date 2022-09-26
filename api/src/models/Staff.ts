import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Reservation, Location } from './';

@Entity({ name: 'Staff' })
export class Staff extends BaseEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne(() => Location, (location) => location.staffs)
  @JoinColumn({ name: 'locationId' })
  location: Location;

  @Column()
  locationId: number;
}
