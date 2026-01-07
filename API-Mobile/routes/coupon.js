const express= require('express');
const router =express.Router();
const CouponController = require('../controllers/CouponController')

router.get('/mobiles/for/coupon',(req,res)=>{
  CouponController.getMobilesForCoupon(req,res)
})
router.post('/add/coupon',(req,res)=>{
  CouponController.addCoupon(req,res)
})
router.get('/coupons',(req,res)=>{
  CouponController.getCoupons(req,res)
}),
router.delete('/delete/coupon/:id',(req,res)=>{
  CouponController.deleteCoupon(req,res)
})
router.get('/edit/coupon/:id',(req,res)=>{
  CouponController.getCouponById(req,res)
})
router.put('/update/coupon/:id',(req,res)=>{
  CouponController.updateCoupon(req,res)
})

module.exports=router;
