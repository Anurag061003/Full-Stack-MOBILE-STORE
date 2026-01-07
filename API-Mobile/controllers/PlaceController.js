const ProductDeliveryPlace = require('../models/ProductDeliveryPlace')
async function addPlace(req, res) {
    try {
        let productDeliveryPlace = new ProductDeliveryPlace(req.body)
        await productDeliveryPlace.save();
        res.status(200).send({ success: true, message: "Place Added Successfully" })

    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: "Something went wrong" })

    }
}
async function getPlacesForMobileDelivery(req,res) {
    try {
        let places = await ProductDeliveryPlace.find({}).populate('mobile',{mobileName:1});
        res.status(200).send({ success: true, data: places })
    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: "Something went wrong" })
    }

}
async function deletePlace(req,res){
    try{
        let placeID =req.params.id;
        await ProductDeliveryPlace.deleteOne({_id:placeID})
        res.status(200).send({success:true,message:"Discount Deleted"})
    }catch(err){
        console.log(err)
     res.status(500).send({success:false,message:"Something went wrong"})

    }
}
async function getValuesForPinCode(req,res){
try{
    let pincode =req.params.pinCode;
     let result=await ProductDeliveryPlace.findOne({pinCode:pincode} ,{ pinCode: 1 },{'isAvailable':1,'deliveryTime':1,'city':1})
     if(result){
     res.status(200).send({ success: true, data: result})
     }else{
        let result1={}
        result1.isAvailable=false
     res.status(200).send({ success: true, data: result1})
     }


}catch(err){
     console.log(err)
     res.status(500).send({success:false,message:"Something went wrong"})

}
}
async function editPlace(req, res) {
    try {
        const place = await ProductDeliveryPlace.findById(req.params.id).populate('mobile');
        res.status(200).send({ success: true, data: place })
    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: "Something went wrong" })

    }
}
async function updatePlace(req, res) {
    try {
        await ProductDeliveryPlace.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).send({ success: true, message: "Place Updated" })
    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: "Something went wrong" })

    }
}

module.exports = {
    addPlace,editPlace,updatePlace,
    getPlacesForMobileDelivery,
    deletePlace,
    getValuesForPinCode
}