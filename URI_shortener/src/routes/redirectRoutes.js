import express from 'express'
import Url from '../models/Url.js'

const router= express.Router()

router.get('/:shortCode',async(req,res)=>{
   try {
     const {shortCode}=req.params

    const url= await Url.findOne({
        shortCode
    })
    if(!url){return res.status(404).json({
        message:"Short URL not found"
    })}
    url.clicks+=1;
    await url.save()
    res.redirect(url.originalUrl)
    
   } catch (error) {
    res.status(500).json({
        message:"Failed to redirect"
    })
   }
})

export default router