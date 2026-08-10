import Expense from "../models/Expense.js"
import mongoose from "mongoose"


const getExpenses=async(req,res)=>{
    try {
        const expense= await Expense.find({
            user:req.userId
        }).populate('user')
        res.json(expense)
    } catch (error) {
         console.log(error)
        res.status(500).json({
            message:"Cannot get Expense"
        })
    }
 }


const createExpense=async(req,res)=>{
    try {
        const {title,amount,category,description,date}=req.body 

        const expense=await Expense.create({
            title,
            amount,
            category,
            description,
            date,
            user:req.userId
        })
        res.status(200).json(expense)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Failed to create a Expense"
        })
    }
}

const getOneExpense=async(req,res)=>{
    try {
        const{id}=req.params 
        const expense= await Expense.findOne({
            _id:id
        })
        res.json(expense)

    } catch (error) {
         console.log(error)
        res.status(500).json({
            message:"Cannot find expenses"
        })
    }
}

const updateExpense=async(req,res)=>{
    try {
        const {id}=req.params
        const {title,amount,category,description,date}=req.body
        const expense= await Expense.findOneAndUpdate(
            {
                _id:id,
                user:req.userId
            },
            {
                title,
                amount,
                category,
                description,
                date
            },
            {
                new: true
            }
        )
        res.json(expense)

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Cannot Update expenses"
        })
    }
}

const deleteExpense=async(req,res)=>{
    try {
        const {id}=req.params
        const expense= await Expense.findOneAndDelete({
            _id:id,
            user:req.userId
        })
        if(!expense){
            return res.status(400).json({
                message:"Delete failed"
            })
        }
        res.status(200).json({expense})
    } catch (error) {
         console.log(error)
        res.status(500).json({
            message:"Cannot delete expenses"
        })
    }
}

const getExpenseSummery=async(req,res)=>{
    try {
        const summery=await Expense.aggregate([
            {
                $match:{
                    user:new mongoose.Types.ObjectId(req.userId)
                }
            },
            {
                $group:{
                    _id:"$category",
                    total: { $sum : "$amount" }
                }
            }
        ])
        const total=summery.reduce(
            (sum,item)=>sum+item.total,
            0
        )
        res.status(200).json({
            total,
            categories:summery
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Cannot summery expenses"
        })
    }
}

export default {createExpense, getExpenses,getOneExpense,updateExpense,deleteExpense,getExpenseSummery}