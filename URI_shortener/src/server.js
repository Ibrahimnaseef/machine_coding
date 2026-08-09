import express from 'express'
import dns from 'dns'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import authMiddileware from './middleware/authMiddileware.js'
import urlRoutes from './routes/urlRoutes.js'
import redirectRoutes from './routes/redirectRoutes.js';

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])
const PORT=process.env.PORT||5005
const app=express()

app.use(express.json())

app.get('/',async(req,res)=>{
    res.json({
        success:true,
        message: "Shortening url api is running"
    })
})


app.use('/auth',authRoutes)
app.use('/urls',authMiddileware,urlRoutes)
app.use('/',redirectRoutes)

app.use((req,res)=>{
    res.status(404).json({
        message:"Shortening url api failed"
    })
})


connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on ${PORT}`)
    })
}).catch((error)=>{
    console.error(`server failed to connect:`,error)
})

