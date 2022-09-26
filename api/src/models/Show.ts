import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import { Reservation, Location, Movie } from './';

@Entity({ name: 'Show' })
export class Show extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  startDate: string;

  @Column()
  startSlot: number;

  @Column({ default: true })
  isActive: boolean;

  @ManyToOne((type) => Location)
  @JoinColumn({ name: 'locationId' })
  location: Location;

  @Column()
  locationId: number;

  @ManyToOne((type) => Movie)
  @JoinColumn({ name: 'movieId' })
  movie: Movie;

  @Column()
  movieId: number;
}
