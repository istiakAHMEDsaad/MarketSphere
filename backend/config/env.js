import dotenv from 'dotenv';

dotenv.config({
  path: '.env',
  quiet: true,
});

export const {DB_URL, PORT, SECRET_KEY, CLIENT_URL} = process.env;
