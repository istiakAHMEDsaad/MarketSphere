import {DB_URL} from '../config/env.js';
import mongoose from 'mongoose';

if(!DB_URL) {
  throw new Error('Please define DB_URL in .env file');
}

const connectToDB = async() => {
  try {
    await mongoose.connect(DB_URL);
    console.log(`Connected to database`);
  } catch (error) {
    console.log('Error connecting to db', error);
    process.exit(1);
  }
}

export default connectToDB;