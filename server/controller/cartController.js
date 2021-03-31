const Cart = require('../models/cart');
const User = require('../models/user');
const util = require('../util/utility');


exports.addToCart = (req,res)=>{

    const userId = req.session.userId;
    const sessionId = req.sessionID;
    let isProductPresent = false;
    let totalPriceMap = {};
    if(userId){
       const cartMap = util.getCartInfo(req.body);
        User.findOne({_id:userId}).then(user=>{
            const cartList = user.cart;
            console.log('user cart : ', user.cart);

            cartList.forEach((item)=>{
                if(item.productId === req.body.productId){
                    let newQuantity = parseInt(cartMap['quantity']) + parseInt(item.quantity);
                    console.log('new quantity : ',newQuantity);
                    item.quantity = newQuantity;
                    totalPriceMap = util.getPrice(item.productId,item.quantity);
                    item.totalPrice = totalPriceMap['totalPrice'];
                    item.discountedPrice = totalPriceMap['discountedPrice'];
                    isProductPresent = true;
                }
            })

            if(!isProductPresent){
                totalPriceMap = util.getPrice(cartMap['productId'],cartMap['quantity']);
                cartMap['totalPrice'] = totalPriceMap['totalPrice'];
                cartMap['discountedPrice'] = totalPriceMap['discountedPrice'];
                cartList.push(cartMap);
            }
            console.log('user cart : ', cartList);
    
            User.updateOne({_id:userId},{cart:cartList}).then(updatedUser=>{
                res.status(200).send({message : "cart successfully updated"});
            })
        }).catch(() => {
            res.status(500).send({ error: "Internal Server Error" });
        });

    }else{
        Cart.findOne({productId : req.body.productId}).then(cart=>{
            let quantity = 1;
            if(req.body.quantity){
                quantity = req.body.quantity;
            }
            if(!cart){
                totalPriceMap = util.getPrice(req.body.productId,quantity);
                const newCart = new Cart({productId:req.body.productId,quantity,sessionId,
                    totalPrice:totalPriceMap['totalPrice'],discountedPrice:totalPriceMap['discountedPrice']});
                console.log("newCart : ",newCart);
                newCart.save().then(()=>{
                    res.status(200).send({message:"cart successfully updated"});
                })
            }else{
                cart.quantity += quantity;
                console.log("cart.quantity : ",cart.quantity);
                totalPriceMap = util.getPrice(cart.productId,cart.quantity);
                Cart.updateOne({productId:req.body.productId},{quantity:cart.quantity,
                    totalPrice:totalPriceMap['totalPrice'],discountedPrice:totalPriceMap['discountedPrice']}).then(()=>{
                    res.status(200).send({message:"cart successfully updated"});
                })
            }
        })  
    }    
}

exports.deleteFromCart = (req,res)=>{
    const userId = req.session.userId;

    if(userId)
    {
        User.findOne({_id:userId}).then(user=>{
            let cartList = user.cart;
            let cartItemIndex = -1;
            //let cartItemQuantity = 0;
            const successMsg = {}
            cartList.forEach((item,index)=>{
                if(item.productId === req.body.productId){
                    if(req.body.isDecrement === 'Y'){
                        item.quantity -= 1;
                        successMsg['isItemDeleted'] = 'N';
                        successMsg['quantity'] = item.quantity;
                    }else{
                        cartItemIndex = index;
                    }
                }
            })
            console.log('cartItemIndex : ',cartItemIndex);
            if(cartItemIndex > -1){
                cartList.splice(cartItemIndex,1);
                successMsg['isItemDeleted'] = 'Y';
                successMsg['quantity'] = -1;
            }
            User.updateOne({_id:userId},{cart:cartList}).then(()=>{
                res.status(200).send(successMsg);
            })
        })
    }else{
        Cart.findOne({productId:req.body.productId}).then(cart=>{
            const successMsg = {}
            if(req.body.isDecrement === 'Y'){
                cart.quantity -= 1;
                successMsg['isItemDeleted'] = 'N';
                successMsg['quantity'] = cart.quantity;
                console.log("cart.quantity : ",cart.quantity);
                Cart.updateOne({productId:req.body.productId},{quantity:cart.quantity}).then(()=>{
                    res.status(200).send(successMsg);
                })
            }else{
                Cart.deleteOne({productId:req.body.productId}).then(()=>{
                    successMsg['isItemDeleted'] = 'Y';
                    successMsg['quantity'] = -1;
                    res.status(200).send(successMsg);
                })   
            }
        })
    }
}