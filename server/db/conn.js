
import mongoose from "mongoose";

const connectDB = async() => {
  try{

    await mongoose.connect(process.env.DB_CONNECT)
    console.log("MongoDB Connected successfully ");
  }
  catch(e){
    console.log(e);
  }
  
};

export default connectDB;
