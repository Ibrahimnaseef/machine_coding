import express from 'express'
import dns from 'dns'
import connectDB from './config/db.js'
import 'dotenv/config'
import authRoutes from './routes/authRoutes.js'
import authmiddileware from './middleware/authmiddleware.js'
import expenseRoutes from './routes/expenseRoutes.js'


dns.setServers([
    '1.1.1.1',
    '8.8.8.8'
])
const PORT=process.env.PORT || 5007

const app=express()

app.use(express.json())


app.get('/',(req,res)=>{
    res.json({
       success: true,
       message: 'Expense Tracker api is running' 
    })
})

app.use('/',authRoutes)
app.use('/expenses',authmiddileware,expenseRoutes)

app.use((req,res)=>{
    res.status(404).json({
        message:'Expense Tracker Failed'
    })
})
connectDB().then(()=>{
    app.listen(PORT,()=>{
        console.log(`Server is running on the ${PORT}`)
    })
}).catch((error)=>{
    console.log('Failed to connect database',error)
})

