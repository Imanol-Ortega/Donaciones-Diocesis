import pg from 'pg';
import { POSTGRES_URL } from './config.js';



export const pool = new pg.Pool({
    connectionString: POSTGRES_URL,
})


/*export const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "Donaciones",
    password: "imanol123",
    port: 5432
});*/