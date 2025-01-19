const grpc = require('@grpc/grpc-js');const { connectDB } = require('../app'); // Import connectDB

const searchQuestions = async (call, callback) => {
  const { query, page, limit } = call.request;
  console.log("Request received:", call.request);
  console.log("Regex Query:", new RegExp(query, 'i'));

  try {
    const db = await connectDB(); // Wait for the DB connection
    console.log('Database connected:', db);

    // Query the "Questions" collection in the "speakx" database
    const questions = await db.collection('Questions') // Access the Questions collection
      .find({ title: new RegExp(query, 'i') }) // Search by title field using regex
      .skip((page - 1) * limit) // Pagination (skip for page)
      .limit(limit) // Limit the number of results per page
      .toArray(); // Convert cursor to an array of documents

    if (questions.length === 0) {
      console.log('No matching questions found.');
    } else {
      console.log('Found questions:', questions);
    }

    callback(null, { questions });
  } catch (err) {
    console.error('Error in searchQuestions:', err);
    callback({
      code: grpc.status.INTERNAL,
      details: 'Error in fetching questions'
    });
  }
};

// Define gRPC server and services
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('./proto/question.proto'); // Load .proto file
const questionProto = grpc.loadPackageDefinition(packageDefinition).question;

// Create gRPC server and add searchQuestions method
const grpcServer = new grpc.Server();
grpcServer.addService(questionProto.QuestionService.service, {
  searchQuestions: searchQuestions
});

module.exports = grpcServer;
