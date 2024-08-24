import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config();
const connectToMongoDB = async () =>{
    try {
       
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log('mongodb is connected');
    } catch (error) {
        console.log('Error in connecting to mongodb',error.message);
    }
}

export default connectToMongoDB;