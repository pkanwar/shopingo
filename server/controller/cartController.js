const Cart = require('../models/cart');
const error = require('../util//error');

exports.addToCart = (req,res)=>{
    const sessionId = req.sessionID;
    console.log('sessionId : ', sessionId);
    Cart.findOne({sessionId}).then(cart=>{
        let cartList = [];
        if(cart)
        {
            console.log('cart present');

            let isProductPresent = false;
            cart.items.forEach(item=>{
                if(item.productId===req.body.productId){
                    item.quantity += req.body.quantity;
                    console.log('quantity : ',item.quantity);
                    isProductPresent = true;
                }
                console.log('item : ',item);
            })
            console.log('isproduct : ',isProductPresent);
            if(!isProductPresent){
                cart.items.push(req.body);
            }

            cartList = cart.items;
            
            console.log('cartlist : '.cartList);
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

exports.getCart = (req,res)=>{
    const sessionId = req.sessionID;
    console.log("sessionId : " + sessionId);
    try{
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
       
        res.status(200).send(result);
    })
  }catch(error){
        res.status(400).send(error.getError('ER009'));
  }

}

exports.getCartById = (req,res)=>{
    const sessionId = req.params.sessionId;
    console.log("sessionId : " + sessionId);
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
       
        res.status(200).send(result);
    })

}
