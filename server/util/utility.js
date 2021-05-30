const Product = require('../models/product');
const Cart = require('../models/cart');
const User = require('../models/user');
const Order = require('../models/order');

module.exports.getUpdateMap = (updateBody)=>{
    let updateMap = {};
    if(updateBody.email){
        updateMap['email'] = updateBody.email;
    }
    if(updateBody.firstName){
        updateMap['firstName'] = updateBody.firstName;
    }
    if(updateBody.lastName){
        updateMap['lastName'] = updateBody.lastName;
    }
    if(updateBody.mobileNumber){
        updateMap['mobileNumber'] = updateBody.mobileNumber;
    }
    if(updateBody.address){
        updateMap['address'] = updateBody.address;
    }

    return updateMap;
}

module.exports.getUserDetails = (user)=>{

    const userMap = {};
    if(user._id){
        userMap['userId'] = user._id;
    }
    if(user.email){
        userMap['email'] = user.email;
    }
    if(user.firstName){
        userMap['firstName'] = user.firstName;
    }
    if(user.lastName){
        userMap['lastName'] = user.lastName;
    }
    if(user.mobileNumber){
        userMap['mobileNumber'] = user.mobileNumber;
    }
    if(user.address){
        userMap['address'] = user.address;
    }
    if(user.cart){
        userMap['cart'] = user.cart;
    }
    userMap['status'] = 'SUCCEEDED'
    return userMap;
}

module.exports.getPrice = (productId,quantity)=>{
    return new Promise((resolve,reject)=>{
        const totalPriceMap = {};
        Product.findOne({_id: productId}).then(product=>{
            const priceMap = product.price;
            console.log('priceMap : ',priceMap);
            let totalPrice = priceMap.actualPrice * quantity;
            let discountedPrice = null;
            if(priceMap.discountedPrice){
                discountedPrice = priceMap.discountedPrice * quantity;
            }
            totalPriceMap['totalPrice'] = totalPrice;
            totalPriceMap['discountedPrice'] = discountedPrice;
            console.log('totalPriceMap : ',totalPriceMap['totalPrice']);
            resolve(totalPriceMap);
        })
    })
}

module.exports.getCartInfo = (cartBody)=>{
    const cartMap = {};
    let quantity = 1;
    if(cartBody.quantity){
        quantity = cartBody.quantity;
    }
    cartMap['productId'] = cartBody.productId;
    cartMap['quantity'] = quantity;
    return cartMap;
} 

const getCart = (sessionId)=>{
    return new Promise((resolve,reject)=>{
        let cartItems = [];
        Cart.find({sessionId}).then(cartList=>{
            cartList.forEach(item=>{
                let cartMap = {};
                cartMap['productId'] = item.productId;
                cartMap['quantity'] = item.quantity;
                cartMap['totalPrice'] = item.totalPrice;
                cartMap['discountedPrice'] = item.discountedPrice;
                cartItems.push(cartMap);
            })
            console.log('cartItems : ',cartItems);
            resolve(cartItems);
        })
    })
}

module.exports.updateUserCart = (loginId,sessionId)=>{
    return new Promise((resolve,reject)=>{
        User.findOne({loginId}).then(user=>{
            getCart(sessionId).then(cartItems=>{
                let updatedCart = [];
                if(cartItems.length > 0){
                    if(user.cart){
                        cartItems.array.forEach(cartItem => {
                            let itemPresent = false;
                            user.cart.forEach(userCartItem=>{
                                if(userCartItem.productId === cartItem.productId){
                                  itemPresent = true;
                                  userCartItem.quantity += cartItem.quantity;
                                  updatedCart.push(userCartItem);
                                }
                            })
                            if(!itemPresent){
                              updatedCart.push(cartItem);
                            }
                        });
                    }else{
                      updatedCart = cartItems;
                    }
                    console.log('updatedCart : ',updatedCart);
                    User.updateOne({_id:user.id},{cart:updatedCart}).then(()=>{
                        Cart.deleteMany({sessionId});
                    })
                }
            })
        })
        resolve();
    })
}

module.exports.getCartQuantity = (sessionId)=>{
    Cart.findOne({sessionId}).then(cart=>{
        if(!cart || cart.items.length===0){
            return 0;
        }
        return cart.items.length;
    })
}

