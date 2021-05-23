import { Client } from 'pg';

export const connectDb = async () => {
  //const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;
  const client = new Client({
    //host: PG_HOST,
    //port: PG_PORT,
    //database: PG_DATABASE,
    //user: PG_USERNAME,
    //password: PG_PASSWORD,
    host: 'shop-database.cnmsbdj8de61.eu-west-1.rds.amazonaws.com',
    port: 5432,
    database: 'shop_database',
    user: 'master',
    password: '2GZU4OYVFEUVs2zaHXJF',
    application_name: "aws_shop",
    connectionTimeoutMillis: 5000,
    ssl: {
      rejectUnauthorized: false
    }
  });
  await client.connect();
  return client;
};
