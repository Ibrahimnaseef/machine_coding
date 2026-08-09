import Post from '../models/Post.js'

const createPost=async(req,res)=>{
    try {
        const{title,content}=req.body 
        const post= await Post.create({
            title,
            content,
            author: req.userId
        })
        res.status(201).json(post)

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

const getPost=async(req,res)=>{
    try {
        const post= await Post.find({
            author:req.userId
        }).populate('author')
        res.json(post)
    } catch (error) {
        res.status(500).json({
            message:"Failed to fetch the post"
        })
    }
}

const deletePost=async(req,res)=>{
    try {
        const {id}=req.params
        const post= await Post.findOneAndDelete({
            _id:id,
            author:req.userId
        })
        if(!post){
            return res.status(401).json({
                message:" Post not found"
            })
        }
        res.status(200).json({
            message:"Post deleted succssfully",
            post
        })
    } catch (error) {
         res.status(500).json({
            message:"Failed to delete the post"
        })
    }
}

const updatePost=async(req,res)=>{
    try {
        const {id}=req.params
        const {title,content}=req.body
        const post=await Post.findOneAndUpdate(
            {
                _id:id,
                author:req.userId
            },
            {
                title,
                content

            },
            {
                new: true
            }
        )
        if(!post){
            return res.status(404).json({
                message:"Post not found"
            })
        }
        res.status(200).json({
            message:"Post updated successfully",
            post
        })

    } catch (error) {
           res.status(500).json({
            message:"Failed to update the post"
        })
    }
}


const getOnePost=async(req,res)=>{
   try {
     const {id}=req.params
    const post= await Post.findOne({
        _id:id,
        author:req.userId
    })
    if(!post){
        return res.status(401).json({
            message:"cannot find the post"
        })
    }
    res.status(200).json({
        message:"post find successfully",
        post
    })
   } catch (error) {
       res.status(500).json({
            message:"Failed to find the post"
        })
   }

}

export default {createPost, getPost, deletePost, updatePost, getOnePost}