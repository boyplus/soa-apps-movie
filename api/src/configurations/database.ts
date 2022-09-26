// Config that is common to more than one part of the app.

import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import {
  Customer,
  Reservation,
  Admin,
  Staff,
  Location,
  Show,
  Movie,
} from '../models';
import * as dotenv from 'dotenv';
dotenv.config();

interface DatabaseInfoProps {
  HOST: string;
  PORT: string;
  USER_NAME: string;
  PASSWORD: string;
  NAME: string;
}

const DB_INFO: DatabaseInfoProps = {
  HOST: process.env.DATABASE_HOST as string,
  PORT: process.env.DATABASE_PORT as string,
  USER_NAME: process.env.DATABASE_USERNAME as string,
  PASSWORD: process.env.DATABASE_PASSWORD as string,
  NAME: process.env.DATABASE_NAME as string,
};

console.log('hello');
console.log(process.env.DATABASE_HOST);

const typeOrmConfig: PostgresConnectionOptions = {
  type: 'postgres',
  host: DB_INFO.HOST,
  port: Number(DB_INFO.PORT),
  username: DB_INFO.USER_NAME,
  password: DB_INFO.PASSWORD,
  database: DB_INFO.NAME,
  synchronize: true,
  logging: false,
  entities: [Customer, Reservation, Admin, Staff, Location, Show, Movie],
  ssl: true,
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export { typeOrmConfig };
