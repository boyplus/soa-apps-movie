import {
  BaseEntity,
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'Admin' })
export class Admin extends BaseEntity {
  @PrimaryColumn()
  id: String;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;
}
