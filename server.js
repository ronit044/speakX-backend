const grpc=require('@grpc/grpc-js');
const grpcServer=require('./routes/grpcRoutes');
const {connectDB}=require('./app'); 
require('dotenv').config();
// connectDB();
const PORT = process.env.PORT || 50051;
grpcServer.bindAsync(`0.0.0.0:${PORT}`,grpc.ServerCredentials.createInsecure(),(error) => {
  if (error) {
    console.error('error occuring in bind async part:->>', error);
    return;
  }
  console.log(`server is up on ${PORT}`);
});
