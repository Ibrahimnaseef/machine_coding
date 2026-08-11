import mongoose from "mongoose";

const jobtrackerSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    company:{
        type:String,
        required:true
    },
    location:{
         type:String,
        required:true
    },
    status:{
        type:String,
        required:true,
        enum:['Applied','Interview','Rejected','Selected']
    },
    appliedDate:{
        type:Date,
        default: Date.now
    },
    notes:{
        type:String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

export default mongoose.model('JobTracker',jobtrackerSchema)