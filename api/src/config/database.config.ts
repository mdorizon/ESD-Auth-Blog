import { Client } from 'pg';

const client = new Client({
  host: 'localhost',
  port: 5432,
  user: 'admin',
  password: 'admin',
  database: 'authblog-database'
});

client.connect((err) => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to PostgreSQL database!');
  }
});

export default client;