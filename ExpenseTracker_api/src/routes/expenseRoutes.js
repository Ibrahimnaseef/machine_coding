import express from 'express'
import expenseController from '../controllers/expenseController.js'

const router= express.Router()

router.post('/',expenseController.createExpense)
router.get('/',expenseController.getExpenses)
router.get('/summery',expenseController.getExpenseSummery)
router.get('/:id',expenseController.getOneExpense)
router.put('/:id',expenseController.updateExpense)
router.delete('/:id',expenseController.deleteExpense)


export default router