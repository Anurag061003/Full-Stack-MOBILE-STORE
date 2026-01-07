const express= require('express');
const router =express.Router();
const UserController = require('../controllers/UserController')
const auth =require('../middleware/auth')
router.post('/admin/login',(req,res)=>{
  UserController.doAdminLogin(req,res)
})
router.post('/add/user',(req,res)=>{
  UserController.addUser(req,res)
})
router.post('/send/otp/for/signup',(req,res)=>{
  UserController.sendOTPforSignup(req,res)
})
router.post('/user/login',(req,res)=>{
  UserController.userLogin(req,res)
})
router.get('/my/orders',auth,(req,res)=>{
  UserController.getMyOrders(req,res)
})
router.post('/post/comment',auth,(req,res)=>{
  UserController.postComment(req,res)
})
router.get('/admin/reviews',(req,res)=>{
  UserController.getReviewsForAdmin(req,res)
})
router.delete('/admin/delete/reviews/:id',(req,res)=>{
  UserController.deleteReview(req,res)
})
module.exports=router;