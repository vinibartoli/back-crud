import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config();

export default new DataSource({
  type: 'mariadb',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? +process.env.DB_PORT : 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(process.cwd(), 'src', 'typeorm', 'entities', '*.entity{.ts,.js}')],
  migrations: [join(process.cwd(), 'src', 'typeorm', 'migrations', '*{.ts,.js}')],
  synchronize: false,
});