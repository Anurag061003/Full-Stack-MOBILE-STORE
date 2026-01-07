const Transaction = require('../models/Transaction')
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
async function doPayment(req, res) {
    try {
        let totalPrice = 0;
        let { products, data } = req.body;
        for (let i = 0; i < products.length; i++) {
            totalPrice = totalPrice + products[i].price;
        }
        let lineItems = products.map((product) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: product.mobileName, // REQUIRED
                },
                unit_amount: product.price * 100,
            },
            quantity: 1,
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: 'http://localhost:5174/payment/success',
            cancel_url: 'http://localhost:5174/payment/failure',
        })
        if (session) {
            let transaction = new Transaction(data)
            transaction.products = products;
            transaction.transactionId = session.id;
            transaction.totalPrice = totalPrice;
            await transaction.save();
            res.status(200).send({ success: true, data: session.url })
        } else {
            res.status(500).send({ success: false, message: "Something went wrong !" })
        }
    } catch (err) {
        console.log(err, "ERROR")
        res.status(500).send({ success: false, message: "Something went wrong !" })

    }
}
async function getTransactionsForAdmin(req, res) {
    try {
        let transactions = await Transaction.find({})
        res.status(200).send({ success: true, data: transactions })
    } catch (err) {
        console.log(err)
        res.status(500).send({ success: false, message: "Something went wrong !" })
    }
}
async function deleteTransaction(req,res){
     try {
    const { id } = req.params
    const transaction = await Transaction.findById(id)
    if (!transaction) {
      return res.status(500).send({ success: false, message: "Something went wrong !" })
    }
    await Transaction.findByIdAndDelete(id)
    return res.status(200).send({success: true,message: 'Transaction deleted successfully'})
  } catch (error) {
    console.log('Delete Transaction Error:', error)
    return res.status(500).send({success: false,message: 'Server error'})
  }
}
module.exports = {
    doPayment, getTransactionsForAdmin,deleteTransaction
}