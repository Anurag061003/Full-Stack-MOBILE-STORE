const express= require('express');
const multer = require('multer')
const bodyParser=require('body-parser')
const router =express.Router();
const MobileController = require('../controllers/MobileController');
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
    extended:false
}));
const uploader = multer({    
    storage:multer.diskStorage({}),
    limits:{fileSize:10*1024*1024}
});

router.post('/add/mobile',uploader.single("file"),(req,res)=>{
    MobileController.addMobile(req,res);
})
router.get('/mobiles',(req,res)=>{
    MobileController.getMobiles(req,res)
})
router.get('/mobile/detail/:id',(req,res)=>{
    MobileController.getMobileDetail(req,res)
})
router.delete('/delete/Mobile/:id',(req,res)=>{
    MobileController.deleteMobile(req,res)
})
router.get('/mobile/:id',(req,res)=>{
    MobileController.getMobile(req,res)
})
router.get('/mobiles/user/home',(req,res)=>{
    MobileController.getMobilesForUserHomePage(req,res)
})
router.put('/edit/mobile/:id' ,uploader.single("file"),(req,res)=>{
    MobileController.editMobile(req,res)
})
router.get('/user/mobile/:id',(req,res)=>{
    MobileController.getMobileForUser(req,res)
})
module.exports=router;