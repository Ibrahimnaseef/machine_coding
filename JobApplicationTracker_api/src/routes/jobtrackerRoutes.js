import express from 'express'
import jobTrackerController from '../controllers/jobTrackerController.js'

const router=express.Router()

router.post('/',jobTrackerController.createApplication)
router.get('/',jobTrackerController.getApplication)
router.get('/summery',jobTrackerController.summeryApplication)
router.get('/:id',jobTrackerController.getOneApplication)
router.put('/:id',jobTrackerController.updateApplication)
router.delete('/:id',jobTrackerController.deleteApplication)


export default router