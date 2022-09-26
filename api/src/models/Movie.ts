import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

import { Reservation, Show } from './';

@Entity({ name: 'Movie' })
export class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  length: number;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => Show, (show) => show.movie)
  shows: Show[];
}
