//import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const register= async (req,res)=>{
    try {
        const {username,email,password}=req.body

        if(!username || !email || !password){
            return res.status(400).json({
                message: "All fields are required"
            })
        }
        if (password.length < 6) {
            return res.status(400).json({
            message: "Password must be at least 6 characters"
            })
        }
        const existingUser= await User.findOne({email})
        if (existingUser) {
            return res.status(400).json({
                message: "Email already registered"
            })
        }
        const hashedPassword= bcrypt.hashSync(password,8)
        const user= await User.create({
            username,
            email,
            password:hashedPassword
        })
      
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'})
          res.status(201).json({
            user,
            token
        })
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const login=async(req,res)=>{
    try {
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.status(401).json({
                message:"Invalid email"
            })
        }
        const passwordIsValid= bcrypt.compareSync(password,user.password)
        if(!passwordIsValid){
            return res.status(401).json({
                message:"Invalid Password"
            })
        }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'})
        res.json({token})

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

export default {register,login}