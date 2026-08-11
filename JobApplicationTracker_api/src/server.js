import express from 'express'
import dns from 'dns'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import authMiddleware from './middleware/authMiddleware.js'
import jobtrackerRoutes from './routes/jobtrackerRoutes.js'

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])

const PORT=process.env.PORT || 5008

const app=express()

app.use(express.json())

app.get('/',(req,res)=>{
    res.json({
        success: true,
        message: "Job Application Tracker api"
    })
})

app.use('/',authRoutes)
app.use('/application',authMiddleware,jobtrackerRoutes)

app.use((req,res)=>{
    res.json({
        message:"Job Application Tracker Failed"
    })
})
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`)
    })
}).catch((error)=>{
    console.log(error)
    console.log(`Server failed`)
})