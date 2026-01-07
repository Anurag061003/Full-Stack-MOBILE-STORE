const Admin = require('../models/Admin')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const nodemailer =require('nodemailer')
const jwt = require('jsonwebtoken')
const Review = require('../models/Review')
const Transaction = require('../models/Transaction')
async function doAdminLogin(req, res) {
    try {
        console.log(req.body)
        let user = await Admin.findOne({ email: req.body.email })
        if (!user) {
            res.status(500).send({ success: false, message: "Invalid Username/Password" })
        } else {
            if (user.password === req.body.password) {
                user.lastLogin = new Date()
                await user.save();
                res.status(200).send({ success: true, message: "Login Successfully" })
            } else {
                res.status(500).send({ success: false, message: "Invalid Username/Password" })
            }
        }
    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: "Something went wrong!" })

    }
}
async function addUser(req,res){
    try{
        let existUser = await User.findOne({ email: req.body.email })
        if (existUser) {
            res.status(200).send({ success: false, message: "User already exist!" })

        } else {
        let user = new User(req.body)
        let encryptedPassword=bcrypt.hashSync(req.body.password,10)
        user.password=encryptedPassword;
         await user.save();
         let msg="Dear" +req.body.firstName+",your account has been created on our platform."
         let transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'anuragchauhan66317@gmail.com',
                pass:'uvse tlkp jqef jdpu'
            }
         })  
         let mailOptions={
            from:'anuragchauhan66317@gmail.com',
            to:req.body.email,
            subject:'Regarding ur Account Creation on BookStore',
            text:msg
         };
         transporter.sendMail(mailOptions,(err)=>{
            if(err){
                console.log(err);
                res.status(500).send({ success: false, message: "Something went wrong!" }) 
            }else{
                 res.status(200).send({ success: true})
            }
         })
    }}catch(err){
        console.log(err)
         res.status(500).send({ success: false, message: "Something went wrong!" })

    }

}
async function sendOTPforSignup(req, res) {
    try {
        let otp = Math.floor(Math.random() * 9000) + 1000
        let msg = "Dear User,one time password for email verificatio is " + otp;
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'anuragchauhan66317@gmail.com',
                pass: 'uvse tlkp jqef jdpu'
            }
        })
        let mailOptions = {
            from: 'anuragchauhan66317@gmail.com',
            to: req.body.email,
            subject: 'Regarding OTP for your Account Creation on BookStore',
            text: msg
        };
        transporter.sendMail(mailOptions, (err) => {
            if (err) {
                console.log(err);
                res.status(500).send({ success: false, message: "Something went wrong!" })
            } else {
                res.status(200).send({ success: true, data: otp })
            }
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: "Something went wrong!" })
    }
}
async function userLogin(req, res) {
    try {
        let user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.status(200).send({ success: false, message: "Invalid Email/Password" })
        } else {
            let validPassword = await bcrypt.compare(req.body.password, user.password);
            if (validPassword) {
                user.lastLogin = new Date();
                await user.save();
                let secret_key = 'b2Vfb3ZlcnRoZXJlX29yX3NvbWV0aGluZ19lbHNld2hlcmU'
                let token = jwt.sign({ _id: user._id, email: user.email,name:user.firstName  }, secret_key, { expiresIn: '1hr' });
                let data = {
                    name: user.firstName,
                    email: user.email,
                    token: token
                }
                res.status(200).send({ success: true, data: data })
            } else {
                res.status(200).send({ success: false, message: "Invalid Email/Password"  })
            }
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: "Server error" });
    }

}
async function getMyOrders(req, res) {
    try {
        //console.log(req.user, "user...")
        let userEmail = req.user.email
        //console.log(userEmail)
        let transactions = await Transaction.find({email:userEmail})
        res.status(200).send({ success: true, data: transactions })
    } catch (err) {
        console.log(err)
         res.status(500).send({ success: false})
    }

}
async function postComment(req,res){
    try{
      //  console.log(req.user)
       // console.log(req.body)
       let review = new Review(req.body)
       review.userEmail=req.user.email;
       review.userName=req.user.name;
       review.mobileId=req.body.mobile;
       review.comment=req.body.comment;
       review.rating=req.body.rating;
       await review.save();
       console.log("Saved in Db")
       res.status(200).send({ success: true})
    }catch(err){
        console.log(err)
        res.status(500).send({ success: false})
    }
}
async function getReviewsForAdmin(req,res){
    try{
        //console.log("Getting reviews...")
        let reviews = await Review.find({});
        res.status(200).send({ success: true,data:reviews})
    }catch(err){
        console.log(err)
        res.status(500).send({ success: false})
    }

}
async function deleteReview(req, res) {
  try {
    const { id } = req.params
    const review = await Review.findById(id)
    if (!review) {
      return res.status(500).send({
        success: false,
        message: "Something went wrong !"
      })
    }
    await Review.findByIdAndDelete(id)
    return res.status(200).send({
      success: true,
      message: 'Review deleted successfully'
    })
  } catch (error) {
    console.log('Delete Review Error:', error)
    return res.status(500).send({
      success: false,
      message: 'Server error'
    })
  }
}
module.exports = {
    doAdminLogin,getMyOrders,postComment,getReviewsForAdmin,deleteReview,
    addUser,
    sendOTPforSignup,
    userLogin
}