const grpc = require('@grpc/grpc-js');
// const {connectDB}=require('../app');
const searchQuestions=require("../services/grpcService")

const protoLoader=require('@grpc/proto-loader');
const packageDefinition=protoLoader.loadSync('./proto/question.proto');
const questionProto=grpc.loadPackageDefinition(packageDefinition).question;
const grpcServer = new grpc.Server();
grpcServer.addService(questionProto.QuestionService.service, {
  searchQuestions: searchQuestions
});

module.exports = grpcServer;
