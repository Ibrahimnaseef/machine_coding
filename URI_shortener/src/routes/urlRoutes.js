import express from 'express'
import Url from '../models/Url.js'

const router= express.Router()

router.post('/',async(req,res)=>{
    try {
        const {originalUrl}=req.body
    if(!originalUrl || originalUrl.trim()===''){
        return res.status(400).json({
            message:"Invalid Url"
        })
    }
    const userId=req.userId
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let shortCode
    while(true){
        shortCode=''
        for(let i=0;i<6;i++){
            shortCode+=characters.charAt(
                Math.floor(Math.random()*characters.length)
            )
        }
        const existing= await Url.findOne({shortCode})
        if(!existing){
            break
        }
    }
    
    const url= await Url.create({
        originalUrl,
        shortCode,
        user:userId
    })
    res.status(201).json({
        originalUrl: url.originalUrl,
        shortCode:url.shortCode
    })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:"Failed to create short URL"
        })
    }

})


router.get('/',async(req,res)=>{
    try {
        const urls= await Url.find({
            user: req.userId
        })
        res.json(urls)

    } catch (error) {
        res.status(500).json({
            message:"Faild to fetch URLs"
        })
    }
})

router.delete('/:id',async(req,res)=>{
    try {
        const {id}=req.params
        const deleteUrl= await Url.findOneAndDelete({
            _id:id,
            user: req.userId
        })
        if(!deleteUrl){
            return res.status(404).json({
                message:"URL not found"
            })
        }
        res.json({
            message:"URL deleted successfully"
        })
    } catch (error) {
        res.status(500).json({
            message:"Failed to delete URL"
        })
    }
})

export default router