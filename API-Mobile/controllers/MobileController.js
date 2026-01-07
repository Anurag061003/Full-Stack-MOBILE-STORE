const Mobile= require('../models/Mobile')
const cloudinary=require('cloudinary').v2
 const mongoose = require('mongoose')
async function addMobile(req,res){
    try{
        let upload;
        if(req.file){
            cloudinary.config({
                cloud_name:"drzzlgexf",
                api_key:"262298562786822",
                api_secret:"B-5lWjxO-Xgp6npphBHnMYZH3YE",
            })
             upload = await cloudinary.uploader.upload(req.file.path);
        }
        let mobile= new Mobile(req.body);
        if(req.file && upload){
            mobile.image=upload.secure_url;
        }
        await mobile.save();
        console.log("DATA SAVED....")
        res.status(200).send({success:true,message:'Data saved successfully'});
    }catch(err){
        console.log(err)
        res.status(500).send({success:false,message:'Somethimg went wrong'});
    }

}
async function getMobiles(req,res){
    try{
        //let mobiles = await Mobile.find({});
        let mobiles= await Mobile.find(
            {mobileName: {$regex: new RegExp(req.query.mobileName,"i")}}
        )
        res.status(200).send({success:true,data:mobiles})
    }catch(err){
        res.status(500).send({success:false,message:"Something went wrong"})
   console.log(err)
    }
  }
  async function deleteMobile(req,res){
    try{
        let mobileId =req.params.id;
        await Mobile.deleteOne({_id:mobileId})
        res.status(200).send({success:true,message:"mobile deleted"})
    }catch(err){
        res.status(500).send({success:false,message:"Something went wrong"})
   console.log(err)
    }
  }
  async function getMobile(req,res) {
    try{
        let mobileId =req.params.id;
        let mobile=await Mobile.findOne({_id:mobileId});
        res.status(200).send({success:true,data:mobile})

    }catch(err){
        res.status(500).send({success:false,data:"Something went wrong"})
        console.log(err)
    }
    
  }
  async function editMobile(req,res){
    try{
        let mobileId =req.params.id;
        let mobile=await Mobile.findOne({_id:mobileId});
        Object.assign(mobile,req.body)
        await mobile.save();
        console.log("updated")
        res.status(200).send({success:true,message:"mobile edit"})

     }catch(err){
        console.log(err)
        res.status(500).send({success:false,message:"something wrong "})

     }
     }
     async function getMobilesForUserHomePage(req,res){
         try{
            let mobiles = await Mobile.aggregate([{
                $lookup:{
                     from: "discounts",
                    localField: "_id",
                    foreignField: "mobile",
                      as: "DiscountDetails"
              }
            }])
            res.status(200).send({success:true, data:mobiles})
        }catch(err){
            console.log(err)
            res.status(500).send({success:false,message:"something wrong "})
        }
     }
     async function getMobileForUser(req,res){
    try{
        let id = req.params.id;
        let mobile1 = await Mobile.aggregate([
  {
    $match: {
      _id: new mongoose.Types.ObjectId(id)
    }
  },
  {
    $lookup: {
      from: "discounts",
      localField: "_id",
      foreignField: "mobile",
      as: "DiscountDetails"
    }
  }
]);

let mobile = mobile1[0];


        res.status(200).send({success:true, data:mobile})
    }catch(err){
           console.log(err)
            res.status(500).send({success:false,message:"something wrong "})
    }
 }

module.exports={
    addMobile,
    getMobiles,
    deleteMobile,
    getMobile,
    editMobile,
    getMobilesForUserHomePage,
    getMobileForUser
}