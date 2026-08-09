import mongoose from "mongoose";

const todoSchema= new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        requred: true
    },
    task:{
        type:String,
        requred: true,
    },
    completed:{
        type:Boolean,
        default: false
    }
})

export default mongoose.model("Todo",todoSchema)