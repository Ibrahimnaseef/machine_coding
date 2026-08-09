import { request } from "express";
import mongoose from "mongoose";

const urlSchema= new mongoose.Schema({
    originalUrl:{
        type: String,
        required: true
    },
    shortCode:{
        type:String,
        request: true,
        unique: true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    
    },
    clicks:{
        type: Number,
        default:0
    },
    expiresAt:{
        type: Date
    }
},
{
    timestamps: true
}
)

export default mongoose.model('Url',urlSchema)