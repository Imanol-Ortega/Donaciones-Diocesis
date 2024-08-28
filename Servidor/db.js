import pg from 'pg';

export const pool = new pg.Pool({
    user: "postgres",
    host: "localhost",
    database: "Donaciones",
    password: "imanol123",
    port: 5432
});