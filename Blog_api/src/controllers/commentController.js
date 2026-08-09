import Comment from "../models/Comment.js";
import Post from "../models/Post.js";

const CommentOnPost=async(req,res)=>{
    try {
        const {postId}=req.params
        const {content}=req.body
        const post=await Post.findById(postId)
        if(!post){
            return res.status(400).json({
                message:"Post not found"
            })
        }

        const comment= await Comment.create({
            content,
            author:req.userId,
            post:postId
        })
        res.status(200).json({
            message:"Commented succesfully",
            comment
        })

    } catch (error) {
        res.status(500).json({
            message:"cannot comment",
            error
        })
    }

}
const getcomment=async(req,res)=>{
    try {
        const {postId}= req.params
        const comment= await Comment.find({
            post:postId
        })
        res.json(comment)
    } catch (error) {
        res.status(500).json({
            message:"cannot fetch the post",
            error
        })
    }
}


const deletecomment=async(req,res)=>{
   try{
     const {id}=req.params
    const comment=await Comment.findOneAndDelete({
        _id:id,
        author:req.userId
    })
     if (!comment) {
            return res.status(404).json({
                message: "Comment not found"
            })
        }
    res.status(200).json({
        message:"Deleted successfully"
    })

   }catch(error){
         res.status(500).json({
            message:"cannot delete",
            error
        })
   }
}

const updateComment=async(req,res)=>{
    try {
        const {id}=req.params
        const {content}=req.body
        const comment=await Comment.findOneAndUpdate(
            {
                _id:id,
                author:req.userId
            },
            {
                content
            },
            {
                new: true
            }
        )
        if(!comment){
            return res.status(404).json({
                message:"Comment is not found"
            })
        }
        res.status(200).json({
            message:"Comment is updated"
        })
    } catch (error) {
        res.status(500).json({
            message:"cannot Update",
            error
        })
    }
}

export default {CommentOnPost, deletecomment, getcomment, updateComment}