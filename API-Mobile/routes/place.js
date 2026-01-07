const express= require('express');
const router =express.Router();
const PlaceController = require('../controllers/PlaceController')

router.post('/add/place',(req,res)=>{
    PlaceController.addPlace(req,res)
})
router.get('/for/mobile/delivery',(req,res)=>{
    PlaceController.getPlacesForMobileDelivery(req,res)
})
router.delete('/delete/place/:id',(req,res)=>{
  PlaceController.deletePlace(req,res)
})
router.get('/check/pinCode/:pinCode',(req,res)=>{
    PlaceController.getValuesForPinCode(req,res)
})
router.get('/edit/place/:id',(req,res)=>{
  PlaceController.editPlace(req,res)
})
router.put('/update/place/:id',(req,res)=>{
  PlaceController.updatePlace(req,res)
})


module.exports=router;
