import mongoose from "mongoose";

const connectDB=async()=>{
    try {
        mongoose.connect(process.env.MONGO_URI)
        console.log(`MongoDB is connected`)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

export default connectDB