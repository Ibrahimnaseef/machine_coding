import express from 'express'
import postController from '../controllers/postController.js'

const router=express.Router()

router.post('/',postController.createPost)
router.get('/',postController.getPost)
router.delete('/:id',postController.deletePost)
router.put('/:id',postController.updatePost)
router.get('/:id',postController.getOnePost)

export default router