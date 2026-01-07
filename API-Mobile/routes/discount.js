const express= require('express');
const router =express.Router();
const DiscountController = require('../controllers/DiscountController')

router.get('/mobiles/for/discount',(req,res)=>{
  DiscountController.getMobilesForDiscount(req,res)
})
router.post('/add/discount',(req,res)=>{
  DiscountController.addDiscount(req,res)
})
router.get('/discounts',(req,res)=>{
  DiscountController.getDiscounts(req,res)
})
router.delete('/delete/discount/:id',(req,res)=>{
  DiscountController.deleteDiscount(req,res)
})
router.get('/edit/discount/:id',(req,res)=>{
  DiscountController.getDiscountById(req,res)
})
router.put('/update/discount/:id',(req,res)=>{
  DiscountController.updateDiscount(req,res)
})

module.exports=router;
