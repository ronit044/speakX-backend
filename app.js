const { MongoClient } = require('mongodb');
//TODO: to be replaced in dotenv file
const uri='mongodb+srv://myAtlasDBUser:ashu6608@myatlasclusteredu.6tc93ao.mongodb.net?retryWrites=true&w=majority&appName=myAtlasClusterEDU'; 
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
