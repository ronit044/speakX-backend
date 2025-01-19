const { MongoClient } = require('mongodb');

// MongoDB connection URI (replace with your actual connection string)
const uri = 'mongodb+srv://myAtlasDBUser:ashu6608@myatlasclusteredu.6tc93ao.mongodb.net?retryWrites=true&w=majority&appName=myAtlasClusterEDU'; 

let db;

const connectDB = async () => {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db('speakx'); // Connect to the 'speakx' database
    console.log('MongoDB connected to the "speakx" database');
    return db;  // Return the db object after successful connection
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Database connection failed');
  }
};

// Export the connectDB function, not the db object
module.exports = { connectDB };
