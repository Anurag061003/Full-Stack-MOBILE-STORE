const Mobile = require('../models/Mobile')
const Discount = require('../models/Discount')
async function getMobilesForDiscount(req,res){
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
async function addDiscount(req,res){
   try{
            
             let discountExists = await Discount.find({discountName:req.body.discountName})
             if(discountExists.length){
                console.log("exists")
                res.status(500).send({success:false,message:"Already exists"})
             }else{
                console.log(req.body.mobile)
                let mobile = await Mobile.findOne({_id:req.body.mobile})
             let discount= new Discount(req.body)
             if(req.body.discountType=='Fixed'){
                discount.finalPrice= mobile.price-req.body.discountValue;
             }else{
                discount.finalPrice= mobile.price-(mobile.price)*(req.body.discountValue)/100;
             }
             await discount.save();
             res.status(200).send({success:true,message:"Discount Added Successfully"})}
    }catch(err){
    console.log(err)
     res.status(500).send({success:false,message:"Something went wrong"})
    }
}
async function getDiscounts(req,res){
try{
        let discounts= await Discount.find({}).populate('mobile',{mobileName:1,brand:1,price:1});    
        res.status(200).send({success:true,data:discounts})
    }catch(err){
        console.log(err)
     res.status(500).send({success:false,message:"Something went wrong"})

    }
}
async function deleteDiscount(req,res){
    try{
        let discountID =req.params.id;
        await Discount.deleteOne({_id:discountID})
        res.status(200).send({success:true,message:"Discount Deleted"})
    }catch(err){
        console.log(err)
     res.status(500).send({success:false,message:"Something went wrong"})

    }
}
async function getDiscountById(req, res) {
  try {
    const discountId = req.params.id;
    const discount = await Discount.findById(discountId).populate('mobile', {
      mobileName: 1,
      brand: 1,
      price: 1,
    });

    if (!discount) {
      return res
        .status(404)
        .send({ success: false, message: 'Discount not found' });
    }

    res.status(200).send({ success: true, data: discount });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .send({ success: false, message: 'Something went wrong' });
  }
}
async function updateDiscount(req, res) {
  try {
    await Discount.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).send({ success: true, message: "Discount updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
}

module.exports={
    getMobilesForDiscount,
    addDiscount,
    getDiscounts,
    updateDiscount,
    getDiscountById,
    deleteDiscount
}