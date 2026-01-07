const express= require('express');
const PaymentController = require('../controllers/PaymentController')
const auth =require('../middleware/auth')
const router =express.Router();
router.post('/checkout',auth,(req,res)=>{
    PaymentController.doPayment(req,res)
})
router.get('/admin/transactions',(req,res)=>{
    PaymentController.getTransactionsForAdmin(req,res)
})   
router.delete('/admin/delete/transactions/:id',(req,res)=>{
    PaymentController.deleteTransaction(req,res)
})   
module.exports=router;
