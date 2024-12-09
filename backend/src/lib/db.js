import mongoose from "mongoose"

export const connectDB = async () =>{
    try {
        await mongoose.connect('mongodb://localhost:27017/chat-app');
        console.log("Database connected successfully");
    } catch (error) {
        console.log(error);
        console.log("Not connect the db");
    }
}