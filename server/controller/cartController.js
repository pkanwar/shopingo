const Cart = require('../models/cart');
const User = require('../models/user');
const util = require('../util/utility');
const error = require('../util//error');

exports.addToCart = (req,res)=>{
    const sessionId = req.sessionID;
    console.log('sessionId : ', sessionId);
    Cart.findOne({sessionId}).then(cart=>{
        let cartList = [];
        if(cart)
        {
            let isProductPresent = false;
            cart.items.forEach(item=>{
                if(item.productId===req.body.productId){
                    item.quantity += req.body.quantity;
                    isProductPresent = true;
                }
            })
            
            if(!isProductPresent){
                cart.items.push(req.body);
            }
            cartList = cart.items;
            Cart.updateOne({sessionId},{items:cartList}).then(()=>{
                res.status(200).send({message : "cart successfully updated"});
            })
        }else{
            cartList.push(req.body);
            console.log('cartList : ',cartList);
            const newCart = new Cart({items:cartList,sessionId});
            newCart.save().then(()=>{
                res.status(200).send({message : "cart successfully added"});
            })
        }

    })
    
}


exports.deleteFromCart = (req,res)=>{
    const sessionId = req.sessionID;
    let cartItemIndex = -1;
    console.log('sessionId : ', sessionId);
    Cart.findOne({sessionId}).then(cart=>{
        if(!cart){
            res.status(400).send(error.getError('ER013'));
        }
        const successMsg = {}
        cart.items.forEach((item,index)=>{
            if(item.productId === req.body.productId){
                if(req.body.isDecrement === 'Y')
                {
                    item.quantity -= 1;
                    successMsg['isItemDeleted'] = 'N';
                    successMsg['quantity'] = item.quantity;
                }else{
                    cartItemIndex = index;
                }
            }
        })
        if(cartItemIndex > -1){
            cart.items.splice(cartItemIndex,1);
            successMsg['isItemDeleted'] = 'Y';
            successMsg['quantity'] = -1;
        }
        Cart.updateOne({sessionId},{items:cart.items}).then(()=>{
            res.status(200).send(successMsg);
        })
    })
    
}
