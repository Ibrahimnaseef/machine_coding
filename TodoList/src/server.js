import express from 'express'
import dns from 'dns'
import connectDB from './config/db.js'
import 'dotenv/config'
import authRoutes from './routes/authroute.js'
import authMiddileware from './Middileware/authmiddileware.js'
import todoRoutes from './routes/todoroute.js'
import { error } from 'console'
//import authMiddleWare from './Middileware/authMiddileware.js'


dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])


const app=express()

const PORT= process.env.PORT|| 5004
app.use(express.json())

app.get('/',async(req,res)=>{
    res.json({
        success: true,
        message: "Todo list api is running"
    })
})

app.use('/auth',authRoutes)
app.use('/todos',authMiddileware,todoRoutes)

app.use((req , res)=>{
    res.status(404).json({
        message:"Todo app failed"
    })
})

connectDB().then(()=>{
    app.listen(PORT,()=>{
    console.log(`server is running on the ${PORT}`)
})
}).catch((error)=>{
    console.error("Database connection failed:", error)
})