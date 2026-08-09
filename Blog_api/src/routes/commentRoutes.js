import express from 'express'
import commentController from '../controllers/commentController.js'


const router=express.Router()

router.post('/:postId',commentController.CommentOnPost)
router.delete('/:id',commentController.deletecomment)
router.get('/:postId',commentController.getcomment)
router.put('/:id',commentController.updateComment)

export default router