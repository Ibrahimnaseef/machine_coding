import express from 'express'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const router=express.Router()

router.post('/register', async(req,res)=>{
    const {username, password}=req.body
    const hashedPassword=bcrypt.hashSync(password,8)
    try {
        const user= await User.create({
            username,
            password: hashedPassword
        }
        
    )
    const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    res.json({token})

    } catch (error) {
        console.log(error.message)
        res.sendStatus(503)
    }
})

router.post('/login',async(req,res)=>{
    const {username,password}=req.body
    try {
        const user= await User.findOne({
            username
        })
        if(!user){ return res.status(404).send({message:"Invalid user"})}
        const passwordIsValid= await bcrypt.compareSync(password,user.password)
        if(!passwordIsValid){return res.status(404).send({message:"Invalid Password"}) }
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'24h'})
        res.json({token})
    } catch (error) {
        console.log(error.message)
        res.sendStatus(503)
    }
})

export default router