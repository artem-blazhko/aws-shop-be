import { Client } from 'pg';

export const connectDb = async () => {
  const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
  const client = new Client({
    host: PG_HOST,
    port: PG_PORT,
    database: PG_DATABASE,
    user: PG_USERNAME,
    password: PG_PASSWORD,
    application_name: "aws_shop",
    connectionTimeoutMillis: 5000,
    ssl: {
      rejectUnauthorized: false
    }
  });
  await client.connect();
  return client;
};
