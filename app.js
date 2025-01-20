const { MongoClient } = require('mongodb');
require('dotenv').config();
//TODO: to be replaced in dotenv file
const uri=process.env.MONGO_URI; 
let db;
const connectDB=async () => {
  try {
    const client=new MongoClient(uri);
    await client.connect();
    db=client.db('speakx');
    console.log('"speakx" db connected');
    return db;
  } 
  catch (error) 
  {
    console.error('app.js->mongodb connection: ', error);
    throw new Error('app.js -> mongodb connection error');
  }
};
module.exports = { connectDB };
