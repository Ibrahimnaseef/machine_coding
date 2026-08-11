import Jobtracking from "../models/Jobtracking.js";
import mongoose from "mongoose";


const createApplication=async(req,res)=>{
    try {
        const {title,company, location, status, appliedDate, notes}=req.body 
        const job= await Jobtracking.create({
            title,
            company,
            location,
            status,
            notes,
            user:req.userId
        })
        res.json({job})

    } catch (error) {
        res.status(500).json({
            message:"cannot create jobtracker"
        })
    }
}

// const getApplication=async(req,res)=>{
//     try {
//         const job=await Jobtracking.find({
//             user:req.userId
//         })
//         res.json(job)
//     } catch (error) {
//         res.status(500).json({
//             message:"cannot get jobtracker"
//         })
//     }
// }

const getOneApplication=async(req,res)=>{
    try {
        const {id}=req.params
        const job= await Jobtracking.findOne({
            _id:id,
            user:req.userId
        })
        res.json(job)
    } catch (error) {
        res.status(500).json({
            message:"cannot get one jobtracker"
        })
    }
}

const updateApplication=async(req,res)=>{
    try {
        const {id}=req.params
        const {title,company, location, status, appliedDate, notes}=req.body
        const job=await Jobtracking.findOneAndUpdate(
            {
                _id:id,
                user:req.userId
            },
            {
                title,
                company,
                location,
                status,
                appliedDate,
                notes,
            },
            {
                new: true
            }
        )
        res.json(job)
    } catch (error) {
        res.status(500).json({
            message:"cannot Update jobtracker"
        })
    }
}

const deleteApplication=async(req,res)=>{
    try {
        const {id}=req.params 
        const job=await Jobtracking.findOneAndDelete({
            _id:id,
            user:req.userId
        })
        res.json(job)
    } catch (error) {
            res.status(500).json({
                message:"cannot delete jobtracker"
            })
    }
}

const getApplication=async(req,res)=>{
    try {
        const {status , company}=req.query
        const filter={
            user:req.userId
        }

        if(status){
            filter.status=status
        }
        if(company){
            filter.company=company
        }

        const job=await Jobtracking.find(filter)

        res.json(job)

    } catch (error) {
         console.log(error)
        res.status(500).json({
            message:"Cannot filter"
        })
    }
}

const summeryApplication=async(req,res)=>{
    try {
        const summery= await Jobtracking.aggregate([
            {
                $match:{
                user:new mongoose.Types.ObjectId(req.userId)
                }
            },
            {
                $group:{
                    _id:"$status",
                    count:{$sum:1}
                }
            }
        ])
        const total= summery.reduce(
            (sum, item)=> sum+item.count,
            0
        )
        res.json({
            total,
            summery
        })
    } catch (error) {
         console.log(error)
        res.status(500).json({
            message:"Cannot find summery"
        })
    }
}


export default {createApplication,getApplication,getOneApplication,updateApplication, deleteApplication, summeryApplication}