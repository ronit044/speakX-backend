const grpc = require('@grpc/grpc-js');
const grpcServer = require('./routes/grpcRoutes');
const {connectDB,db} = require('./app'); // MongoDB connection setup

// Connect to MongoDB
connectDB();
// console.log("hh");

const PORT = 50051;

// Start the gRPC server
grpcServer.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (error) => {
  if (error) {
    console.error('Error starting gRPC server:', error);
    return;
  }
  console.log(db);
  console.log(`gRPC server running on port ${PORT}`);
  grpcServer.start();
});
