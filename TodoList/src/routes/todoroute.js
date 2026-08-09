import express from 'express'
import Todo from '../models/Todo.js'

const router=express.Router()

router.get('/',async(req,res)=>{
    try{
        const todos= await Todo.find({
            user: req.userId
        })
        res.json(todos)
    }catch(err){
        res.status(500).json({
            message:"Faild to fetch todos"
        })
    }
})

router.post('/',async(req,res)=>{
    try {
        
    
        const {task}=req.body

        if(!task || task.trim()===''){
            return res.status(400).json({
                message:"Task is required"
            })
        }
        const userId=req.userId
        const result=await Todo.create({
            user: req.userId,
            task
        })
        res.json({
            id:result._id,
            task,
            completed: result.completed
        })
    } catch (error) {
        res.status(500).json({
            message:"Failed to create todo"
        })
        
    }    
})

router.put('/:id',async(req,res)=>{
    try {
        
        const {completed}=req.body
    const {id}=req.params
    const {page}=req.query
        if(typeof completed !== 'boolean'){
            return res.status(400).json({
                message: "completed must be true or false"
            })
        }
    const updateTodo= await Todo.findOneAndUpdate({
        _id:id,
        user:req.userId
    },
    {
        completed
    },
    {
        new:true
    })

    if (!updateTodo) {
    return res.status(404).json({
        message: "Todo not found"
    })
    }

    res.json({message:"Todo completed"})
    console.log("update is succesful")
    } catch (error) {
        res.status(500).json({
            message:"Failed to Update todo"
        })
    }
})

router.delete('/:id',async(req,res)=>{
   try {
     const {id}=req.params
  //  const userId=req.userId
    const todo=await Todo.findOneAndDelete({
        _id:id,
        user:req.userId
    })
     if (!todo) {
            return res.status(404).json({
                message: "Todo not found"
            })
        }
    res.send({message:"Todo is deleted"})
   } catch (error) {
     res.status(500).json({
            message: "Failed to delete todo"
        })
   }
})

export default router