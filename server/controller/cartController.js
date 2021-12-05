const Cart = require('../models/cart');
const error = require('../util//error');

exports.addToCart = (req,res)=>{
    const sessionId = req.sessionID;
    Cart.findOne({sessionId}).then(cart=>{
        let cartList = [];
        if(cart)
        {
            let isProductPresent = false;
            let productStatus = "UPDATED";
            cart.items.forEach(item=>{
                if(item.productId===req.body.productId){
                    item.quantity += req.body.quantity;
                    isProductPresent = true;
                }
            })
            if(!isProductPresent){
                cart.items.push(req.body);
                productStatus = "ADDED";
            }

            cartList = cart.items;
            
            Cart.updateOne({sessionId},{items:cartList}).then(()=>{
                res.status(200).send({
                    message : "cart successfully updated",
                    productStatus : productStatus,
                    status : 'SUCCEEDED'
            });
            })
        }else{
            cartList.push(req.body);
            const newCart = new Cart({items:cartList,sessionId});
            newCart.save().then(()=>{
                res.status(200).send({
                    message : "cart successfully added",
                    productStatus : "ADDED",
                    status : 'SUCCEEDED'
                });
            })
        }

    })   
}
exports.updateToCart = (req,res)=>{
    const sessionId = req.sessionID;
    const userId = req.session.userId;
    
    Cart.findOne({sessionId}).then(cart=>{
        if(!cart){
            return res.status(404).send(error.getError('ER013'));
        }

        Cart.updateOne({sessionId},{userId:userId}).then(()=>{
            return res.status(200).send({
                message : 'cart updated successfully',
                status : 'SUCCEEDED'
            });
        })
    }).catch(e=>{
        res.status(500).send(error.getError('ER009'));
    })

}


exports.deleteFromCart = (req,res)=>{
    const sessionId = req.sessionID;
    let cartItemIndex = -1;
    Cart.findOne({sessionId}).then(cart=>{
        if(!cart){
            return res.status(400).send(error.getError('ER013'));
        }
        const successMsg = {}
        cart.items.forEach((item,index)=>{
            if(item.productId === req.body.productId){
                if(req.body.isDecrement === 'Y')
                {
                    item.quantity -= 1;
                    successMsg['isItemDeleted'] = 'N';
                    successMsg['quantity'] = item.quantity;
                    if(item.quantity <= 0){
                        cartItemIndex = index;
                    }
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
        successMsg['status'] = 'SUCCEEDED';
        Cart.updateOne({sessionId},{items:cart.items}).then(updatedCart=>{
            return res.status(200).send(successMsg);
        })
    })
    
}

exports.deleteCartBySessionId = (sessionId)=>{
    try{
        Cart.deleteMany({sessionId : sessionId}).then(cart=>{
            if(cart)
            {
                console.log("cart delete sucess")
            }
        })
    }catch(error){
        console.log("error while deleting")
    }
}

exports.getCart = (req,res)=>{
    const sessionId = req.sessionID;
    
    try{
    Cart.findOne({sessionId}).then(cart=>{
        if(!cart || cart.items.length===0){
            return res.status(404).send(error.getError('ER013'));
        }

        let result = {};
        let totalPrice = 0;
        let actualPrice = 0;
        let discount = 0;
        if(cart._id){
            result['id'] = cart._id;
        }
        if(cart.items){
            result['items'] = cart.items;
            cart.items.forEach((item,index)=>{
                if(item.actualPrice){
                    actualPrice += parseInt(item.actualPrice) * parseInt(item.quantity);
                }
                if(item.discount){
                    let calculatedDiscount = parseInt(item.actualPrice) - parseInt(item.discountedPrice);
                    discount += parseInt(item.quantity) * calculatedDiscount;
                }
            })
        }
        totalPrice = actualPrice - discount;
        result['actualPrice'] = actualPrice;
        result['discount'] = discount;
        result['totalPrice'] = totalPrice;
        result['cartQuantity'] = cart.items.length;
        result['status'] = 'SUCCEEDED';

        res.status(200).send(result);
    })
  }catch(error){
        return res.status(400).send(error.getError('ER009'));
  }

}

exports.getCartById = (req,res)=>{
    const sessionId = req.sessionID;
    Cart.findOne({sessionId}).then(cart=>{
        if(!cart){
            res.status(404).send(error.getError('ER013'));
        }
        let result = {};
        let totalPrice = 0;
        let actualPrice = 0;
        let discount = 0;
        if(cart._id){
            result['id'] = cart._id;
        }
        if(cart.items){
            result['items'] = cart.items;
            cart.items.forEach((item,index)=>{
                if(item.actualPrice){
                    actualPrice += parseInt(item.actualPrice) * parseInt(item.quantity);
                }
                if(item.discount){
                    let calculatedDiscount = parseInt(item.actualPrice) - parseInt(item.discountedPrice);
                    discount += parseInt(item.quantity) * calculatedDiscount;
                }
            })
        }
        totalPrice = actualPrice - discount;
        result['actualPrice'] = actualPrice;
        result['discount'] = discount;
        result['totalPrice'] = totalPrice;
        result['cartQuantity'] = cart.items.length;
        result['status'] = 'SUCCEEDED';

        res.status(200).send(result);
    })
}

exports.isItemPresent = (req,res)=>{    
    let sessionId = req.sessionID;
    let itemId = req.params.itemId;
    let isProductPresent = false;
    Cart.findOne({sessionId}).then(cart=>{
        if(!cart || cart.items.length===0){
            return res.status(404).send(error.getError('ER013'));
        }
        cart.items.forEach(item=>{
            if(item.productId===itemId){
                isProductPresent = true;
            }
        })
        res.status(200).send({
            isProductPresent : isProductPresent,
            status : 'SUCCEEDED'
        })
    })
}
