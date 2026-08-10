import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

const register=async(req,res)=>{
    try {
        const {username, email , password}=req.body
        if(!username || !email || !password){
           return res.status(400).json({
                message:"All feild is required"
            })
        }
        if(password.length<6){
            return res.status(400).json({
                message:"Password length must be atleast 6"
            })
        }
        const hashedPassword= bcrypt.hashSync(password,8)

        const duplicatecheck=await User.findOne({email})
        if(duplicatecheck){
            return res.status(400).json({
                message:"Email already exist"
            })
        }
        const user= await User.create({
            username,
            email,
            password:hashedPassword
        })
       
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'})
         res.status(200).json({
            message:"User register successfully",
            token
        })

    } catch (error) {
        res.status(500).json({
            message:"Failed to register User"
        })
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"User Not found"
            })
        }
        const passwordIsValid=bcrypt.compareSync(password,user.password)
        if(!passwordIsValid){
            return res.status(401).json({
                message:"Invalid password"
            })
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'})
        res.status(200).json({
            message:"Login successfull",
            token
        })
    } catch (error) {
         res.status(500).json({
            message:"Failed to login User"
        })
    }

}


export default {register, login}