import * as dotenv from 'dotenv';
dotenv.config();

export const SECRET_KEY = process.env.SECRET_KEY as string;
