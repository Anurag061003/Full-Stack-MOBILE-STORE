const Mobile = require('../models/Mobile')
const Coupon= require('../models/Coupon')
async function getMobilesForCoupon(req,res){
    try{
        let mobiles =await Mobile.find(
            {mobileName: {$regex: new RegExp(req.query.mobileName,"i")}},{_id:1,mobileName:1}
        )
        let sendMobiles=[];
        for ( let i =0;i<mobiles.length;i++){
          sendMobiles.push({
            value:mobiles[i]._id,
            label:mobiles[i].mobileName
          })
        }

        res.status(200).send({success:true,data:sendMobiles})
    }
    catch(err){
        res.status(500).send({success:false,message:"Something went wrong"})
    console.log(err)
}}
async function addCoupon(req,res){
    try{
             let CouponExists = await Coupon.find({couponName:req.body.couponName})
             if(CouponExists.length){
                res.status(500).send({success:false,message:" Coupon Already exists"})
             }else{
             let coupon= new Coupon(req.body)
             await coupon.save();
             res.status(200).send({success:true,message:"Coupon Added Successfully"})}
    }catch(err){
    console.log(err)
     res.status(500).send({success:false,message:"Something went wrong"})
    }
}
async function getCoupons(req,res){
try{
        let Coupons= await Coupon.find({}).populate('mobile',{mobileName:1,brand:1,price:1});    
        res.status(200).send({success:true,data:Coupons})
    }catch(err){
        console.log(err)
     res.status(500).send({success:false,message:"Something went wrong"})

    }
}
async function deleteCoupon(req,res){
    try{
        let CouponID =req.params.id;
        await Coupon.deleteOne({_id:CouponID})
        res.status(200).send({success:true,message:"Coupon Deleted"})
    }catch(err){
        console.log(err)
     res.status(500).send({success:false,message:"Something went wrong"})

    }
}
async function getCouponById(req, res) {
  try {
    const couponId = req.params.id;
    const coupon = await Coupon.findById(couponId).populate('mobile', {
      mobileName: 1,
      brand: 1,
      price: 1,
    });

    if (!coupon) {
      return res
        .status(404)
        .send({ success: false, message: 'Coupon not found' });
    }

    res.status(200).send({ success: true, data: coupon });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, message: 'Something went wrong' });
  }
}
async function updateCoupon(req, res) {
  try {
    await Coupon.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send({ success: true, message: "Coupon updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
}

module.exports={
    getMobilesForCoupon,
    addCoupon,
    getCoupons,
    deleteCoupon,getCouponById,updateCoupon
}