import express from 'express'
import connectDB from './config/db.js'
import dns from 'dns'
import authRoutes from './routes/authRoutes.js'
import authMiddileware from './Middileware/authMiddileware.js'
//import authController from './controllers/authController.js'
import postRoutes from './routes/postRoutes.js'
import commentRoutes from './routes/commentRoutes.js'

dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])
const PORT=process.env.PORT|| 5006
const app=express()

app.use(express.json())
app.get('/',(req,res)=>{
    res.json({
        success: true,
        message: "Blog api is running"
    })
})

app.use('/auth',authRoutes)
app.use('/post',authMiddileware, postRoutes)
app.use('/comment',authMiddileware, commentRoutes)

app.use((req,res)=>{
    res.status(404).json({
        message:"Todo app is failed"
    })
})

connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on ${PORT}`)
    })
}).catch((error)=>{
   console.log(`Database connection failed`,error)
})