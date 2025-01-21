require('dotenv').config({ path: process.env.PWD + '/.env' });  

const mongoose = require('mongoose');

if (!process.env.MONGODB_URI) {
  throw new Error('MONGO_URI is missing in the environment variables.');
}

if (!process.env.MONGODB_DB_NAME) {
  throw new Error('MONGO_DB_NAME is missing in the environment variables.');
}

const connect = async () => {
  try {
    const uri = process.env.MONGODB_URI; 
    const dbName = process.env.MONGODB_DB_NAME; 

    console.log(`Connecting to MongoDB with URI: ${uri}/${dbName}`);
    
    // Conectar a MongoDB
    await mongoose.connect(`${uri}/${dbName}`);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error.message);
  }
};

module.exports = { connect };