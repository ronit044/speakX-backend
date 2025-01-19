const {connectDB}=require("../app")
// const grpc = require('@grpc/grpc-js');

const searchQuestions=async(call, callback)=>{
  // console.log("req body:",call.request);
  const {query,page,limit}=call.request;
  try {
    const db=await connectDB();
    // console.log(db);
    const questions=await db.collection('Questions')
      .find({title:new RegExp(query,'i') })
      .skip((page-1)*limit)
      .limit(limit)
      .toArray();
    // if(db){
    // db.close();
    // console.log('db disconnected')
    // }
    // if (questions.length === 0) {
    //   console.log('no matching query!!!!');
    // } else {
    //   console.log('question array:-->>', questions);
    // }

callback(null,{questions});
  } 
  catch (err) {
    console.error('error is:----> ', err);
    callback(err);
  }
};

module.exports=searchQuestions
