import User from "../models/User.js";
import jwt from 'jsonwebtoken'
import bcrypt from "bcryptjs";
import { log } from "console";
import { triggerAsyncId } from "async_hooks";

const register=async(req,res)=>{
    try {
        const {username,email,password}=req.body
        if(!username || !email || !password ){
            res.status(400).json({
                message:"Required all field"
            })
        }
        const hashedPassword= bcrypt.hashSync(password,8)
        const user= await User.create({
            username,
            email,
            password:hashedPassword
        })

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'})
        res.json({token})
        
    } catch (error) {
        res.status(500).json({
            message:"Cannot register the user"
        })
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user= await User.findOne({email})
        if(!user){ 
            return res.status(400).json({
                message:"User is not found"
            })
         }
         const passwordIsValid= bcrypt.compareSync(password,user.password)
         if(!passwordIsValid){
            return res.status(401).json({
                message:`Invalid password`
            })
         }
         const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'})
         res.json({token})
    } catch (error) {
          res.status(500).json({
            message:"Cannot register the user"
        })
    }
}


export default {register,login}