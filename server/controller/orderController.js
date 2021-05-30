const Order = require('../models/order');
const error = require('../util/error');
const Razorpay = require('razorpay');
const crypto = require("crypto");
//Configure .env
require('dotenv').config();

const Cart = require("../models/cart");

const rzpKey = process.env.RZP_KEY_ID;
const secret = process.env.RZP_KEY_SECRET;
const currency = 'INR';

const rzpInstance = new Razorpay({
    key_id: rzpKey,
    key_secret: secret,
});

const getTotalPrice = (items)=>{
    let totalPrice = 0;
    let actualPrice = 0;
    let discount = 0;
    items.forEach((item,index)=>{
        if(item.actualPrice){
            actualPrice += parseInt(item.actualPrice) * parseInt(item.quantity);
        }
        if(item.discount){
            let calculatedDiscount = parseInt(item.actualPrice) - parseInt(item.discountedPrice);
            discount += parseInt(item.quantity) * calculatedDiscount;
        }
    })
    totalPrice = actualPrice - discount;
    console.log('actualPrice : ',actualPrice);
    console.log('discount : ',discount);
    console.log('totalPrice : ',totalPrice*100);
    return totalPrice*100;
}

exports.createOrder = (req,res)=>{
    console.log('sessionid : ',req.session.id)
    Cart.findOne({ sessionId: req.session.id }).then(cart => {
        console.log('cart : ',cart);
        console.log('user id : ',req.session.userId)
        const items = cart.items;
        const amount = getTotalPrice(cart.items);
        console.log('amount : ',amount);
        console.log('items : ',items);
        const order = new Order({ userId: req.session.userId,items : items, status: 'CREATED', amount: amount, currency: currency });
        console.log('order : ',order);
        order.save().then(() => {
            console.log('order saved : ', order.id)
            const orderId = order.id;
            const options = {
                amount,
                currency,
                //receipt denotes our order id on Razorpay
                receipt: orderId,
            };
            console.log('options : ',options);
            //Create order on razorpay
            rzpInstance.orders.create(options, (err, rzpOrder) => {
                if (err) {
                    console.log('error : ',err);
                    res.status(500).send({ error: 'Error in creating razorpay order' });
                    return;
                }

                console.log('success ');

                res.status(201).send({
                    amount,
                    currency,
                    orderId,
                    //This is required by client to co-ordinate with razorpay
                    rzpOrderId: rzpOrder.id
                });
            });
        },
        () => {
            res.status(500).send({ error: 'Error in creating order' });
        })
    },
    () => {
        res.status(500).send({ error: 'Error in getting cart' });
    });
}


exports.updateOrder = (req,res)=>{
    const orderId = req.params.id;
    console.log('orderID : ',orderId);
    console.log('req body : ',req.body);
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    if (!razorpay_payment_id || !razorpay_signature) {
        res.status(400).send(error.getError('ER015'));
        return;
    }
    const generated_signature = crypto.createHmac('sha256', secret).update(orderId + "|" + razorpay_payment_id).digest('hex');
    console.log('generated_signature : ',generated_signature);
    console.log('razorpay_signature : ',razorpay_signature);
    if (generated_signature.length === razorpay_signature.length) {
        Order.updateOne({ id: orderId }, { $set: { status: 'COMPLETED', razorpay_payment_id, razorpay_order_id, razorpay_signature }}).then(() => {
            res.status(204).send({message : 'order completed successfully',status : 'SUCCEEDED'});
        });
    } else {
        res.status(400).send(error.getError('ER014'));
        return;
    }
}